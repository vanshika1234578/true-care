"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  ShieldCheck,
  Languages,
  FileCheck2,
  Plane,
  Car,
  ChevronDown,
} from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import HeroGlow from "@/components/HeroGlow";
import FAQAccordion from "@/components/FAQAccordion";
import CountryTreatmentCard from "@/components/CountryTreatmentCard";
import TestimonialCard from "@/components/TestimonialCard";
import PriceComparisonTable from "@/components/PriceComparisonTable";
import { treatments, doctors, testimonials } from "@/lib/data";
import { maxSavingsPercent } from "@/lib/priceComparison";
import { fireConversion, trackGA4Event } from "@/lib/analytics";
import type { FeaturedTreatmentImage } from "@/lib/featuredTreatmentImages";

const WHATSAPP_NUMBER = "919720574548";

export type KenyaTrustContent = {
  flag: string;
  countryName: string;
  countrySlug: string;
  heroHeadline: string;
  heroSub: string;
  whatsappMessage: string;
  dedicatedPages?: Record<string, string>;
  featuredTreatments?: FeaturedTreatmentImage[];
};

function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Only claims already true elsewhere in this codebase — no invented patient
// counts or awards (matches the convention set in BangladeshTrustLanding).
const trustItems = [
  "JCI & NABH-accredited partner hospitals",
  "English & Swahili-speaking care coordinators",
  "Real doctors, matched to your specific case",
  "Medical visa guidance for every patient",
];

const supportItems = [
  {
    icon: Languages,
    title: "Interpreter",
    description: "An English and Swahili-speaking coordinator joins every hospital visit.",
  },
  {
    icon: FileCheck2,
    title: "Visa support",
    description: "We guide you through the documentation for your Indian medical visa.",
  },
  {
    icon: Car,
    title: "Airport pickup",
    description: "Our team meets you on arrival and takes you to the hospital.",
  },
];

const kenyaFaqs = [
  {
    q: "How do I travel from Kenya to India for treatment?",
    a: "Once a hospital confirms your treatment plan, we help you book flights to Delhi or Mumbai, share the hospital's invitation letter for your medical visa application, and arrange airport pickup and accommodation near the hospital.",
  },
  {
    q: "Is India more affordable than other options for Kenyan patients?",
    a: "For most major procedures, treatment in India typically costs a fraction of comparable private care in the UK or the Gulf, at JCI and NABH-accredited hospitals. See the cost comparison below for sourced figures on specific procedures.",
  },
  {
    q: "Do you have English-speaking coordinators?",
    a: "Yes. Every patient from Kenya is supported by an English and Swahili-speaking care coordinator, from your first inquiry through treatment and follow-up.",
  },
  {
    q: "What is the medical visa process for Kenyan patients?",
    a: "India offers a dedicated medical visa (e-Medical Visa) category. Once your hospital confirms a treatment plan, we provide the invitation letter you'll need — the application itself is submitted through India's official e-visa portal or the nearest Indian consulate, and processing times can vary, so we recommend applying as soon as your plan is confirmed.",
  },
];

export default function KenyaTrustLanding({ content }: { content: KenyaTrustContent }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    treatment: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          treatment: formData.treatment || "Not specified",
          message: formData.message || "No additional details provided.",
          country: content.countryName,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      fireConversion("leadFormSubmit");
      trackGA4Event("generate_lead", {
        method: "contact_form",
        country: content.countryName,
      });
      setFormStatus("success");
      setFormData({ name: "", phone: "", city: "", treatment: "", message: "" });
    } catch (error) {
      console.error("Lead form submission failed:", error);
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const kenyaTestimonials = testimonials.filter((t) => t.country === content.countryName);

  return (
    <>
      {/* HERO — warm navy-to-gold glow, in place of the site-wide cool
          blue/teal hero gradient, per the request to warm up this page
          specifically without touching the shared gradient other country
          pages still use. */}
      <section className="relative overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,rgba(224,165,55,0.16)_0%,rgba(47,111,228,0.10)_45%,rgba(255,255,255,0)_75%)] py-16 dark:bg-[radial-gradient(120%_120%_at_50%_0%,rgba(224,165,55,0.22)_0%,rgba(47,111,228,0.16)_45%,rgba(11,18,32,0)_75%)] sm:py-24">
        <HeroGlow />
        <Container className="relative text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#FBF0DC] px-4 py-1.5 text-sm font-semibold text-[#A9711D] dark:bg-primary-500/10 dark:text-primary-300">
            {content.flag} Treatment in India for Patients From {content.countryName}
          </p>
          <h1 className="mx-auto max-w-3xl text-balance font-display text-4xl font-bold text-navy-500 dark:text-white sm:text-5xl">
            {content.heroHeadline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-navy-300 dark:text-white/60">
            {content.heroSub}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              href="#enquiry"
              variant="accent"
              size="lg"
              className="!bg-[#E0A537] hover:!bg-[#C98A24]"
            >
              Get a Free Medical Opinion
            </Button>
            <Button
              href={whatsappHref(content.whatsappMessage)}
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle size={18} />}
              target="_blank"
              onClick={() => fireConversion("whatsappClick")}
            >
              Talk to Us on WhatsApp
            </Button>
          </div>
        </Container>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-navy-100/60 bg-[#FFFBF3] py-6 dark:border-white/10 dark:bg-white/5">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustItems.map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-sm font-medium text-navy-400 dark:text-white/70"
              >
                <ShieldCheck size={16} className="flex-none text-[#C8963E]" />
                {item}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* IMPACT STATS */}
      <section className="border-b border-navy-100/60 bg-white py-8 dark:border-white/10 dark:bg-surface-dark">
        <Container>
          <div className="grid grid-cols-3 divide-x divide-navy-100/70 text-center dark:divide-white/10">
            <div className="px-3">
              <p className="font-display text-3xl font-bold text-navy-500 dark:text-white sm:text-4xl">1,000+</p>
              <p className="mt-1 text-xs font-medium text-navy-300 dark:text-white/60 sm:text-sm">Happy patients</p>
            </div>
            <div className="px-3">
              <p className="font-display text-3xl font-bold text-navy-500 dark:text-white sm:text-4xl">200+</p>
              <p className="mt-1 text-xs font-medium text-navy-300 dark:text-white/60 sm:text-sm">Doctors</p>
            </div>
            <div className="px-3">
              <p className="font-display text-3xl font-bold text-navy-500 dark:text-white sm:text-4xl">50+</p>
              <p className="mt-1 text-xs font-medium text-navy-300 dark:text-white/60 sm:text-sm">Hospitals</p>
            </div>
          </div>
        </Container>
      </section>

      {/* WHY TRUECARE */}
      <Section eyebrow="Why TrueCare" title="A simpler way to plan treatment in India" description="From the first medical opinion to your return home, we help coordinate the journey around your care.">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Free medical opinion", "Share your reports and get matched with relevant specialists before you travel."],
            ["02", "Hospital matching", "Compare suitable hospitals and treatment options for your case."],
            ["03", "Travel coordination", "Get practical support with visa guidance, airport pickup and local arrangements."],
            ["04", "Care follow-up", "Stay connected with your care coordinator through treatment and follow-up."],
          ].map(([number, title, description]) => (
            <div key={number} className="rounded-2xl border border-navy-100/70 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5">
              <span className="text-sm font-bold text-[#C8963E]">{number}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-navy-500 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-navy-300 dark:text-white/60">{description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* POPULAR TREATMENTS (real supplied images) */}
      {content.featuredTreatments && content.featuredTreatments.length > 0 && (
        <Section eyebrow="Popular in Your Region" title="Care our patients ask about most">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-3">
            {content.featuredTreatments.map((ft) => (
              <Link
                key={ft.treatmentSlug}
                href={content.dedicatedPages?.[ft.treatmentSlug] ?? `/${content.countrySlug}/${ft.treatmentSlug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl shadow-glow transition-transform duration-500 hover:-translate-y-1.5"
              >
                <span className="absolute right-4 top-4 z-10 rounded-full bg-[#E0A537] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
                  Popular
                </span>
                <Image
                  src={ft.image}
                  alt={`${ft.title} — ${ft.subtitle}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* LEAD FORM */}
      <Section
        id="enquiry"
        eyebrow="Get a Free Medical Opinion"
        title="Tell us about your case"
        description="Share a few details and, if you have them, your medical reports. A Kenya-focused care coordinator will get back to you, usually within 24 hours."
      >
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-xl rounded-3xl border border-navy-100 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
                Full name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder="e.g. Grace Wanjiru"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
                WhatsApp / phone number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder="+254 7XX XXX XXX"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
                City in Kenya
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder="Nairobi, Mombasa, Kisumu…"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
                Treatment needed
              </label>
              <div className="relative">
                <select
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                  className="w-full appearance-none rounded-xl border border-navy-100 bg-white px-4 py-3 pr-10 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                >
                  <option value="">Select a treatment</option>
                  {treatments.map((t) => (
                    <option key={t.slug} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-300 dark:text-white/50"
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
              Tell us briefly about the condition (optional)
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full resize-none rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder="You can also share your medical reports over WhatsApp after submitting."
            />
          </div>

          {formStatus === "success" && (
            <p className="mt-5 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
              Thank you. A Kenya-focused care coordinator will reach out shortly.
            </p>
          )}
          {formStatus === "error" && (
            <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
              Something went wrong. Please try again or contact us on WhatsApp.
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-xl bg-[#2451C7] px-6 py-4 font-semibold text-white transition hover:bg-[#1B3E9E] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send for Free Review"}
          </button>

          <p className="mt-4 text-center text-xs text-navy-300 dark:text-white/50">
            By submitting, you agree to be contacted on WhatsApp, phone, or email about your
            enquiry. Your information is used only to coordinate your care.
          </p>
        </form>
      </Section>

      {/* TRAVEL & VISA */}
      <Section
        className="bg-[#FBF6EE] dark:bg-surface-darkSoft"
        eyebrow="Getting Here"
        title="Travel & visa information"
      >
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex gap-4 rounded-2xl border border-navy-100/70 bg-white p-6 dark:border-white/10 dark:bg-white/5">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#FBF0DC] text-[#A9711D] dark:bg-primary-500/10 dark:text-primary-300">
              <Plane size={20} />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-navy-500 dark:text-white">
                Flights from Kenya
              </h3>
              <p className="mt-2 text-sm text-navy-300 dark:text-white/60">
                Several airlines connect Nairobi to Delhi and Mumbai, including direct and
                one-stop options. We'll help you find a routing that fits your treatment dates.
              </p>
            </div>
          </div>
          <div className="flex gap-4 rounded-2xl border border-navy-100/70 bg-white p-6 dark:border-white/10 dark:bg-white/5">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-[#FBF0DC] text-[#A9711D] dark:bg-primary-500/10 dark:text-primary-300">
              <FileCheck2 size={20} />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-navy-500 dark:text-white">
                Medical visa
              </h3>
              <p className="mt-2 text-sm text-navy-300 dark:text-white/60">
                India offers a dedicated medical e-visa. We provide the hospital's invitation
                letter for your application — apply as soon as your treatment plan is confirmed.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* SUPPORT */}
      <Section eyebrow="What We Take Care Of" title="Our support for Kenya patients">
        <div className="mx-auto mb-8 max-w-3xl rounded-2xl bg-[#FBF6EE] px-6 py-5 text-sm text-navy-400 dark:bg-white/5 dark:text-white/70">
          English and Swahili-speaking coordinators, ready to support patients from Nairobi,
          Mombasa, Kisumu, and across Kenya.
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {supportItems.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-navy-100/70 bg-white p-6 text-center shadow-card dark:border-white/10 dark:bg-white/5"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FBF0DC] text-[#A9711D] dark:bg-primary-500/10 dark:text-primary-300">
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

      {/* ALL TREATMENTS */}
      <Section
        className="bg-[#FBF6EE] dark:bg-surface-darkSoft"
        eyebrow="Choose a Treatment"
        title="What can we help you with?"
        description="Pick a treatment to see the real doctors available for your case."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((t) => {
            const doctorCount = doctors.filter((d) => d.treatmentSlug === t.slug).length;
            const dedicatedHref = content.dedicatedPages?.[t.slug];
            return (
              <CountryTreatmentCard
                key={t.slug}
                treatment={t}
                countrySlug={content.countrySlug}
                doctorCount={doctorCount}
                href={dedicatedHref}
              />
            );
          })}
        </div>
      </Section>

      {/* SAVINGS + COST — warm indigo-navy instead of the cooler default
          navy-500, with a richer gold for the headline figure. */}
      <section className="bg-[#241E38] py-14 dark:bg-surface-dark">
        <Container className="text-center">
          <p className="font-display text-5xl font-bold text-[#E0A537] sm:text-6xl">
            Save up to {maxSavingsPercent}%
          </p>
          <p className="mx-auto mt-3 max-w-md text-balance text-white/70">
            on your treatment, compared to typical private care in the UK or Dubai.
          </p>
        </Container>
      </section>

      <Section eyebrow="The Cost of Care" title="Great care shouldn't cost a fortune">
        <PriceComparisonTable />
        <div className="mt-8 text-center">
          <Button
            href="#enquiry"
            variant="accent"
            size="lg"
            className="!bg-[#E0A537] hover:!bg-[#C98A24]"
          >
            Get My Personalized Estimate
          </Button>
        </div>
      </Section>

      {/* TESTIMONIAL */}
      {kenyaTestimonials.length > 0 && (
        <Section
          className="bg-[#FBF6EE] dark:bg-surface-darkSoft"
          eyebrow="Patient Stories"
          title="What Kenya patients say"
        >
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6">
            {kenyaTestimonials.map((t) => (
              <TestimonialCard
                key={t.name}
                name={t.name}
                country={t.country}
                treatment={t.treatment}
                quote={t.quote}
              />
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section eyebrow="Frequently Asked Questions" title="Common questions from Kenya patients">
        <FAQAccordion faqs={kenyaFaqs} />
      </Section>

      {/* FINAL CTA — same warm gold/navy glow as the hero, for a consistent
          bookend rather than the site's default cool blue/teal gradient. */}
      <section className="bg-[radial-gradient(120%_120%_at_50%_0%,rgba(224,165,55,0.16)_0%,rgba(47,111,228,0.10)_45%,rgba(255,255,255,0)_75%)] py-16 dark:bg-[radial-gradient(120%_120%_at_50%_0%,rgba(224,165,55,0.22)_0%,rgba(47,111,228,0.16)_45%,rgba(11,18,32,0)_75%)] sm:py-20">
        <Container className="text-center">
          <h2 className="mx-auto max-w-lg text-balance text-3xl font-bold text-navy-500 dark:text-white sm:text-4xl">
            Need a specialist to review your reports?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-300 dark:text-white/60">
            Send your reports for a free medical opinion, then compare treatment options and
            costs with confidence.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              href="#enquiry"
              variant="accent"
              size="lg"
              className="!bg-[#E0A537] hover:!bg-[#C98A24]"
            >
              Free Medical Opinion
            </Button>
            <Button
              href={whatsappHref(content.whatsappMessage)}
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle size={18} />}
              target="_blank"
              onClick={() => fireConversion("whatsappClick")}
            >
              Ask on WhatsApp
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
