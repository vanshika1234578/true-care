import { NextRequest, NextResponse } from "next/server";
import { doctors, treatments } from "@/lib/data";

export const runtime = "nodejs";
export const maxDuration = 60;

type HistoryTurn = { role: "user" | "assistant"; text: string };

const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
]);

const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15MB — Anthropic's per-file limit headroom

function buildSystemPrompt() {
  const doctorRoster = doctors
    .map(
      (d) =>
        `- slug: ${d.slug} | ${d.name} | ${d.specialty} | treats: ${d.treatmentSlug} | ${d.hospital} | ${d.experience} experience | languages: ${d.languages.join(", ")}`
    )
    .join("\n");

  const treatmentList = treatments.map((t) => `- ${t.slug}: ${t.name}`).join("\n");

  return `You are the TrueCare Doctor-Matching Assistant, embedded in a medical tourism website that helps international patients find hospitals and doctors in India.

Your job has two parts:
1. When a patient uploads a medical report (lab results, scans, prior diagnosis letters, prescriptions, etc.), read it and identify which of TrueCare's treatment categories and doctors are most relevant to what the report shows.
2. Answer the patient's follow-up questions about their report, the recommended doctors, hospitals, next steps, costs, or the treatment process in general — conversationally and helpfully.

TREATMENT CATEGORIES (use only these slugs):
${treatmentList}

DOCTOR ROSTER (recommend only from this list, using the exact slug):
${doctorRoster}

CRITICAL SAFETY RULES — follow these exactly, with no exceptions:
- You are NOT a doctor and must NEVER provide a diagnosis. Do not say "you have [condition]." Instead, describe findings neutrally: "This report shows [value/finding], which is typically evaluated by a [specialty]."
- NEVER recommend specific treatments, procedures, medications, dosages, or whether surgery is needed. That is exclusively the treating doctor's call after a real consultation.
- NEVER state a prognosis or estimate survival/success chances.
- If the report is unclear, low-quality, cut off, or you genuinely cannot read key values, say so plainly and ask the patient to upload a clearer copy rather than guessing.
- If the report shows values that could indicate an urgent/emergency situation (e.g. dangerously abnormal vitals or lab values), tell the patient plainly to seek immediate in-person medical care in their own location right now, in addition to anything else you say.
- Every response that discusses a report's findings must end with this exact line on its own: "This is guidance to help you find the right specialist, not a diagnosis — your treating doctor will confirm everything after reviewing your full case."

MATCHING INSTRUCTIONS:
- Base your specialty/doctor match only on what the report or the patient's question actually indicates. If nothing in the conversation yet points to a specific specialty, ask a clarifying question instead of guessing.
- When you do have enough to recommend doctors, pick 1–3 doctors from the roster above who best fit, and briefly say why each is relevant.
- At the very end of your reply, on its own line with nothing else on that line, output exactly: RECOMMENDED_SLUGS: slug1,slug2,slug3
  Use the exact doctor slugs from the roster. If no specific doctor recommendation applies yet (e.g. you're asking a clarifying question, or the question is general/unrelated to matching), output: RECOMMENDED_SLUGS: none

TONE: Warm, clear, and calm — many patients uploading reports are anxious. Use plain language, avoid unexplained jargon, and keep responses focused (short paragraphs, not walls of text).`;
}

function extractRecommendedSlugs(text: string): { cleanText: string; slugs: string[] } {
  // Find a line containing RECOMMENDED_SLUGS anywhere in the reply — tolerates markdown
  // bold/backticks around it, extra spacing, or the model not putting it strictly last.
  const lineRegex = /^.*RECOMMENDED_SLUGS\s*:?\**\s*:?\s*(.*)$/im;
  const match = text.match(lineRegex);
  if (!match) return { cleanText: text.trim(), slugs: [] };

  const raw = match[1].replace(/[*_`]/g, "").trim();
  const slugs = !raw || raw.toLowerCase() === "none"
    ? []
    : raw
        .split(",")
        .map((s) => s.trim().replace(/[.*_`[\]]/g, ""))
        .filter(Boolean);

  // Remove just the matched line, wherever it falls, rather than truncating everything after it
  const cleanText = text.replace(match[0], "").trim();
  return { cleanText, slugs };
}

// Backstop for when the model's reply clearly discusses a specialty/treatment by name
// but forgets (or malforms) the RECOMMENDED_SLUGS line — keeps results relevant even
// if the primary extraction above comes back empty.
function fallbackMatchBySpecialty(replyText: string): string[] {
  const lower = replyText.toLowerCase();
  const scores = new Map<string, number>();

  for (const doc of doctors) {
    const haystacks = [doc.specialty, doc.treatmentSlug, ...doc.specialty.split(/[\s&,/-]+/)];
    for (const term of haystacks) {
      const t = term.trim().toLowerCase();
      if (t.length >= 4 && lower.includes(t)) {
        scores.set(doc.treatmentSlug, (scores.get(doc.treatmentSlug) ?? 0) + 1);
      }
    }
  }

  if (scores.size === 0) return [];
  const topSlug = [...scores.entries()].sort((a, b) => b[1] - a[1])[0][0];
  return doctors.filter((d) => d.treatmentSlug === topSlug).map((d) => d.slug);
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The doctor-matching assistant isn't configured yet. Please try again later or contact us directly." },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const message = (formData.get("message") as string | null)?.trim() ?? "";
  const historyRaw = (formData.get("history") as string | null) ?? "[]";
  const file = formData.get("file") as File | null;

  let history: HistoryTurn[] = [];
  try {
    const parsed = JSON.parse(historyRaw);
    if (Array.isArray(parsed)) {
      history = parsed.filter(
        (h) => h && (h.role === "user" || h.role === "assistant") && typeof h.text === "string"
      );
    }
  } catch {
    // ignore malformed history, treat as fresh conversation
  }

  if (!message && !file) {
    return NextResponse.json({ error: "Please type a question or upload a report." }, { status: 400 });
  }

  if (file) {
    if (!ALLOWED_FILE_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Please upload a PDF, PNG, JPEG, or WEBP file." },
        { status: 400 }
      );
    }
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "That file is too large (max 15MB)." }, { status: 400 });
    }
  }

  // Build the Gemini "contents" array.
  // If a file is present, it belongs on the FIRST user turn of the conversation
  // (re-sent every call, since the API is stateless) so Gemini retains access
  // to it across follow-up questions.
  type GeminiPart = { text: string } | { inline_data: { mime_type: string; data: string } };
  const contents: Array<{ role: "user" | "model"; parts: GeminiPart[] }> = [];

  const firstTurnText =
    history.length > 0 ? history[0].text : message || "Please review this report and let me know which specialists would be relevant.";

  if (file) {
    const bytes = Buffer.from(await file.arrayBuffer());
    const base64 = bytes.toString("base64");
    contents.push({
      role: "user",
      parts: [{ inline_data: { mime_type: file.type, data: base64 } }, { text: firstTurnText }],
    });
  } else if (history.length > 0) {
    contents.push({ role: "user", parts: [{ text: firstTurnText }] });
  }

  // Replay the rest of the history (skip index 0, already handled above)
  for (let i = 1; i < history.length; i++) {
    contents.push({
      role: history[i].role === "assistant" ? "model" : "user",
      parts: [{ text: history[i].text }],
    });
  }

  // Append the new current-turn message, unless this call's file WAS the first turn
  // (in which case firstTurnText already covered it and there's nothing new to add).
  const isFileTheOnlyContent = file && history.length === 0;
  if (!isFileTheOnlyContent && message) {
    contents.push({ role: "user", parts: [{ text: message }] });
  }

  // Google has deprecated/retired Gemini models several times in 2026 — try a short
  // list of current-generation free-tier candidates in order, and only fail if every
  // single one is rejected. Update this list if Google announces another migration.
  const MODEL_CANDIDATES = [
    "gemini-3.1-flash-lite",
    "gemini-3-flash",
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
  ];

  try {
    let response: Response | null = null;
    let lastErrorBody = "";

    for (const model of MODEL_CANDIDATES) {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
            generationConfig: { maxOutputTokens: 2048 },
          }),
        }
      );

      if (response.ok) break;

      lastErrorBody = await response.text().catch(() => "");
      const isModelUnavailable = response.status === 404 || /no longer available|not found/i.test(lastErrorBody);
      if (!isModelUnavailable) break; // a different kind of error — stop trying, surface it
      console.warn(`Gemini model "${model}" unavailable, trying next candidate...`);
    }

    if (!response || !response.ok) {
      console.error("Gemini API error (all model candidates failed):", response?.status, lastErrorBody);
      return NextResponse.json(
        { error: "Something went wrong analyzing your report. Please try again in a moment." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const parts = data?.candidates?.[0]?.content?.parts ?? [];
    const fullText = parts
      .map((p: { text?: string }) => p.text ?? "")
      .join("\n")
      .trim();

    const { cleanText, slugs } = extractRecommendedSlugs(fullText);
    const finalSlugs = slugs.length > 0 ? slugs : fallbackMatchBySpecialty(cleanText);
    const recommendedDoctors = doctors.filter((d) => finalSlugs.includes(d.slug));

    return NextResponse.json({
      reply: cleanText || "I wasn't able to generate a response — please try rephrasing your question.",
      recommendedDoctors,
    });
  } catch (err) {
    console.error("Doctor-finder route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    );
  }
}
