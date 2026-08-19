import type { Metadata } from "next";
import { ShieldCheck, FileSearch, MessageCircleQuestion } from "lucide-react";
import Section from "@/components/Section";
import AnimatedSection from "@/components/AnimatedSection";
import DoctorFinderChat from "@/components/DoctorFinderChat";

export const metadata: Metadata = {
  title: "Find a Doctor",
  description: "Upload your medical report and get matched with the right specialist in India — ask follow-up questions anytime.",
};

const steps = [
  { icon: FileSearch, title: "Upload your report", text: "Lab results, scans, or a prior diagnosis letter — PDF or photo." },
  { icon: MessageCircleQuestion, title: "Ask anything", text: "Costs, hospitals, recovery time, or what a specific finding means." },
  { icon: ShieldCheck, title: "Get matched, not diagnosed", text: "We point you to the right specialist — they confirm everything." },
];

export default function FindDoctorPage() {
  return (
    <>
      <Section
        eyebrow="AI-assisted matching"
        title="Find the right specialist for your report"
        description="Upload a report or describe your concern, and we'll help match you to a relevant doctor on our network — then answer any follow-up questions you have."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <AnimatedSection key={s.title} delay={i * 0.05} className="rounded-2xl border border-navy-100/70 bg-white p-5 dark:border-white/10 dark:bg-white/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                <s.icon size={20} />
              </div>
              <h3 className="mt-3 font-display text-sm font-semibold text-navy-500 dark:text-white">{s.title}</h3>
              <p className="mt-1.5 text-sm text-navy-300 dark:text-white/60">{s.text}</p>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <Section className="bg-surface-soft dark:bg-surface-darkSoft">
        <div className="mx-auto max-w-3xl">
          <DoctorFinderChat />
        </div>
      </Section>
    </>
  );
}
