import type { Metadata } from "next";
import KneeReplacementLanding from "../KneeReplacementLanding";

const PAGE_URL_EN = "https://truecare24.in/bd/knee-replacement-india";
const PAGE_URL_BN = "https://truecare24.in/bd/knee-replacement-india/bn";

export const metadata: Metadata = {
  title: "ভারতে নী রিপ্লেসমেন্ট — আন্তর্জাতিক রোগীদের জন্য | TrueCare",
  description:
    "ভারতে নী (হাঁটু) রিপ্লেসমেন্ট চিকিৎসার অপশন জেনে নিন। প্রক্রিয়া, বিশেষজ্ঞ পর্যালোচনা, হাসপাতাল সমন্বয়, খরচ এবং আন্তর্জাতিক রোগী সহায়তা সম্পর্কে বিস্তারিত।",
  alternates: {
    canonical: PAGE_URL_BN,
    languages: {
      en: PAGE_URL_EN,
      bn: PAGE_URL_BN,
      "x-default": PAGE_URL_EN,
    },
  },
  openGraph: {
    title: "ভারতে নী রিপ্লেসমেন্ট — আন্তর্জাতিক রোগীদের জন্য | TrueCare",
    description:
      "TrueCare-এর হাসপাতাল সমন্বয় ও আন্তর্জাতিক রোগী সহায়তার মাধ্যমে ভারতে নী রিপ্লেসমেন্ট চিকিৎসার অপশন জেনে নিন।",
    url: PAGE_URL_BN,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ভারতে নী রিপ্লেসমেন্ট — আন্তর্জাতিক রোগীদের জন্য | TrueCare",
    description:
      "TrueCare-এর হাসপাতাল সমন্বয় ও আন্তর্জাতিক রোগী সহায়তার মাধ্যমে ভারতে নী রিপ্লেসমেন্ট চিকিৎসার অপশন জেনে নিন।",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqs = [
  {
    q: "ভারতে নী রিপ্লেসমেন্টের খরচ কত?",
    a: "খরচ নির্ভর করে পদ্ধতির ধরন, ইমপ্লান্টের ধরন, হাসপাতালে অবস্থানের সময় এবং আপনার নির্দিষ্ট কেসের উপর। আনুমানিক খরচ জানতে আপনার মেডিকেল রিপোর্ট পাঠান।",
  },
  {
    q: "ভারতে আমাকে কতদিন থাকতে হতে পারে?",
    a: "নী রিপ্লেসমেন্টের জন্য সাধারণত ফিজিওথেরাপি সহ ১০–১৪ দিন ভারতে থাকতে হয়, তারপর দেশে ফেরার অনুমতি দেওয়া হয়।",
  },
  {
    q: "আমার কী কী রিপোর্ট শেয়ার করা উচিত?",
    a: "আপনার সাম্প্রতিক মেডিকেল রেকর্ড এবং সংশ্লিষ্ট ইমেজিং বা পরীক্ষার রিপোর্ট শেয়ার করুন। আরও কিছু প্রয়োজন হলে আমাদের টিম জানিয়ে দেবে।",
  },
  {
    q: "আমার কেসের জন্য বিশেষজ্ঞ কীভাবে নির্ধারণ করা হয়?",
    a: "আপনার রিপোর্টের তথ্যের ভিত্তিতে TrueCare সংশ্লিষ্ট হাসপাতাল ও বিশেষজ্ঞ টিমের সাথে সমন্বয় করে। ক্লিনিক্যাল সিদ্ধান্ত হাসপাতালের ডাক্তাররাই নেন।",
  },
  {
    q: "পরিবারের কেউ কি আমার সাথে আসতে পারবেন?",
    a: "হ্যাঁ, অনেক রোগী পরিবারের সদস্য বা সঙ্গীর সাথে আসেন।",
  },
  {
    q: "মেডিকেল ভিসার প্রক্রিয়া কীভাবে কাজ করে?",
    a: "ভারতে আন্তর্জাতিক রোগীদের জন্য মেডিকেল ভিসা ক্যাটাগরি রয়েছে। চূড়ান্ত আবেদন সংশ্লিষ্ট ভারতীয় দূতাবাসের মাধ্যমে করতে হয়।",
  },
  {
    q: "হাসপাতাল থেকে কত দ্রুত সাড়া পাওয়া যাবে?",
    a: "রিপোর্ট জমা দেওয়ার পর আমাদের টিম দ্রুত পরবর্তী পদক্ষেপ নিয়ে যোগাযোগ করার চেষ্টা করে।",
  },
  {
    q: "রিপোর্ট জমা দেওয়ার পর কী হবে?",
    a: "আমাদের টিম আপনার তথ্য পর্যালোচনা করে পরবর্তী পদক্ষেপ নিয়ে যোগাযোগ করবে।",
  },
  {
    q: "আমি কি WhatsApp-এ কারো সাথে কথা বলতে পারি?",
    a: "হ্যাঁ। এই পৃষ্ঠার বাটন ব্যবহার করে আপনি যেকোনো সময় TrueCare-এর সাথে WhatsApp-এ চ্যাট করতে পারেন।",
  },
  {
    q: "হাসপাতালের আরও তথ্য প্রয়োজন হলে কী হবে?",
    a: "প্রয়োজনীয় অতিরিক্ত তথ্যের জন্য আমাদের টিম সরাসরি আপনার সাথে যোগাযোগ করবে।",
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
    { "@type": "ListItem", position: 2, name: "ভারতে নী রিপ্লেসমেন্ট", item: PAGE_URL_BN },
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
      <KneeReplacementLanding initialLang="bn" />
    </>
  );
}
