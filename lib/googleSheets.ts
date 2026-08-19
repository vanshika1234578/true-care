import crypto from "crypto";

// Logs every report submission as a new row in a Google Sheet you own, as a
// structured backup to the email notification — so you have a searchable,
// filterable record beyond your inbox.
//
// Uses a lightweight hand-rolled Google service-account auth flow (JWT ->
// OAuth token -> Sheets API REST call) instead of the full `googleapis` SDK,
// to avoid adding a large dependency for one small feature.
//
// ---------------------------------------------------------------------------
// SETUP REQUIRED (see .env.example for the exact env vars):
//
// 1. Go to https://console.cloud.google.com and create a project (or use an
//    existing one).
// 2. Enable the "Google Sheets API" for that project (APIs & Services →
//    Enable APIs and Services → search "Google Sheets API" → Enable).
// 3. Create a Service Account (APIs & Services → Credentials → Create
//    Credentials → Service Account). Give it any name, no special roles
//    needed for this use case.
// 4. Open the service account you just created → Keys tab → Add Key →
//    Create new key → JSON. This downloads a .json file — you need two
//    values from it: "client_email" and "private_key".
// 5. Create a new Google Sheet (or use an existing one) to receive leads.
//    Open it → Share → add the service account's "client_email" as an
//    Editor. This is the step people most often forget — without it, the
//    API call below will fail with a permissions error.
// 6. Copy the Sheet's ID from its URL:
//    https://docs.google.com/spreadsheets/d/THIS_PART_IS_THE_ID/edit
// 7. Set these three env vars:
//
// The lead sheet can also be connected to Google Ads Data Manager for Enhanced
// Conversions for Leads. Keep GCLID/GBRAID/WBRAID and stage timestamps as
// separate columns so qualified-lead and downstream stages can be imported later.
//      GOOGLE_SERVICE_ACCOUNT_EMAIL=<client_email from the JSON file>
//      GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=<private_key from the JSON file>
//      GOOGLE_SHEET_ID=<the sheet ID from step 6>
//
//    The private key contains literal "\n" sequences — when pasting into
//    Vercel's environment variable UI, paste it exactly as it appears in the
//    JSON file (including the \n characters); this code un-escapes them.
//
// If these env vars aren't set, this silently does nothing — email
// notifications keep working normally either way.
// ---------------------------------------------------------------------------

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken(): Promise<string | null> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!clientEmail || !privateKeyRaw) return null;

  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");
  const now = Math.floor(Date.now() / 1000);

  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  );

  const unsignedToken = `${header}.${claims}`;
  const signature = crypto.sign("RSA-SHA256", Buffer.from(unsignedToken), privateKey);
  const jwt = `${unsignedToken}.${base64url(signature)}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    console.error("Google OAuth token exchange failed:", res.status, await res.text().catch(() => ""));
    return null;
  }

  const data = await res.json();
  return data.access_token ?? null;
}

export async function appendLeadToSheet(row: (string | number)[]): Promise<{ logged: boolean; reason?: string }> {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    return { logged: false, reason: "GOOGLE_SHEET_ID not configured — skipped." };
  }

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return { logged: false, reason: "Google service account not configured or auth failed." };
  }

  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A:A:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [row] }),
      }
    );

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("Google Sheets append failed:", res.status, errText);
      return { logged: false, reason: `Sheets API returned ${res.status}` };
    }

    return { logged: true };
  } catch (err) {
    console.error("Google Sheets append request error:", err);
    return { logged: false, reason: err instanceof Error ? err.message : "Unknown error" };
  }
}
