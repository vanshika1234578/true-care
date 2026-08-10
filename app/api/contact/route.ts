import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  country?: string;
  treatment?: string;
  message: string;
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

function buildEmailHtml(submission: {
  name: string;
  email: string;
  phone: string;
  country: string;
  treatment: string;
  message: string;
  submittedAt: string;
}) {
  const rows: [string, string][] = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Phone", submission.phone],
    ["Country", submission.country],
    ["Treatment", submission.treatment],
    ["Submitted at", submission.submittedAt],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#1e293b;border-bottom:1px solid #e2e8f0;white-space:nowrap;">${escapeHtml(
            label
          )}</td>
          <td style="padding:8px 12px;color:#334155;border-bottom:1px solid #e2e8f0;">${escapeHtml(
            value
          )}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#1e293b;">New TrueCare Inquiry</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        ${rowsHtml}
      </table>
      <div>
        <p style="font-weight:600;color:#1e293b;margin-bottom:4px;">Message</p>
        <p style="color:#334155;white-space:pre-wrap;border-left:3px solid #6366f1;padding-left:12px;">${escapeHtml(
          submission.message
        )}</p>
      </div>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  let body: Partial<ContactPayload>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, country, treatment, message } = body;

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, phone, and message are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const submission = {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    country: country?.trim() || "Not specified",
    treatment: treatment?.trim() || "Not specified",
    message: message.trim(),
    submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  };

  // Always log server-side, so nothing is lost even if email sending fails.
  console.log("New TrueCare contact submission:", submission);

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL || gmailUser;

  if (!gmailUser || !gmailAppPassword) {
    console.warn(
      "GMAIL_USER / GMAIL_APP_PASSWORD not configured — submission was logged but no email was sent."
    );
    // Still return success so the user isn't blocked; the inquiry is captured in server logs.
    return NextResponse.json({ success: true }, { status: 200 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `"TrueCare Website" <${gmailUser}>`,
      to: notificationEmail,
      replyTo: submission.email,
      subject: `New inquiry from ${submission.name}`,
      html: buildEmailHtml(submission),
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Phone: ${submission.phone}`,
        `Country: ${submission.country}`,
        `Treatment: ${submission.treatment}`,
        `Submitted at: ${submission.submittedAt}`,
        "",
        "Message:",
        submission.message,
      ].join("\n"),
    });
  } catch (err) {
    // Email failed to send, but the submission was already logged above.
    console.error("Failed to send contact notification email:", err);
    return NextResponse.json(
      {
        error:
          "Your message was received, but our notification system had an issue. We'll still see it in our records.",
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
