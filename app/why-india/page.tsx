import type { Metadata } from "next";
import { Award, Cpu, IndianRupee, Stethoscope, FileCheck, Globe2 } from "lucide-react";
import Section from "@/components/Section";
import AnimatedSection from "@/components/AnimatedSection";
import StatCounter from "@/components/StatCounter";
import { whyIndiaStats } from "@/lib/data";

export const metadata: Metadata = {
  title: "Why India",
  description: "Healthcare quality, accreditation, doctors, technology, affordability, and visa support for international patients in India.",
};

const pillars = [
  {
    icon: Stethoscope,
    title: "Healthcare Quality",
    description: "Hospitals follow structured clinical protocols and treat a high volume of complex cases, giving specialist teams deep, repeated experience.",
  },
  {
    icon: Award,
    title: "Accreditation",
    description: "Many partner hospitals hold JCI or NABH accreditation, reflecting adherence to internationally recognized safety and quality standards.",
  },
  {
    icon: FileCheck,
    title: "Doctors",
    description: "Specialists often trained or fellowship-qualified internationally, with substantial experience treating patients from abroad.",
  },
  {
    icon: Cpu,
    title: "Technology",
    description: "Advanced imaging, robotic-assisted surgery, and radiation technology are available at major centers across metro cities.",
  },
  {
    icon: IndianRupee,
    title: "Affordability",
    description: "Treatment costs are typically a fraction of equivalent procedures in the US, UK, or Gulf region, without compromising on care standards.",
  },
  {
    icon: Globe2,
    title: "Medical Visa & International Patients",
    description: "India issues a dedicated medical visa category, and hospitals maintain international patient departments to handle documentation.",
  },
];

export default function WhyIndiaPage() {
  return (
    <>
      <Section
        eyebrow="Why India"
        title="A healthcare system built to serve patients from around the world"
        description="India has become a destination for medical travel not by chance, but through sustained investment in hospitals, specialists, and technology."
      >
        <div className="grid grid-cols-2 gap-8 rounded-3xl border border-navy-100/70 bg-white p-8 sm:grid-cols-4 dark:border-white/10 dark:bg-white/5">
          {whyIndiaStats.map((s, i) => (
            <StatCounter key={s.label} value={s.value} label={s.label} delay={i * 0.05} />
          ))}
        </div>
      </Section>

      <Section className="bg-surface-soft dark:bg-surface-darkSoft">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description }, i) => (
            <AnimatedSection
              key={title}
              delay={i * 0.05}
              className="rounded-2xl border border-navy-100/70 bg-white p-7 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-navy-500 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm text-navy-300 dark:text-white/60">{description}</p>
            </AnimatedSection>
          ))}
        </div>
      </Section>
    </>
  );
}
