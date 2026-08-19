import type { Metadata } from "next";
import CardiacCountryLanding from "@/components/CardiacCountryLanding";
import { content } from "./content";

const PAGE_URL = "https://truecare24.in/oman/cardiac-treatment-india/ar";

export const metadata: Metadata = {
  title: "علاج القلب في الهند للمرضى من عُمان | TrueCare",
  description: "خيارات علاج القلب في الهند للمرضى من عُمان مع تنسيق مع اختصاصيي القلب والمستشفيات ودعم المرضى الدوليين.",
  alternates: { canonical: PAGE_URL },
  openGraph: { title: "علاج القلب في الهند للمرضى من عُمان | TrueCare", description: "ابدأ بمراجعة حالتك القلبية قبل السفر إلى الهند.", url: PAGE_URL, type: "website", locale: "ar_OM" },
  robots: { index: true, follow: true },
};

export default function Page() { return <CardiacCountryLanding content={content} />; }
