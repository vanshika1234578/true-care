// Sends an automated WhatsApp message to a patient via Meta's WhatsApp Business
// Cloud API. This is a business-initiated message (the patient hasn't messaged
// you first), so Meta requires it to use a pre-approved message TEMPLATE — you
// cannot send free-form text here.
//
// This function is a best-effort, non-blocking integration point: if the
// required env vars aren't set, it safely no-ops rather than throwing, so the
// rest of the form submission flow (email notification) is never affected.
//
// ---------------------------------------------------------------------------
// SETUP REQUIRED BEFORE THIS DOES ANYTHING (see .env.example for env vars):
//
// 1. Create a Meta Business Account + WhatsApp Business Account at
//    https://business.facebook.com and https://developers.facebook.com/apps
// 2. Add the "WhatsApp" product to a Meta app, verify a phone number to send
//    from (this becomes your WHATSAPP_PHONE_NUMBER_ID).
// 3. Generate a permanent access token (System User token) — this becomes
//    WHATSAPP_ACCESS_TOKEN. Temporary tokens from the quickstart expire in 24h.
// 4. Create and submit a message TEMPLATE for approval in Meta Business
//    Manager (WhatsApp Manager → Message Templates). Approval usually takes
//    minutes to a few hours, sometimes longer for a first submission.
//    Suggested "Utility" category template (utility templates are for
//    order/appointment-style updates, not promotions, and are billed at a
//    lower rate than Marketing templates):
//
//      Name: report_submission_confirmation
//      Category: Utility
//      Body (English): "Hi {{1}}, thank you for submitting your medical
//        reports to TrueCare. Our patient coordination team will review your
//        case and contact you here on WhatsApp with next steps."
//      Body (Bengali): "প্রিয় {{1}}, TrueCare-এ আপনার মেডিকেল রিপোর্ট জমা
//        দেওয়ার জন্য ধন্যবাদ। আমাদের টিম আপনার কেস পর্যালোচনা করে এই
//        WhatsApp নম্বরেই পরবর্তী পদক্ষেপ জানাবে।"
//
//    Meta requires a separate template per language variant, each with its
//    own approval. Note the exact template name and language codes you use.
//
// 5. Set WHATSAPP_TEMPLATE_NAME to the approved template's name, and pass the
//    right language code (e.g. "en" or "bn") when calling this function.
//
// COST: Access to the API itself is free. You pay Meta per delivered template
// message, billed by the RECIPIENT's country and the template's category
// (Utility templates are cheaper than Marketing). Rates change periodically —
// check Meta's current WhatsApp Business Platform pricing page before
// estimating volume costs. There is no local currency/BDT billing directly
// through Meta; costs are typically billed in USD to your linked payment
// method, or passed through by a BSP (see note below) in their own billing.
//
// ALTERNATIVE: instead of talking to Meta's Cloud API directly, you can use a
// Business Solution Provider (BSP) like Twilio, Gupshup, Interakt, or
// AiSensy. They wrap the same underlying Meta API with an easier dashboard
// for template creation/approval, usually for an added per-message or
// monthly fee on top of Meta's own charge. If you'd rather go that route,
// this function would be replaced with a call to that provider's SDK/API
// instead — let your developer know which provider you choose.
// ---------------------------------------------------------------------------

type SendConfirmationParams = {
  toWhatsappNumber: string; // as entered by the patient, any common format
  patientName: string;
  templateLanguage: "en" | "bn";
};

function normalizeToE164Digits(rawNumber: string): string | null {
  const digits = rawNumber.replace(/[^\d]/g, "");
  if (!digits) return null;
  // Meta's Cloud API expects digits only (no leading +), including country code.
  // If the number was entered without a leading + but already includes a
  // country code (e.g. "8801XXXXXXXXX"), this is used as-is.
  return digits;
}

export async function sendWhatsAppConfirmation({
  toWhatsappNumber,
  patientName,
  templateLanguage,
}: SendConfirmationParams): Promise<{ sent: boolean; reason?: string }> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;

  if (!accessToken || !phoneNumberId || !templateName) {
    return { sent: false, reason: "WhatsApp Business API not configured — skipped." };
  }

  const to = normalizeToE164Digits(toWhatsappNumber);
  if (!to) {
    return { sent: false, reason: "Could not parse patient WhatsApp number." };
  }

  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: templateName,
          language: { code: templateLanguage },
          components: [
            {
              type: "body",
              parameters: [{ type: "text", text: patientName || "there" }],
            },
          ],
        },
      }),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => "");
      console.error("WhatsApp Cloud API send failed:", res.status, errBody);
      return { sent: false, reason: `Meta API returned ${res.status}` };
    }

    return { sent: true };
  } catch (err) {
    console.error("WhatsApp Cloud API request error:", err);
    return { sent: false, reason: err instanceof Error ? err.message : "Unknown error" };
  }
}
