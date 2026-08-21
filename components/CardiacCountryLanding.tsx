"use client";

import { MessageCircle, ShieldCheck, Plane, Users, PhoneCall } from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import HeroGlow from "@/components/HeroGlow";
import FAQAccordion from "@/components/FAQAccordion";
import DoctorCard from "@/components/DoctorCard";
import HospitalCard from "@/components/HospitalCard";
import PriceComparisonTable from "@/components/PriceComparisonTable";
import { AnimatedStagger, AnimatedStaggerItem } from "@/components/AnimatedStagger";
import { doctors, hospitals, treatments } from "@/lib/data";
import { maxSavingsPercent } from "@/lib/priceComparison";
import { maxSavingsPercent } from "@/lib/priceComparison";

const WHATSAPP_NUMBER = "919720574548";

export type CardiacCountryContent = {
  flag: string;
  countryName: string;
  heroEyebrow: string; // e.g. "Cardiac Care · Oman → India"
  heroHeadline: string;
  heroSub: string;
  whatsappMessage: string;
};

function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Real, verified support TrueCare provides — sourced from existing site
// content (homeFaqs / journeySteps in lib/data.ts). No facility, service, or
// claim here that isn't already stated elsewhere on the live site.
const supportItems = [
  {
    icon: ShieldCheck,
    title: "Medical Visa Guidance",
    description: "We'll walk you through everything you need for your Indian medical visa.",
  },
  {
    icon: Plane,
    title: "Arrival Assistance",
    description: "Someone's there to meet you at the airport and help you settle in.",
  },
  {
    icon: Users,
    title: "Companion Support",
    description: "Bringing someone with you? We'll help sort accommodation for you both.",
  },
  {
    icon: PhoneCall,
    title: "WhatsApp Coordinator",
    description: "One coordinator, with you on WhatsApp in Arabic or English, from day one through follow-up.",
  },
];

export default function CardiacCountryLanding({ content }: { content: CardiacCountryContent }) {
  const cardiology = treatments.find((t) => t.slug === "cardiology")!;

  // Real cardiac specialists only — pulled live from lib/data.ts, not hardcoded.
  const cardiacDoctors = doctors.filter((d) => d.treatmentSlug === "cardiology");

  // The 3 hospitals with a confirmed cardiac specialist on file today.
  // Artemis and Max Vaishali are real partner hospitals but have no cardiac
  // doctor entries yet — shown separately below rather than silently omitted
  // or padded with invented names.
  const cardiacHospitalSlugs = new Set(cardiacDoctors.map((d) => d.hospitalSlug));
  const cardiacHospitals = hospitals.filter((h) => cardiacHospitalSlugs.has(h.slug));
  const pendingHospitals = hospitals.filter((h) => !cardiacHospitalSlugs.has(h.slug));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-gradient py-16 dark:bg-hero-gradient-dark sm:py-24">
        <HeroGlow />
        <Container className="relative text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
            {content.flag} {content.heroEyebrow}
          </p>
          <h1 className="mx-auto max-w-3xl text-balance font-display text-4xl font-bold text-navy-500 dark:text-white sm:text-5xl">
            {content.heroHeadline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-navy-300 dark:text-white/60">
            {content.heroSub}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={whatsappHref(content.whatsappMessage)} variant="accent" size="lg" icon={<MessageCircle size={18} />}>
              Share My Reports on WhatsApp
            </Button>
            <Button href="#cost" variant="secondary" size="lg">
              See Typical Costs
            </Button>
          </div>
        </Container>
      </section>

      {/* WHY PATIENTS REACH OUT — reuses real treatment overview, not new copy */}
      <Section
        eyebrow={`For Patients From ${content.countryName}`}
        title="A second opinion, before you decide anything"
        description={cardiology.overview}
      >
        <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
          {cardiology.symptoms.map((s) => (
            <div
              key={s}
              className="rounded-xl border border-navy-100/70 bg-white px-4 py-3 text-sm text-navy-400 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
            >
              {s}
            </div>
          ))}
        </div>
      </Section>

      {/* NETWORK — real doctors + hospitals only, pulled live from lib/data.ts */}
      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow="How It Works"
        title="You don't have to pick a hospital — we'll do that for you"
        description="Send us your reports, and our medical team will match you with the right hospital and cardiac specialist for your case."
      >
        <AnimatedStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cardiacDoctors.map((doc) => (
            <AnimatedStaggerItem key={doc.slug}>
              <DoctorCard doctor={doc} />
            </AnimatedStaggerItem>
          ))}
        </AnimatedStagger>

        {pendingHospitals.length > 0 && (
          <p className="mt-8 text-center text-sm text-navy-300 dark:text-white/50">
            We're also proud to work with {pendingHospitals.map((h) => h.name).join(" and ")} — we're
            still building out their cardiac team's profiles here. Send your reports anyway, and
            we'll match you with the right specialist across our whole network.
          </p>
        )}
      </Section>

      {/* HOSPITALS */}
      <Section eyebrow="Where You'll Be Treated" title="Hospitals you can trust, across India">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cardiacHospitals.map((h) => (
            <HospitalCard key={h.slug} hospital={h} />
          ))}
        </div>
      </Section>

      {/* SUPPORT — reframed as a numbered journey (TMTC-style), still only
          the real, existing TrueCare services — no invented week-by-week
          timing, since we don't have verified data for that. */}
      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow="What We Take Care Of"
        title="Your journey, one step at a time"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {supportItems.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="relative rounded-2xl border border-navy-100/70 bg-white p-6 text-center shadow-card dark:border-white/10 dark:bg-white/5"
            >
              <span className="absolute left-5 top-5 font-display text-2xl font-bold text-primary-100 dark:text-white/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-navy-500 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm text-navy-300 dark:text-white/60">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SAVINGS BANNER — computed directly from our own sourced price
          comparison data (see lib/priceComparison.ts), not a separate claim */}
      <section className="bg-navy-500 py-14 dark:bg-surface-dark">
        <Container className="text-center">
          <p className="font-display text-5xl font-bold text-accent-500 sm:text-6xl">
            Save up to {maxSavingsPercent}%
          </p>
          <p className="mx-auto mt-3 max-w-md text-balance text-white/70">
            on your treatment, compared to typical private care in the UK or Dubai — see the real
            numbers below.
          </p>
        </Container>
      </section>

      {/* COST — shared, sourced UK/Dubai/India comparison table */}
      <Section id="cost" eyebrow="The Cost of Care" title="Great care shouldn't cost a fortune">
        <div className="mx-auto mb-10 max-w-2xl rounded-3xl bg-accent-500 p-8 text-center text-white sm:p-10">
          <p className="font-display text-4xl font-bold sm:text-5xl">
            Save up to {maxSavingsPercent}%
          </p>
          <p className="mt-2 text-white/80">
            on cardiac treatment, compared to typical UK private prices — real numbers, not a
            marketing figure. See exactly how below.
          </p>
        </div>

        <PriceComparisonTable />

        <div className="mx-auto mt-8 max-w-2xl rounded-3xl bg-navy-500 p-8 text-center text-white sm:p-10">
          <p className="font-display text-4xl font-bold">$6,000 – $12,500</p>
          <p className="mt-3 text-white/70">
            That's the typical range for a full cardiac treatment package — it just depends on the
            procedure and how complex your case is. We'll only ever confirm your real cost after
            our medical team has actually seen your reports, so this is here to help you plan, not
            as a quote.
          </p>
          <Button
            href={whatsappHref(content.whatsappMessage)}
            variant="accent"
            size="lg"
            className="mt-6"
            icon={<MessageCircle size={18} />}
          >
            Get My Personalized Estimate
          </Button>
        </div>
      </Section>

      {/* FAQ — reuses the treatment's real FAQs plus logistics ones */}
      <Section eyebrow="Frequently Asked Questions" title="Common questions">
        <FAQAccordion
          faqs={[
            ...cardiology.faqs,
            { q: "How quickly can my case be reviewed?", a: "Usually within 2–4 hours on WhatsApp during business hours. We'll also tell you when the full review will be ready." },
            { q: "Can a family member travel with me?", a: "Yes — we'll help arrange their visa and stay too." },
            { q: "Is my medical information confidential?", a: "Yes. Only your medical team sees your reports." },
          ]}
        />
      </Section>

      {/* FINAL CTA */}
      <section className="bg-hero-gradient py-16 dark:bg-hero-gradient-dark sm:py-20">
        <Container className="text-center">
          <h2 className="mx-auto max-w-lg text-balance text-3xl font-bold text-navy-500 dark:text-white sm:text-4xl">
            Ready for a clear answer about your heart?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-balance text-navy-300 dark:text-white/60">
            Send your reports today. It's free, and there's no obligation to go any further.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href={whatsappHref(content.whatsappMessage)} variant="accent" size="lg" icon={<MessageCircle size={18} />}>
              Share My Reports on WhatsApp
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
