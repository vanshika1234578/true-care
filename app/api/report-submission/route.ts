import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Server-side only. Files are never written to disk or any public path —
// they are streamed into memory and attached directly to an outbound email.
// This means there is no public URL that could ever expose a patient's report.

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB per file
const MAX_FILES = 5;
const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

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

export async function POST(req: NextRequest) {
  let formData: FormData;

  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const name = String(formData.get("name") || "").trim();
  const country = String(formData.get("country") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const age = String(formData.get("age") || "").trim();
  const condition = String(formData.get("condition") || "").trim();
  const timeline = String(formData.get("timeline") || "").trim();
  const source = String(formData.get("source") || "knee-replacement-india-bd").trim();

  if (!name || !country || !whatsapp || !condition) {
    return NextResponse.json(
      { error: "Name, country, WhatsApp number, and condition details are required." },
      { status: 400 }
    );
  }

  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const files = formData.getAll("reports").filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Please upload no more than ${MAX_FILES} files.` },
      { status: 400 }
    );
  }

  const attachments: { filename: string; content: Buffer; contentType: string }[] = [];

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: `"${file.name}" is larger than the 10MB limit per file.` },
        { status: 400 }
      );
    }
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `"${file.name}" has an unsupported file type. Please upload PDF, JPG, PNG, or Word documents.` },
        { status: 400 }
      );
    }
    const arrayBuffer = await file.arrayBuffer();
    attachments.push({
      filename: file.name,
      content: Buffer.from(arrayBuffer),
      contentType: file.type,
    });
  }

  const submission = {
    name,
    country,
    whatsapp,
    email: email || "Not provided",
    age: age || "Not provided",
    condition,
    timeline: timeline || "Not specified",
    source,
    fileCount: attachments.length,
    submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  };

  // Server-side log as a fallback record. Deliberately excludes file contents.
  console.log("New TrueCare medical report submission:", submission);

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
      ["Reports attached", String(submission.fileCount)],
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
        ${
          attachments.length > 0
            ? `<p style="margin-top:16px;color:#334155;">${attachments.length} medical report file(s) attached to this email.</p>`
            : `<p style="margin-top:16px;color:#94a3b8;">No files attached — patient may send reports separately via WhatsApp.</p>`
        }
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
        `Reports attached: ${submission.fileCount}`,
        `Submitted at: ${submission.submittedAt}`,
        "",
        "Condition description:",
        submission.condition,
      ].join("\n"),
      attachments,
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

  return NextResponse.json({ success: true }, { status: 200 });
}

// Note: App Router route handlers parse multipart/form-data natively via
// req.formData() — no bodyParser config (a Pages Router concept) is needed here.
// If large report uploads are rejected in production, check your hosting
// platform's request body size limit (e.g. Vercel's default is 4.5MB per
// request on Serverless Functions) and raise it if necessary.
