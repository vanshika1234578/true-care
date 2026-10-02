import type { Metadata } from "next";
import Section from "@/components/Section";
import TestimonialFolders from "@/components/TestimonialFolders";

export const metadata: Metadata = {
  title: "Patient Stories",
  description:
    "Hear from patients who traveled to India for treatment through TrueCare. Browse testimonials by treatment: orthopedics, cancer care, cardiology, and kidney and liver transplant.",
};

export default function PatientStoriesPage() {
  return (
    <Section
      eyebrow="Patient Stories"
      title="Testimonials by treatment"
      description="Choose a treatment to see what patients and families shared with us. Every story reflects one patient's specific experience — treatment outcomes vary by individual case."
    >
      <TestimonialFolders />
    </Section>
  );
}
