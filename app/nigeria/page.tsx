import type { Metadata } from "next";
import NigeriaTrustLanding from "./NigeriaTrustLanding";
import { getCountry } from "@/lib/countries";
import { africaFeaturedTreatments } from "@/lib/featuredTreatmentImages";

const country = getCountry("nigeria")!;

export const metadata: Metadata = {
  title: `Medical Treatment in India for Patients from Nigeria | TrueCare`,
  description: `Get connected with doctors and hospitals in India for treatment from Nigeria. Free medical opinion, hospital matching, visa guidance and travel support.`,
};

export default function Page() {
  const dedicatedPages = Object.fromEntries(
    country.treatmentPages.map((p) => [p.treatmentSlug, p.path])
  );

  return (
    <NigeriaTrustLanding
      content={{
        flag: country.flag,
        countryName: country.name,
        countrySlug: country.slug,
        heroHeadline: country.heroHeadline,
        heroSub: country.heroSub,
        whatsappMessage: country.whatsappMessage,
        dedicatedPages,
        featuredTreatments: africaFeaturedTreatments,
      }}
    />
  );
}
