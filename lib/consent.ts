// Shared helper for reading/writing the visitor's cookie/analytics consent
// choice. Analytics scripts (GA4, Meta Pixel, etc.) should check
// hasAnalyticsConsent() before loading, so nothing tracking-related runs
// until the visitor has explicitly accepted.

const CONSENT_KEY = "truecare_cookie_consent"; // "accepted" | "declined"
export const CONSENT_CHANGE_EVENT = "truecare-consent-change";

export type ConsentValue = "accepted" | "declined" | null;

export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "accepted" | "declined") {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Ignore — worst case the banner reappears next visit.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }));
}

export function hasAnalyticsConsent(): boolean {
  return getConsent() === "accepted";
}
