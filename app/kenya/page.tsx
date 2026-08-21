import type { Metadata } from "next";
import CountryHub from "@/components/CountryHub";
import { getCountry } from "@/lib/countries";
import { africaFeaturedTreatments } from "@/lib/featuredTreatmentImages";

const country = getCountry("kenya")!;

export const metadata: Metadata = {
  title: `Treatment in India for Patients From ${country.name}`,
  description: `Real doctors and hospitals in India for patients from ${country.name}. Send your medical reports for a free specialist review.`,
};

export default function Page() {
  const dedicatedPages = Object.fromEntries(
    country.treatmentPages.map((p) => [p.treatmentSlug, p.path])
  );

  return (
    <CountryHub
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
