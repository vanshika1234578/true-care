"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import Button from "@/components/Button";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-navy-500">Something went wrong</h1>
          <p className="max-w-sm text-navy-300">
            We've been notified and are looking into it. Please try again, or contact us on WhatsApp if
            this keeps happening.
          </p>
          <Button href="/">Go back home</Button>
        </div>
      </body>
    </html>
  );
}
