import type { Metadata } from "next";
import Section from "@/components/Section";
import TreatmentCard from "@/components/TreatmentCard";
import { treatments } from "@/lib/data";

export const metadata: Metadata = {
  title: "Treatments",
  description: "Explore specialist treatments available through TrueCare's partner hospitals in India.",
};

export default function TreatmentsPage() {
  return (
    <Section
      eyebrow="Treatments"
      title="Find the right specialist care"
      description="Each treatment includes an overview, common symptoms, treatment options, recovery expectations, and estimated stay — so you know what to expect before you decide."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {treatments.map((t) => (
          <TreatmentCard key={t.slug} treatment={t} />
        ))}
      </div>
    </Section>
  );
}
