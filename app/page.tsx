import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import ContactForm from "@/app/contact/ContactForm";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Container from "@/components/Container";
import TrustBadges from "@/components/TrustBadges";
import JourneyTimeline from "@/components/JourneyTimeline";
import TreatmentCard from "@/components/TreatmentCard";
import TestimonialCard from "@/components/TestimonialCard";
import DoctorCard from "@/components/DoctorCard";
import HospitalCard from "@/components/HospitalCard";
import PriceComparisonTable from "@/components/PriceComparisonTable";
import StatCounter from "@/components/StatCounter";
import FAQAccordion from "@/components/FAQAccordion";
import AnimatedSection from "@/components/AnimatedSection";
import { AnimatedStagger, AnimatedStaggerItem } from "@/components/AnimatedStagger";
import HeroGlow from "@/components/HeroGlow";
import TopDestinations from "@/components/TopDestinations";
import {
  treatments,
  journeySteps,
  testimonials,
  homeFaqs,
  whyIndiaStats,
  destinations,
  doctors,
  hospitals,
} from "@/lib/data";

// A representative sample for the homepage carousel — not the full
// 63-doctor roster (that lives on /doctors).
const featuredDoctorSlugs = [
  "dr-amit-kumar-chaurasia",
  "dr-kuldeep-arora",
  "dr-aditya-gupta",
  "dr-renu-raina-sehgal",
  "dr-i-p-s-oberoi",
  "dr-priya-tiwari",
];
const featuredDoctors = featuredDoctorSlugs
  .map((slug) => doctors.find((d) => d.slug === slug))
  .filter((d): d is NonNullable<typeof d> => Boolean(d));

export default function HomePage() {
  return (
    <>
      {/* HERO — image + lead form split, matching the reference layout */}
      <section className="relative overflow-hidden bg-hero-gradient dark:bg-hero-gradient-dark">
        <HeroGlow />
        <Container className="relative py-14 sm:py-20">
          <div className="grid grid-cols-1 gap-8 overflow-hidden rounded-3xl shadow-2xl lg:grid-cols-2">
            {/* Left — real photo */}
            <div className="relative min-h-[320px] lg:min-h-[560px]">
              <Image
                src="/images/hero-recovery-room.jpg"
                alt="A calm, comfortable recovery space for patients treated through TrueCare"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-navy-500 backdrop-blur-sm">
                  Making Medical Travel Effortless
                </span>
                <h1 className="mt-4 max-w-md text-balance text-3xl font-bold leading-[1.15] text-white sm:text-4xl">
                  Your Trusted Partner for Medical Treatment in India
                </h1>
              </div>
            </div>

            {/* Right — real, working lead form (same backend as /contact) */}
            <div className="flex flex-col justify-center bg-white p-6 dark:bg-surface-dark sm:p-10">
              <p className="text-sm text-navy-300 dark:text-white/60">
                Share a few details and your medical reports if you have them. A care coordinator
                responds within 24 hours.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          <AnimatedSection delay={0.15} className="mt-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
            <Button href="/contact" size="lg" icon={<MessageCircle size={18} />}>
              Book Free Consultation
            </Button>
            <Button href="/treatments" variant="secondary" size="lg" icon={<ArrowRight size={18} />}>
              Explore Treatments
            </Button>
          </AnimatedSection>

          <AnimatedSection delay={0.25} className="mt-14 w-full">
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
        <AnimatedStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {treatments.map((t) => (
            <AnimatedStaggerItem key={t.slug}>
              <TreatmentCard treatment={t} />
            </AnimatedStaggerItem>
          ))}
        </AnimatedStagger>
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

      {/* COST COMPARISON */}
      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow="Transparent Pricing"
        title="How India compares"
        description="Real, sourced typical costs — not marketing numbers. Your exact cost is confirmed after your reports are reviewed."
      >
        <PriceComparisonTable />
      </Section>

      {/* DOCTORS */}
      <Section
        eyebrow="Our Doctors"
        title="Specialists across every major discipline"
        description="A sample of the doctors in our network — see the full list, filterable by specialty and hospital."
      >
        <AnimatedStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDoctors.map((doc) => (
            <AnimatedStaggerItem key={doc.slug}>
              <DoctorCard doctor={doc} />
            </AnimatedStaggerItem>
          ))}
        </AnimatedStagger>
        <div className="mt-10 text-center">
          <Button href="/doctors" variant="ghost" icon={<ArrowRight size={16} />}>
            View all doctors
          </Button>
        </div>
      </Section>

      {/* HOSPITALS */}
      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow="Our Hospitals"
        title="Accredited hospitals across India"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hospitals.map((h) => (
            <HospitalCard key={h.slug} hospital={h} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/hospitals" variant="ghost" icon={<ArrowRight size={16} />}>
            View all hospitals
          </Button>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow="Patient Stories"
        title="What patients tell us after treatment"
      >
        <AnimatedStagger className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <AnimatedStaggerItem key={t.name}>
              <TestimonialCard {...t} />
            </AnimatedStaggerItem>
          ))}
        </AnimatedStagger>
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
