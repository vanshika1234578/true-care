import type { Metadata } from "next";
import Section from "@/components/Section";
import HospitalDirectory from "@/components/HospitalDirectory";
import { hospitals } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hospitals",
  description: "Accredited partner hospitals across India, matched to your specific treatment needs.",
};

export default function HospitalsPage() {
  return (
    <Section
      eyebrow="Hospitals"
      title="Accredited hospitals, matched to your condition"
      description="We work with hospitals across specialties and cities. Recommendations are based on your medical review, not a fixed list."
    >
      <HospitalDirectory hospitals={hospitals} />
    </Section>
  );
}
