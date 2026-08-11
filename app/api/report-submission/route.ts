import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sendWhatsAppConfirmation } from "@/lib/whatsapp";

// Files are uploaded directly from the browser to Vercel Blob (see
// app/api/report-upload/route.ts) — this route only ever receives a small
// JSON payload with the resulting Blob URLs, well within Vercel's 4.5MB
// function body limit. Reports themselves never pass through this function.

type Body = {
  name?: string;
  country?: string;
  whatsapp?: string;
  email?: string;
  age?: string;
  condition?: string;
  timeline?: string;
  source?: string;
  reportUrls?: string[];
  lang?: "en" | "bn";
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Only allow report URLs actually hosted on Vercel Blob, so this route can
// never be used to make the server email an arbitrary attacker-supplied link.
function isTrustedBlobUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  let body: Body;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const {
    name = "",
    country = "Bangladesh",
    whatsapp = "",
    email = "",
    age = "",
    condition = "",
    timeline = "",
    source = "knee-replacement-india-bd",
    reportUrls = [],
    lang = "en",
  } = body;

  if (!name.trim() || !whatsapp.trim() || !condition.trim()) {
    return NextResponse.json(
      { error: "Name, WhatsApp number, and condition details are required." },
      { status: 400 }
    );
  }

  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (!Array.isArray(reportUrls) || reportUrls.some((u) => typeof u !== "string" || !isTrustedBlobUrl(u))) {
    return NextResponse.json({ error: "Invalid report file reference." }, { status: 400 });
  }

  const submission = {
    name: name.trim(),
    country: country.trim(),
    whatsapp: whatsapp.trim(),
    email: email.trim() || "Not provided",
    age: age.trim() || "Not provided",
    condition: condition.trim(),
    timeline: timeline.trim() || "Not specified",
    source: source.trim(),
    reportUrls,
    submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  };

  console.log("New TrueCare medical report submission:", {
    ...submission,
    reportUrls: submission.reportUrls.map((_, i) => `[report file ${i + 1}]`),
  });

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || gmailUser;

  if (!gmailUser || !gmailAppPassword) {
    console.warn(
      "GMAIL_USER / GMAIL_APP_PASSWORD not configured — submission was logged but no email was sent."
    );
    return NextResponse.json({ success: true }, { status: 200 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailAppPassword },
    });

    const rows: [string, string][] = [
      ["Name", submission.name],
      ["Country", submission.country],
      ["WhatsApp", submission.whatsapp],
      ["Email", submission.email],
      ["Age", submission.age],
      ["Preferred timeline", submission.timeline],
      ["Campaign source", submission.source],
      ["Reports attached", String(submission.reportUrls.length)],
      ["Submitted at", submission.submittedAt],
    ];

    const rowsHtml = rows
      .map(
        ([label, value]) => `
          <tr>
            <td style="padding:8px 12px;font-weight:600;color:#0B1E3F;border-bottom:1px solid #e2e8f0;white-space:nowrap;">${escapeHtml(label)}</td>
            <td style="padding:8px 12px;color:#334155;border-bottom:1px solid #e2e8f0;">${escapeHtml(value)}</td>
          </tr>`
      )
      .join("");

    const reportLinksHtml =
      submission.reportUrls.length > 0
        ? `<p style="margin-top:16px;font-weight:600;color:#0B1E3F;">Medical report files:</p>
           <ul style="margin-top:4px;padding-left:18px;color:#2F6FE4;">
             ${submission.reportUrls
               .map((url, i) => `<li><a href="${escapeHtml(url)}" style="color:#2F6FE4;">Report file ${i + 1}</a></li>`)
               .join("")}
           </ul>`
        : `<p style="margin-top:16px;color:#94a3b8;">No files attached — patient may send reports separately via WhatsApp.</p>`;

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#0B1E3F;">New Knee Replacement Inquiry — Bangladesh Campaign</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">${rowsHtml}</table>
        <div>
          <p style="font-weight:600;color:#0B1E3F;margin-bottom:4px;">Condition description</p>
          <p style="color:#334155;white-space:pre-wrap;border-left:3px solid #2F6FE4;padding-left:12px;">${escapeHtml(
            submission.condition
          )}</p>
        </div>
        ${reportLinksHtml}
      </div>
    `;

    await transporter.sendMail({
      from: `"TrueCare Website" <${gmailUser}>`,
      to: notificationEmail,
      replyTo: submission.email !== "Not provided" ? submission.email : undefined,
      subject: `New knee replacement inquiry (Bangladesh) — ${submission.name}`,
      html,
      text: [
        `Name: ${submission.name}`,
        `Country: ${submission.country}`,
        `WhatsApp: ${submission.whatsapp}`,
        `Email: ${submission.email}`,
        `Age: ${submission.age}`,
        `Preferred timeline: ${submission.timeline}`,
        `Reports attached: ${submission.reportUrls.length}`,
        `Submitted at: ${submission.submittedAt}`,
        "",
        "Condition description:",
        submission.condition,
        "",
        ...(submission.reportUrls.length > 0
          ? ["Report files:", ...submission.reportUrls.map((u, i) => `  ${i + 1}. ${u}`)]
          : []),
      ].join("\n"),
    });
  } catch (err) {
    console.error("Failed to send report submission email:", err);
    return NextResponse.json(
      {
        error:
          "Your submission was received, but our notification system had an issue. Our team will still follow up — for faster response, please also message us on WhatsApp.",
      },
      { status: 200 }
    );
  }

  // Best-effort: send an automated WhatsApp confirmation to the patient.
  // Safely no-ops if WhatsApp Business API credentials aren't configured —
  // never blocks or fails the submission response.
  try {
    const result = await sendWhatsAppConfirmation({
      toWhatsappNumber: submission.whatsapp,
      patientName: submission.name,
      templateLanguage: lang,
    });
    if (!result.sent) {
      console.log("WhatsApp confirmation not sent:", result.reason);
    }
  } catch (err) {
    console.error("Unexpected error sending WhatsApp confirmation:", err);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
