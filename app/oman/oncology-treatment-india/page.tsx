import type { Metadata } from "next";
import OncologyCountryLanding from "./OncologyCountryLanding";

const PAGE_URL = "https://www.truecarehealth.com/oman/oncology-treatment-india";

export const metadata: Metadata = {
  title: "Cancer Treatment in India for Patients from Oman | TrueCare",
  description:
    "Free oncology second opinion for patients from Oman. Connect with board-certified cancer specialists in India for surgery, chemotherapy, radiation, and bone marrow transplant — with full visa, travel, and Arabic-speaking coordinator support.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      ar: PAGE_URL,
    },
  },
  openGraph: {
    title: "Cancer Treatment in India for Patients from Oman | TrueCare",
    description:
      "Free oncology second opinion for patients from Oman. Board-certified cancer specialists, transparent pricing, and full travel support.",
    url: PAGE_URL,
    siteName: "TrueCare",
    locale: "en_OM",
    alternateLocale: ["ar_OM"],
    type: "website",
  },
};

export default function Page() {
  return <OncologyCountryLanding initialLang="en" />;
}
