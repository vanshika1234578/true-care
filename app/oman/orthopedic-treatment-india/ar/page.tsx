import type { Metadata } from "next";
import OrthoCountryLanding from "../OrthoCountryLanding";
import { content } from "../content";

const PAGE_URL_EN = "https://www.truecare24.in/oman/orthopedic-treatment-india";
const PAGE_URL_AR = "https://www.truecare24.in/oman/orthopedic-treatment-india/ar";

export const metadata: Metadata = {
  title: "علاج العظام واستبدال المفاصل في الهند لمرضى من عُمان | TrueCare",
  description:
    "علاج العظام في الهند لمرضى من عُمان — استبدال الركبة والورك، جراحة العمود الفقري، الإصابات الرياضية. أطباء حقيقيون ومستشفيات حقيقية، وتنسيق عبر واتساب بالعربية والإنجليزية.",
  alternates: {
    canonical: PAGE_URL_AR,
    languages: {
      en: PAGE_URL_EN,
      ar: PAGE_URL_AR,
      "x-default": PAGE_URL_EN,
    },
  },
  openGraph: {
    title: "علاج العظام واستبدال المفاصل في الهند لمرضى من عُمان | TrueCare",
    description:
      "علاج العظام في الهند لمرضى من عُمان، مع تنسيق متخصص ودعم بالعربية من TrueCare.",
    url: PAGE_URL_AR,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "علاج العظام واستبدال المفاصل في الهند لمرضى من عُمان | TrueCare",
    description:
      "علاج العظام في الهند لمرضى من عُمان، مع تنسيق متخصص ودعم بالعربية من TrueCare.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: content.ar.faq.items.map((faq) => ({
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
      name: "الرئيسية",
      item: "https://www.truecare24.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "علاج العظام في الهند (عُمان)",
      item: PAGE_URL_AR,
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
      <OrthoCountryLanding initialLang="ar" />
    </>
  );
}
