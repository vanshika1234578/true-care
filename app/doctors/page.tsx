import type { Metadata } from "next";
import Section from "@/components/Section";
import DoctorCard from "@/components/DoctorCard";
import { doctors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Doctors",
  description: "Meet the specialists at TrueCare's partner hospitals across India.",
};

export default function DoctorsPage() {
  return (
    <Section
      eyebrow="Doctors"
      title="Specialists who treat international patients regularly"
      description="Every doctor listed here is affiliated with an accredited partner hospital and has experience coordinating care across time zones and languages."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {doctors.map((d) => (
          <DoctorCard key={d.slug} doctor={d} />
        ))}
      </div>
    </Section>
  );
}
