import type { Metadata } from "next";
import BangladeshTrustLanding from "./BangladeshTrustLanding";
import { getCountry } from "@/lib/countries";

const country = getCountry("bd")!;

export const metadata: Metadata = {
  title: `Treatment in India for Patients From ${country.name}`,
  description: `Real doctors and hospitals in India for patients from ${country.name}. Send your medical reports for a free specialist review.`,
};

export default function Page() {
  return <BangladeshTrustLanding initialLang="en" />;
}
