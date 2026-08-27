import type { Metadata } from "next";
import OrthoCountryLanding from "./OrthoCountryLanding";
import { treatments } from "@/lib/data";

const PAGE_URL_EN = "https://www.truecare24.in/oman/orthopedic-treatment-india";
const PAGE_URL_AR = "https://www.truecare24.in/oman/orthopedic-treatment-india/ar";

export const metadata: Metadata = {
  title:
    "Orthopedic & Joint Replacement Treatment in India for Patients from Oman | TrueCare",
  description:
    "Orthopedic treatment in India for patients from Oman — knee and hip replacement, spine surgery, sports injuries. Real doctors, real hospitals, WhatsApp coordination in Arabic and English.",
  alternates: {
    canonical: PAGE_URL_EN,
    languages: {
      en: PAGE_URL_EN,
      ar: PAGE_URL_AR,
      "x-default": PAGE_URL_EN,
    },
  },
  openGraph: {
    title:
      "Orthopedic & Joint Replacement Treatment in India for Patients from Oman | TrueCare",
    description:
      "Orthopedic treatment in India for patients from Oman, with specialist coordination and Arabic-language support from TrueCare.",
    url: PAGE_URL_EN,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Orthopedic & Joint Replacement Treatment in India for Patients from Oman | TrueCare",
    description:
      "Orthopedic treatment in India for patients from Oman, with specialist coordination and Arabic-language support from TrueCare.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const orthopedics = treatments.find((t) => t.slug === "orthopedics")!;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: orthopedics.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.truecare24.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Orthopedic Treatment in India (Oman)",
      item: PAGE_URL_EN,
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <OrthoCountryLanding initialLang="en" />
    </>
  );
}
