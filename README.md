# TrueCare — Medical Tourism Website

A premium, responsive marketing site for TrueCare, built with Next.js 14 (App Router),
TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build for production:

```bash
npm run build
npm run start
```

> This project was written in a sandboxed environment without internet access to npm,
> so `npm install` / `npm run build` have not been run or verified here. Run them locally
> before deploying — if you hit a dependency version conflict, it's safe to bump the
> package versions in `package.json` to their latest compatible releases.

## Structure

```
app/
  layout.tsx              Root layout — fonts, metadata, ThemeProvider, Header/Footer
  page.tsx                Home
  about/page.tsx
  treatments/page.tsx     Listing
  treatments/[slug]/page.tsx   Dynamic detail page per treatment
  hospitals/page.tsx
  doctors/page.tsx
  why-india/page.tsx
  patient-journey/page.tsx
  patient-stories/page.tsx
  blog/page.tsx
  contact/page.tsx + ContactForm.tsx
  api/contact/route.ts   Form submission handler
components/               Shared UI (Header, Footer, cards, timeline, FAQ, etc.)
lib/data.ts               All site content — treatments, hospitals, doctors, testimonials, FAQs
```

## Design tokens

- **Colors**: Primary Blue `#2F6FE4`, Teal `#63D7C4`, Navy `#0B1E3F`, plus light/dark
  surface tones — all defined in `tailwind.config.ts`.
- **Type**: Manrope for display/headings, Inter for body text, loaded via `next/font/google`
  in `app/layout.tsx`.
- **Dark mode**: class-based, toggled via `components/ThemeProvider.tsx` (no external
  dependency — stores preference in `localStorage`).
- **Motion**: Framer Motion scroll-reveals via `components/AnimatedSection.tsx`, used
  throughout. Respects `prefers-reduced-motion` (see `app/globals.css`).

## Editing content

All copy for treatments, hospitals, doctors, testimonials, FAQs, and blog posts lives in
**`lib/data.ts`**. Add or edit an entry there and it will automatically appear in the
relevant listing and detail pages — no component changes needed.

## Contact form

`app/contact/ContactForm.tsx` validates input client-side and posts to
`app/api/contact/route.ts`, which validates again server-side and currently logs the
submission. To actually send an email or push to a CRM:

1. Copy `.env.example` to `.env.local` and add your provider's API key.
2. Uncomment and adapt the integration block marked `PRODUCTION INTEGRATION POINT`
   inside `app/api/contact/route.ts`.

## Find a Doctor (report-analysis chat)

`/find-doctor` lets a patient upload a report (PDF/PNG/JPEG/WEBP, max 15MB) or just type
a question, and get matched to relevant doctors from `lib/data.ts`, plus ask follow-up
questions in the same thread.

**Setup**: copy `.env.example` to `.env.local` and add `GEMINI_API_KEY` from
[aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) — sign in with
any Google account, no credit card required. This uses Google's Gemini API, which (unlike
Anthropic/OpenAI) has a genuinely ongoing free tier: roughly 1,000–1,500 requests/day on
`gemini-2.5-flash`, no expiration. One trade-off on the free tier: Google may use your
prompts/responses to improve their products — fine for development, worth reviewing
before high-volume production use. Without a key set, the chat returns a friendly "not
configured yet" message instead of erroring.

**How it works** (`app/api/find-doctor/route.ts`):
- The uploaded file is sent to Gemini as inline base64 data (`inline_data`) — no OCR or
  PDF-parsing library needed; Gemini reads PDFs and images natively.
- Because the API is stateless, the original report is re-sent as part of the
  conversation history on every follow-up call so Gemini retains context.
- The model is instructed to match specialties/doctors, not diagnose — it's told never
  to name a condition, suggest treatment, or give a prognosis, and every substantive
  reply ends with a plain-language "this isn't a diagnosis" line enforced by the prompt.
- Recommended doctors come back as a structured `RECOMMENDED_SLUGS: slug1,slug2` line
  that the route parses out and resolves against `lib/data.ts` — the frontend never has
  to guess at names from free text.

**Extending it**: `doctors` in `lib/data.ts` now includes a `treatmentSlug` field so each
doctor maps cleanly to one of the `treatments` categories — add new doctors there and
they're automatically available to the matcher, no prompt changes needed.

**Swapping providers later**: if you outgrow Gemini's free tier or want a different
model, the only file that needs to change is `app/api/find-doctor/route.ts` — the request
body it builds (`contents`, `systemInstruction`) and the response shape it reads
(`data.candidates[0].content.parts`) are Gemini-specific; everything else (the chat UI,
the doctor-matching logic, the safety prompt) is provider-agnostic.

## Images

The brief calls for a few authentic healthcare images rather than stock photos everywhere.
`next.config.js` is pre-configured to allow images from `images.unsplash.com` as a
placeholder source — swap in your own photography via `next/image` wherever you add
imagery (e.g. the About page or hospital detail cards).
