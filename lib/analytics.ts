// Shared Google Ads conversion tracking helper.
//
// The base gtag.js snippet (window.gtag / window.dataLayer) is loaded once,
// site-wide, in app/layout.tsx. This file just knows WHICH conversion action
// to fire and keeps the account/label IDs in one place instead of copy-pasted
// across every landing page component.
//
// Respects the same cookie-consent choice as the rest of the site (see
// lib/consent.ts) — no conversion pings fire until the visitor has accepted.

import { hasAnalyticsConsent } from "./consent";

export const GOOGLE_ADS_ID = "AW-18387787536";

// One label per conversion ACTION (not per page) — the same "Lead form
// submit" action is reused across every country/treatment landing page
// (already wired this way on the Cardiac page), so create each action once
// in Google Ads and reuse its label everywhere via this map.
//
// Where to find/create these: Google Ads → Goals → Conversions → Summary →
// "+ New conversion action" → Website → "Submit lead form" / "Contact" →
// after creating, open the action → "Tag setup" → "Install the tag yourself"
// → copy the value after the "/" in send_to (looks like "AW-XXXXXXX/XXXXXXXX").
export const CONVERSION_LABELS = {
  // Existing action — already live and used on the Cardiac landing page.
  leadFormSubmit: "rzz0CMvEjOEcEJC-_b9E",

  whatsappClick: "49YeCNXmxegcEJC-_b9E",
} as const;

export type ConversionAction = keyof typeof CONVERSION_LABELS;

type FireConversionOptions = {
  value?: number;
  currency?: string;
};

/**
 * Fires a Google Ads conversion event for the given action.
 * No-ops safely if: we're not in the browser, gtag hasn't loaded yet,
 * the visitor hasn't accepted analytics cookies, or the label for this
 * action is still the unset placeholder.
 */
export function fireConversion(
  action: ConversionAction,
  { value = 1.0, currency = "INR" }: FireConversionOptions = {}
) {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

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
