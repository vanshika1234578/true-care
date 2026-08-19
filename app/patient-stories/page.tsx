import type { Metadata } from "next";
import Section from "@/components/Section";
import TestimonialCard from "@/components/TestimonialCard";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Patient Stories",
  description: "Hear from patients who traveled to India for treatment through TrueCare.",
};

export default function PatientStoriesPage() {
  return (
    <Section
      eyebrow="Patient Stories"
      title="In their own words"
      description="Every story here reflects one patient's specific experience — treatment outcomes vary by individual case."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} {...t} />
        ))}
      </div>
    </Section>
  );
}
