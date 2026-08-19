// Sentry error monitoring — server-side (Node.js runtime) config.
// See sentry.client.config.ts for setup instructions. Uses the same DSN;
// SENTRY_DSN (server) falls back to the public one if a separate value
// isn't set, since Sentry DSNs aren't secret.

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  tracesSampleRate: 0.1,
  enabled: !!dsn,
});
