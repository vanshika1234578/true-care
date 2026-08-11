import type { Metadata } from "next";
import KneeReplacementLanding from "./KneeReplacementLanding";

const PAGE_URL = "https://truecare24.in/bd/knee-replacement-india";

export const metadata: Metadata = {
  title: "Knee Replacement in India for International Patients | TrueCare",
  description:
    "Explore knee replacement treatment options in India. Learn about the process, specialist review, hospital coordination, costs and international patient support.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Knee Replacement in India for International Patients | TrueCare",
    description:
      "Explore knee replacement treatment options in India with hospital coordination and international patient support from TrueCare.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knee Replacement in India for International Patients | TrueCare",
    description:
      "Explore knee replacement treatment options in India with hospital coordination and international patient support from TrueCare.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    q: "How much does knee replacement cost in India?",
    a: "Cost depends on the type of procedure, implant choice, hospital stay, and your specific case. Share your medical reports to request an individualized estimate.",
  },
  {
    q: "How long might I need to stay in India?",
    a: "Knee replacement typically requires 10–14 days in India, including physiotherapy, before you are cleared to travel home. Your treating team will confirm an exact timeline after reviewing your case.",
  },
  {
    q: "What reports should I share?",
    a: "Please share your recent medical records and relevant imaging or investigation reports, such as X-rays or MRI scans if available. Our team will let you know if anything more is needed.",
  },
  {
    q: "How is a specialist identified for my case?",
    a: "TrueCare coordinates with the relevant hospital and specialist team based on the information in your reports. The clinical assessment and treatment decision are made by the hospital's doctors, not by TrueCare.",
  },
  {
    q: "Can a family member accompany me?",
    a: "Yes, many patients travel with a family member or companion. We can share general guidance on travel and stay arrangements for accompanying persons.",
  },
  {
    q: "How does the medical visa process work?",
    a: "India offers a medical visa category for international patients seeking treatment. We can share general guidance on the process; the final application is handled through the relevant Indian embassy or consulate.",
  },
  {
    q: "How quickly can I receive a hospital response?",
    a: "Once your reports are submitted, our patient coordination team reviews the information and aims to follow up promptly with next steps.",
  },
  {
    q: "What happens after I submit my reports?",
    a: "Our patient coordination team reviews the information you've shared and reaches out regarding next steps, which may include a request for additional information before the hospital's clinical team responds.",
  },
  {
    q: "Can I speak to someone on WhatsApp?",
    a: "Yes. You can chat with TrueCare on WhatsApp at any time using the button on this page.",
  },
  {
    q: "What happens if the hospital needs more information?",
    a: "Our coordination team will reach out to you directly to request any additional reports or details the hospital's clinical team needs before proceeding.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
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
    { "@type": "ListItem", position: 2, name: "Knee Replacement in India", item: PAGE_URL },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <KneeReplacementLanding />
    </>
  );
}
