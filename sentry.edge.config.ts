// Sentry error monitoring — Edge runtime config (only relevant if any route
// is explicitly set to `export const runtime = "edge"`, which none currently
// are in this project — included for completeness/future-proofing).
// See sentry.client.config.ts for setup instructions.

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  tracesSampleRate: 0.1,
  enabled: !!dsn,
});
