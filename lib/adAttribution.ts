export type AdAttribution = {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  landingPage?: string;
  capturedAt?: string;
};

const STORAGE_KEY = "truecare_ad_attribution";

function safeGet(key: string): string | undefined {
  try {
    const value = sessionStorage.getItem(key);
    return value || undefined;
  } catch {
    return undefined;
  }
}

function safeSet(value: AdAttribution): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Attribution is best-effort; conversion should never fail because storage is unavailable.
  }
}

export function captureAdAttribution(): AdAttribution | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const current: AdAttribution = {
    gclid: params.get("gclid") || safeGet("gclid"),
    gbraid: params.get("gbraid") || safeGet("gbraid"),
    wbraid: params.get("wbraid") || safeGet("wbraid"),
    utmSource: params.get("utm_source") || safeGet("utm_source"),
    utmMedium: params.get("utm_medium") || safeGet("utm_medium"),
    utmCampaign: params.get("utm_campaign") || safeGet("utm_campaign"),
    utmTerm: params.get("utm_term") || safeGet("utm_term"),
    utmContent: params.get("utm_content") || safeGet("utm_content"),
    landingPage: window.location.pathname,
    capturedAt: new Date().toISOString(),
  };

  if (current.gclid) safeSet({ ...current, gclid: current.gclid });
  else safeSet(current);

  return current;
}

export function getAdAttribution(): AdAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as AdAttribution;
  } catch {
    // fall through
  }
  return captureAdAttribution();
}
