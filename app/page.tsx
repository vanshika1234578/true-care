import { ArrowRight, MessageCircle } from "lucide-react";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Container from "@/components/Container";
import TrustBadges from "@/components/TrustBadges";
import JourneyTimeline from "@/components/JourneyTimeline";
import TreatmentCard from "@/components/TreatmentCard";
import TestimonialCard from "@/components/TestimonialCard";
import StatCounter from "@/components/StatCounter";
import FAQAccordion from "@/components/FAQAccordion";
import AnimatedSection from "@/components/AnimatedSection";
import TopDestinations from "@/components/TopDestinations";
import {
  treatments,
  journeySteps,
  testimonials,
  homeFaqs,
  whyIndiaStats,
  destinations,
} from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-gradient dark:bg-hero-gradient-dark">
        <Container className="relative flex flex-col items-center pt-20 pb-24 text-center sm:pt-28 sm:pb-32">
          <AnimatedSection>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-semibold text-primary-600 dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-primary-300">
              Making Medical Travel Effortless
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold leading-[1.1] text-navy-500 sm:text-5xl lg:text-6xl dark:text-white">
              Your Trusted Partner for{" "}
              <span className="gradient-text">Medical Treatment</span> in India.
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-navy-300 dark:text-white/60">
              Helping international patients find trusted hospitals, experienced doctors,
              transparent pricing, and complete treatment support.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg" icon={<MessageCircle size={18} />}>
                Book Free Consultation
              </Button>
              <Button href="/treatments" variant="secondary" size="lg" icon={<ArrowRight size={18} />}>
                Explore Treatments
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.25} className="mt-16 w-full">
            <TrustBadges />
          </AnimatedSection>
        </Container>
      </section>

      {/* TOP MEDICAL DESTINATIONS */}
      <TopDestinations destinations={destinations} />

      {/* PATIENT JOURNEY PREVIEW */}
      <Section
        eyebrow="How it works"
        title="A clear path, from first message to recovery"
        description="No guesswork at any stage — here's exactly what happens once you reach out."
      >
        <JourneyTimeline steps={journeySteps} compact />
        <div className="mt-10 text-center">
          <Button href="/patient-journey" variant="ghost" icon={<ArrowRight size={16} />}>
            See the full patient journey
          </Button>
        </div>
      </Section>

      {/* TREATMENTS */}
      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow="Treatments"
        title="Specialist care, across every major discipline"
        description="Each treatment page outlines what to expect — overview, options, recovery, and estimated stay."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {treatments.map((t) => (
            <TreatmentCard key={t.slug} treatment={t} />
          ))}
        </div>
      </Section>

      {/* FIND A DOCTOR TEASER */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-primary-100 bg-primary-50/60 px-8 py-12 text-center sm:px-16 dark:border-primary-500/20 dark:bg-primary-500/5">
          <h2 className="mx-auto max-w-xl text-balance text-2xl font-bold text-navy-500 sm:text-3xl dark:text-white">
            Not sure which specialist you need?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-balance text-navy-300 dark:text-white/60">
            Upload a report or describe your concern — we'll help match you to the right doctor
            and answer your questions along the way.
          </p>
          <div className="mt-7">
            <Button href="/find-doctor" size="lg" icon={<MessageCircle size={18} />}>
              Find My Doctor
            </Button>
          </div>
        </div>
      </Section>

      {/* WHY INDIA STATS */}
      <Section
        eyebrow="Why India"
        title="A healthcare system built for scale and skill"
        description="Numbers alone don't build trust — but they're a useful starting point."
      >
        <div className="grid grid-cols-2 gap-8 rounded-3xl border border-navy-100/70 bg-white p-8 sm:grid-cols-4 dark:border-white/10 dark:bg-white/5">
          {whyIndiaStats.map((s, i) => (
            <StatCounter key={s.label} value={s.value} label={s.label} delay={i * 0.05} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/why-india" variant="ghost" icon={<ArrowRight size={16} />}>
            Learn more about why India
          </Button>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow="Patient Stories"
        title="What patients tell us after treatment"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/patient-stories" variant="ghost" icon={<ArrowRight size={16} />}>
            Read more patient stories
          </Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Common Questions" title="Answers before you ask">
        <FAQAccordion faqs={homeFaqs} />
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl bg-navy-500 px-8 py-16 text-center sm:px-16">
          <div className="absolute inset-0 bg-hero-gradient-dark" />
          <div className="relative">
            <h2 className="mx-auto max-w-lg text-balance text-3xl font-bold text-white sm:text-4xl">
              Ready to talk to someone who can help?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-balance text-white/60">
              A free consultation is the first step — no obligation, no pressure.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg" icon={<MessageCircle size={18} />}>
                Book Free Consultation
              </Button>
              <Button href="/treatments" variant="secondary" size="lg">
                Explore Treatments
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
