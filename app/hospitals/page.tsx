import type { Metadata } from "next";
import Section from "@/components/Section";
import HospitalCard from "@/components/HospitalCard";
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {hospitals.map((h) => (
          <HospitalCard key={h.slug} hospital={h} />
        ))}
      </div>
    </Section>
  );
}
