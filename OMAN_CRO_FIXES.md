# Oman Cardiac CRO Fixes

Implemented without changing the current medical-report storage/access model.

## Fixed
- Removed Oman cardiac landing page dependency on the Bangladesh report-form route by introducing `components/MedicalReportForm.tsx` and keeping a compatibility wrapper for the legacy Bangladesh page.
- Removed the obsolete `knee-replacement-india-bd` upload token payload from the shared report-upload authorization route.
- Generalized report-submission defaults and added Oman campaign attribution fields.
- Added Google Ads attribution capture for `gclid`, `gbraid`, `wbraid` and UTM parameters using session storage.
- Persisted attribution fields with report submissions and Google Sheet lead rows.
- Made Google Sheet lead logging independent of the email notification configuration.
- Added lead-stage columns/structure in the lead sheet rows so downstream stages can be mapped later into Google Ads Data Manager/Enhanced Conversions for Leads.
- Added an Arabic Oman cardiac landing page at `/oman/cardiac-treatment-india/ar` with RTL layout, Arabic copy, Arabic FAQs, Arabic treatment areas, Arabic report-form UI, and an English switch link.
- Added English/Arabic alternate URLs to the Oman English page metadata.
- Added Oman-specific trust/corridor messaging to both language versions.
- Added language information to landing-page dataLayer events.
- Preserved existing TrueCare doctors and hospitals and the working "View All" cardiac specialists behavior.

## Deliberately held
- Medical report storage/access was NOT changed. The existing public Vercel Blob handling remains as-is per the request to hold report handling for now.

## Validation
- Static TypeScript parsing of changed files produced no TS1005/TS1109/TS1128/TS1136/TS1160/TS1185/TS1381/TS1472/TS1002 syntax errors.
- Full dependency installation and production build could not be completed in the execution environment because `npm install` timed out.
