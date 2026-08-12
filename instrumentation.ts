// Next.js calls this file automatically on server startup to register
// runtime-specific instrumentation. Required for Sentry's server/edge
// configs to actually load.

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
