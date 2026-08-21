import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { verifyTurnstileToken } from "@/lib/turnstile";

// This route only ISSUES short-lived upload tokens to the browser — the actual
// file bytes never pass through this (or any) serverless function, so Vercel's
// 4.5MB function body-size limit does not apply. The browser uploads directly
// to Vercel Blob storage using the token this route grants.

const ALLOWED_CONTENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "image/tiff",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50MB per file

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        let turnstileToken: string | null = null;
        try {
          turnstileToken = clientPayload ? JSON.parse(clientPayload).turnstileToken ?? null : null;
        } catch {
          // Malformed payload — treat as no token, verification below decides.
        }
        const captchaOk = await verifyTurnstileToken(turnstileToken);
        if (!captchaOk) {
          throw new Error("Verification failed.");
        }

        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_SIZE_BYTES,
          // Random, unguessable path — not linked from anywhere public, and this
          // route requires no auth to call, so keep tokens single-use and scoped.
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ source: "medical-report-submission" }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // Optional: could log completed uploads server-side here for auditing.
        console.log("Medical report uploaded to Blob:", blob.pathname);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    Sentry.captureException(error, { tags: { flow: "report-upload-authorization" } });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload authorization failed." },
      { status: 400 }
    );
  }
}
