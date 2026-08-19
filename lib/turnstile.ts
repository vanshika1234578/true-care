// Optional extra spam-protection layer using Cloudflare Turnstile — a free,
// privacy-friendly CAPTCHA alternative (no Google account needed).
//
// SETUP (only if you want this extra layer; the honeypot + timing check in
// ReportForm/route.ts already provide baseline protection without any setup):
// 1. Go to https://dash.cloudflare.com/?to=/:account/turnstile
//    (a free Cloudflare account works — you do not need to move your domain's
//    DNS to Cloudflare to use Turnstile)
// 2. Add a site, get a Site Key (public, safe to expose to the browser) and a
//    Secret Key (server-side only, never expose this one)
// 3. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY in your env
//
// If these aren't set, verification below always passes (treated as "not
// configured") — the widget also won't render client-side, so nothing breaks.

export async function verifyTurnstileToken(token: string | null | undefined, remoteIp?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    // Not configured — don't block submissions on a feature that isn't set up.
    return true;
  }

  if (!token) {
    // Configured, but the client sent no token — reject.
    return false;
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        ...(remoteIp ? { remoteip: remoteIp } : {}),
      }),
    });
    const data = await res.json();
    return data?.success === true;
  } catch (err) {
    console.error("Turnstile verification request failed:", err);
    // Fail closed on unexpected errors when the feature is actively configured.
    return false;
  }
}
