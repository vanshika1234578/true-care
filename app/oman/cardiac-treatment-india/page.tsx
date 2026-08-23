import type { Metadata } from "next";
import Script from "next/script";
import CardiacCountryLanding from "@/components/CardiacCountryLanding";
import { content } from "./content";
import { treatments } from "@/lib/data";

const PAGE_URL = "https://truecare24.in/oman/cardiac-treatment-india";

export const metadata: Metadata = {
  title: "Cardiac & Heart Treatment in India for Patients from Oman | TrueCare",
  description:
    "Heart treatment in India for patients from Oman — angioplasty, bypass surgery, valve procedures. Real doctors, real hospitals, WhatsApp coordination in Arabic and English.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Cardiac & Heart Treatment in India for Patients from Oman | TrueCare",
    description:
      "Heart treatment in India for patients from Oman, with specialist coordination and Arabic-language support from TrueCare.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cardiac & Heart Treatment in India for Patients from Oman | TrueCare",
    description:
      "Heart treatment in India for patients from Oman, with specialist coordination and Arabic-language support from TrueCare.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const cardiology = treatments.find((t) => t.slug === "cardiology")!;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: cardiology.faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 1, name: "Home", item: "https://truecare24.in" },
    { "@type": "ListItem", position: 2, name: "Cardiac Treatment in India (Oman)", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18387787536"
        strategy="afterInteractive"
      />
      <Script id="google-ads-oman-cardiac" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18387787536');
        `}
      </Script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CardiacCountryLanding content={content} />
    </>
  );
}
