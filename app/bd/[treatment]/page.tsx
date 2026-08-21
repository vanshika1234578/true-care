import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CountryTreatmentDoctorList from "@/components/CountryTreatmentDoctorList";
import { getCountry } from "@/lib/countries";
import { treatments } from "@/lib/data";

const country = getCountry("bd")!;

export function generateStaticParams() {
  return treatments.map((t) => ({ treatment: t.slug }));
}

export function generateMetadata({ params }: { params: { treatment: string } }): Metadata {
  const treatment = treatments.find((t) => t.slug === params.treatment);
  if (!treatment) return {};
  return {
    title: `${treatment.name} in India for Patients From ${country.name}`,
    description: `${treatment.summary} Real doctors, real hospitals, for patients from ${country.name}.`,
  };
}

export default function Page({ params }: { params: { treatment: string } }) {
  const treatment = treatments.find((t) => t.slug === params.treatment);
  if (!treatment) notFound();

  return (
    <CountryTreatmentDoctorList
      countryFlag={country.flag}
      countryName={country.name}
      treatmentSlug={treatment.slug}
      whatsappMessage={country.whatsappMessage}
    />
  );
}
