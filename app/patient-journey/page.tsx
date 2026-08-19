import type { Metadata } from "next";
import Section from "@/components/Section";
import JourneyTimeline from "@/components/JourneyTimeline";
import { journeySteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Patient Journey",
  description: "A clear, step-by-step explanation of what happens from your first inquiry through follow-up care.",
};

export default function PatientJourneyPage() {
  return (
    <Section
      eyebrow="Patient Journey"
      title="What happens, in order, from here to recovery"
      description="No sales language — just a clear account of each stage, so you know what to expect and when."
    >
      <JourneyTimeline steps={journeySteps} />
    </Section>
  );
}
