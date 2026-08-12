// Sentry error monitoring — client-side (browser) config.
//
// SETUP: create a free account at https://sentry.io, create a new Next.js
// project, and copy its DSN into NEXT_PUBLIC_SENTRY_DSN in your env vars.
// If that's not set, Sentry.init() below simply does nothing (dsn: undefined
// disables the SDK) — no errors, no crash, just no monitoring until you add it.

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
});
