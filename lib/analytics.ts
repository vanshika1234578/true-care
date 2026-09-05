// Shared Google Ads conversion tracking helper.
//
// The base gtag.js snippet (window.gtag / window.dataLayer) is loaded once,
// site-wide, in app/layout.tsx. This file just knows WHICH conversion action
// to fire and keeps the account/label IDs in one place instead of copy-pasted
// across every landing page component.

export const GOOGLE_ADS_ID = "AW-18387787536";

// One label per conversion ACTION.
export const CONVERSION_LABELS = {
  // Existing Google Ads lead conversion action.
  leadFormSubmit: "rzz0CMvEjOEcEJC-_b9E",

  // Google Ads WhatsApp conversion action.
  whatsappClick: "49YeCNXmxegcEJC-_b9E",
} as const;

export type ConversionAction = keyof typeof CONVERSION_LABELS;

type FireConversionOptions = {
  value?: number;
  currency?: string;
};

/**
 * Fires a Google Ads conversion event.
 * Safely does nothing if we're not in the browser,
 * gtag hasn't loaded yet, or the conversion label is not configured.
 */
export function fireConversion(
  action: ConversionAction,
  { value = 1.0, currency = "INR" }: FireConversionOptions = {}
) {
  if (typeof window === "undefined") return;

  const label = CONVERSION_LABELS[action];

  if (!label || label.startsWith("REPLACE_WITH_")) {
    console.warn(
      `[analytics] Skipped "${action}" conversion — no real Google Ads label set yet in lib/analytics.ts`
    );
    return;
  }

  const gtag = (window as any).gtag;
  if (typeof gtag !== "function") return;

  gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    value,
    currency,
  });
}