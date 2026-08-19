# TrueCare Oman Cardiac CRO Pass

## What changed
- Rebuilt `/oman/cardiac-treatment-india` around a single primary conversion: cardiac case/report submission.
- Reworked the hero for explicit Oman -> India cardiac-treatment search intent.
- Added a low-risk case-review explanation before the medical network sections.
- Replaced the generic mixed-treatment price table with a cardiac-specific CABG planning range using the existing pricing data.
- Removed the unfinished "still building" hospital language.
- Prioritized three cardiac specialists, with an optional reveal for the rest of the existing cardiac network.
- Added a clearer 4-step patient journey and an explicit clinical-role disclaimer.
- Added a dedicated report-submission section using the existing secure report-upload flow.
- Passed `country` and campaign `source` into the report submission API for Oman attribution.
- Fixed the duplicate `maxSavingsPercent` export/import issue.
- Updated report-email subject/content so Oman campaign submissions are no longer labeled as Bangladesh/knee-replacement inquiries.
- Updated Oman hero content copy.

## Validation note
The repository did not include `node_modules`, and package installation was not available in the execution window, so a full Next.js production build could not be completed in this environment. Static checks were performed on the changed code, including duplicate-export checks and copy/route sanity checks.

## 2026-08-18 — Doctor expansion fix
- Fixed the Oman cardiac doctor "View All 9 Cardiac Specialists" interaction.
- Removed the `AnimatedStagger` wrapper from the expandable doctor grid because newly revealed cards could remain in the hidden animation state after the grid expanded, producing large blank areas and an apparently broken overlay-like layout.
- Doctor cards now render directly in the responsive grid when expanded, so all 9 specialists are immediately visible.
- Added `aria-expanded` and explicit button type for the toggle.
