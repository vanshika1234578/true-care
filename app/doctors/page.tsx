import type { Metadata } from "next";
import Section from "@/components/Section";
import DoctorDirectory from "@/components/DoctorDirectory";

export const metadata: Metadata = {
  title: "Doctors",
  description: "Meet the specialists at TrueCare's partner hospitals across India.",
};

export default function DoctorsPage() {
  return (
    <Section
      eyebrow="Doctors"
      title="Specialists who treat international patients regularly"
      description="Every doctor listed here is affiliated with an accredited partner hospital and has experience coordinating care across time zones and languages. Filter by location or speciality to find the right specialist."
    >
      <DoctorDirectory />
    </Section>
  );
}
