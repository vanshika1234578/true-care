import type { Metadata } from "next";
import CardiacLanding from "./CardiacLanding";

const PAGE_URL = "https://truecare24.in/bd/cardiac-treatment-india";

export const metadata: Metadata = {
  title: "Cardiac & Heart Treatment in India for International Patients | TrueCare",
  description:
    "Explore cardiac treatment options in India — angioplasty, bypass surgery, valve procedures, and more. Specialist coordination, leading hospitals, and international patient support.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Cardiac & Heart Treatment in India for International Patients | TrueCare",
    description:
      "Explore cardiac treatment options in India with specialist coordination and international patient support from TrueCare.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cardiac & Heart Treatment in India for International Patients | TrueCare",
    description:
      "Explore cardiac treatment options in India with specialist coordination and international patient support from TrueCare.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  { q: "How much does cardiac treatment cost in India?", a: "Cost depends on the diagnosis, procedure type, complexity, and hospital. Share your medical reports to request an individualized estimate." },
  { q: "What reports should I share?", a: "Share the reports you already have, such as ECG, echo, or angiography results. Our team will let you know if anything additional is needed." },
  { q: "Can I get a second opinion from an Indian cardiac specialist?", a: "Yes. Sharing your existing reports allows a specialist to review your case and provide their perspective." },
  { q: "How quickly can my case be reviewed?", a: "Once your reports are submitted, our patient coordination team reviews the information and aims to follow up promptly with next steps." },
  { q: "Can I travel with a family member?", a: "Yes, many patients travel with a family member or companion. We can share general guidance on travel and stay arrangements." },
  { q: "How long might I need to stay in India?", a: "This varies by procedure and recovery needs. Your treating team will confirm an estimated timeline after reviewing your case." },
  { q: "Can TrueCare help with hospital coordination?", a: "Yes, TrueCare coordinates your case with the relevant hospital and specialist team, though clinical decisions are made by the hospital's doctors." },
  { q: "Can my existing cardiologist share reports with the Indian hospital?", a: "Yes, you or your existing cardiologist can share reports with us, and we'll coordinate them with the relevant specialist team." },
  { q: "What happens after I submit my reports?", a: "Our patient coordination team reviews the information you've shared and reaches out regarding next steps, which may include a request for additional information." },
  { q: "Can I speak to someone on WhatsApp?", a: "Yes. You can chat with TrueCare on WhatsApp at any time using the button on this page." },
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
    { "@type": "ListItem", position: 2, name: "Cardiac Treatment in India", item: PAGE_URL },
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
      <CardiacLanding />
    </>
  );
}
