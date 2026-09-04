"use client";

import { useState } from "react";
import { MessageCircle, ShieldCheck, Users, Globe2, FileCheck2, Plane } from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import HeroGlow from "@/components/HeroGlow";
import FAQAccordion from "@/components/FAQAccordion";
import { doctors, treatments } from "@/lib/data";
import CountryTreatmentCard from "@/components/CountryTreatmentCard";
import { fireConversion } from "@/lib/analytics";
import { content, type Lang } from "./BangladeshTrustContent";

const WHATSAPP_NUMBER = "919720574548";

// Icons for the trust strip, in the same order as content.trustStrip.items.
// Kept as a fixed, non-localized array — icons don't need translation.
const trustIcons = [ShieldCheck, Users, Globe2, FileCheck2, Plane, Users];

function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function track(event: string, extra?: Record<string, unknown>) {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event, ...extra });
  }
}

export default function BangladeshTrustLanding({
  initialLang = "en",
}: {
  initialLang?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = content[lang];

  const chooseLang = (next: Lang) => {
    setLang(next);
    track("language_switch", { lang: next });
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    concern: "",
    city: "",
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
          message: formData.concern,
          city: formData.city,
          country: "Bangladesh",
          treatment: "General Enquiry",
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      fireConversion("leadFormSubmit");
      setFormStatus("success");
      setFormData({ name: "", phone: "", concern: "", city: "" });
    } catch (error) {
      console.error("Lead form submission failed:", error);
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {/* Language toggle — fixed position, not tied to RTL/LTR since Bengali
          reads left-to-right like English. */}
      <div className="border-b border-navy-100/60 bg-navy-50/60 py-2.5 dark:border-white/10 dark:bg-white/5">
        <Container className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="flex items-center gap-2 font-medium text-navy-500 dark:text-white/80">
            {t.hero.eyebrow}
          </span>
          <div className="flex items-center gap-1 rounded-full bg-white p-1 text-xs font-semibold shadow-card dark:bg-white/10">
            <button
              onClick={() => chooseLang("en")}
              className={`rounded-full px-3 py-1 transition-colors ${
                lang === "en" ? "bg-primary-500 text-white" : "text-navy-400 dark:text-white/60"
              }`}
            >
              {content.en.langToggle.en}
            </button>
            <button
              onClick={() => chooseLang("bn")}
              className={`rounded-full px-3 py-1 transition-colors ${
                lang === "bn" ? "bg-primary-500 text-white" : "text-navy-400 dark:text-white/60"
              }`}
            >
              {content.en.langToggle.bn}
            </button>
          </div>
        </Container>
      </div>

      {/* ============ 1. HERO ============
          Calm, no countdowns/urgency. Headline + sub explain what/who/how,
          and the "what happens next" list removes ambiguity about what
          submitting an enquiry actually means (reduces anxiety per brief). */}
      <section className="relative overflow-hidden bg-hero-gradient py-16 dark:bg-hero-gradient-dark sm:py-20">
        <HeroGlow />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-balance font-display text-4xl font-bold text-navy-500 dark:text-white sm:text-5xl">
              {t.hero.headline}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-navy-300 dark:text-white/60">
              {t.hero.sub}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="#enquiry" variant="accent" size="lg">
                {t.hero.ctaPrimary}
              </Button>
              <Button
                href={whatsappHref(t.whatsappMessage)}
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle size={18} />}
                target="_blank"
                onClick={() => fireConversion("whatsappClick")}
              >
                {t.hero.ctaSecondary}
              </Button>
            </div>
          </div>

          {/* What happens next — sets expectations up front, per brief
              section 2: "explain what happens next near the CTA". */}
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-navy-100/70 bg-white/70 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-8">
            <p className="mb-4 text-center text-sm font-semibold text-navy-500 dark:text-white">
              {t.hero.nextStepsLabel}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              {t.hero.nextSteps.map((step, i) => (
                <div key={step} className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm text-navy-300 dark:text-white/60">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ============ 2. TRUST STRIP ============
          Only claims already verifiable elsewhere in this codebase — no
          invented stats, awards, or patient counts (brief section 4). */}
      <section className="border-y border-navy-100/60 bg-white py-6 dark:border-white/10 dark:bg-white/5">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {t.trustStrip.items.map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm font-medium text-navy-400 dark:text-white/70">
                <ShieldCheck size={16} className="flex-none text-primary-500" />
                {item}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ 3. LEAD FORM ============
          Short, few fields, no passport/financial/extensive medical
          history requested (brief section 3). Every field has a visible
          permanent label, not placeholder-only. */}
      <Section
        id="enquiry"
        eyebrow={t.leadForm.eyebrow}
        title={t.leadForm.title}
        description={t.leadForm.description}
      >
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-xl rounded-3xl border border-navy-100 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5 sm:p-8"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
              {t.leadForm.nameLabel}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder={t.leadForm.namePlaceholder}
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
              {t.leadForm.phoneLabel}
            </label>
            <div className="flex overflow-hidden rounded-xl border border-navy-100 focus-within:border-primary-500 dark:border-white/10">
              <span className="flex items-center bg-navy-50 px-3 text-sm font-semibold text-navy-400 dark:bg-white/10 dark:text-white/60">
                +880
              </span>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border-0 bg-white px-4 py-3 text-navy-500 outline-none dark:bg-white/5 dark:text-white"
                placeholder={t.leadForm.phonePlaceholder}
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
              {t.leadForm.concernLabel}
            </label>
            <textarea
              required
              rows={4}
              value={formData.concern}
              onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
              className="w-full resize-none rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder={t.leadForm.concernPlaceholder}
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
              {t.leadForm.cityLabel}
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder={t.leadForm.cityPlaceholder}
            />
          </div>

          {formStatus === "success" && (
            <p className="mt-5 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
              {t.leadForm.successMsg}
            </p>
          )}
          {formStatus === "error" && (
            <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
              {t.leadForm.errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-xl bg-primary-600 px-6 py-4 font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? t.leadForm.submitting : t.leadForm.submit}
          </button>

          {/* Commitment + privacy notes sit directly below the CTA, per
              brief — reduces anxiety about "what am I agreeing to". */}
          <p className="mt-4 text-center text-xs font-medium text-navy-400 dark:text-white/60">
            {t.leadForm.commitmentNote}
          </p>
          <p className="mt-2 text-center text-xs text-navy-300 dark:text-white/50">
            {t.leadForm.privacyNote}{" "}
            <a href="/privacy-policy" className="underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </Section>

      {/* ============ 4. HOW IT WORKS ============ */}
      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow={t.howItWorks.eyebrow}
        title={t.howItWorks.title}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {t.howItWorks.steps.map((step) => (
            <div key={step.title} className="rounded-2xl border border-navy-100/70 bg-white p-6 dark:border-white/10 dark:bg-white/5">
              <span className="font-display text-2xl font-bold text-primary-200 dark:text-white/20">{step.n}</span>
              <h3 className="mt-3 font-display text-base font-semibold text-navy-500 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-navy-300 dark:text-white/60">{step.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ 6b. ALL TREATMENTS — pick one, see doctors & hospitals ============
          Every treatment links to the existing /bd/[treatment] page, which
          already shows the real doctors and hospitals for that specific
          treatment (reused as-is, not duplicated here). */}
      <Section
        eyebrow="All Treatments"
        title="See doctors and hospitals for your specific treatment"
        description="Pick a treatment below to see the real doctors and hospital partners available for that case."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((tr) => {
            const doctorCount = doctors.filter((d) => d.treatmentSlug === tr.slug).length;
            return (
              <CountryTreatmentCard
                key={tr.slug}
                treatment={tr}
                countrySlug="bd"
                doctorCount={doctorCount}
              />
            );
          })}
        </div>
      </Section>

      {/* ============ 7. COST TRANSPARENCY ============
          Ranges labeled explicitly as estimates, with what's included/
          excluded stated plainly — no bargain-shopping framing. */}
      <Section eyebrow={t.cost.eyebrow} title={t.cost.title} description={t.cost.description}>
        <div className="mx-auto grid max-w-3xl gap-5">
          {t.cost.items.map((item) => (
            <div key={item.treatment} className="rounded-2xl border border-navy-100/70 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5">
              <h3 className="font-display text-base font-semibold text-navy-500 dark:text-white">{item.treatment}</h3>
              <p className="mt-2 font-display text-2xl font-bold text-primary-600 dark:text-primary-300">{item.range}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-navy-300 dark:text-white/40">Estimate only</p>
              <div className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <p className="text-navy-400 dark:text-white/70">
                  <span className="font-semibold">Includes: </span>
                  {item.includes}
                </p>
                <p className="text-navy-300 dark:text-white/50">
                  <span className="font-semibold">Excludes: </span>
                  {item.excludes}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="#enquiry" variant="accent" size="lg">
            {t.cost.cta}
          </Button>
        </div>
      </Section>

      {/* ============ 8. WHY PATIENTS CHOOSE US ============ */}
      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow={t.whyChooseUs.eyebrow}
        title={t.whyChooseUs.title}
      >
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
          {t.whyChooseUs.items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-navy-100/70 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5"
            >
              <ShieldCheck size={16} className="flex-none text-primary-500" />
              <span className="text-sm text-navy-400 dark:text-white/70">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ 9. FAQ ============ */}
      <Section eyebrow={t.faq.eyebrow} title={t.faq.title}>
        <FAQAccordion faqs={t.faq.items} />
      </Section>

      {/* ============ 10. FINAL CTA ============ */}
      <section className="bg-hero-gradient py-16 dark:bg-hero-gradient-dark sm:py-20">
        <Container className="text-center">
          <h2 className="mx-auto max-w-lg text-balance text-3xl font-bold text-navy-500 dark:text-white sm:text-4xl">
            {t.finalCta.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-300 dark:text-white/60">{t.finalCta.sub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              href={whatsappHref(t.whatsappMessage)}
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle size={18} />}
              target="_blank"
              onClick={() => fireConversion("whatsappClick")}
            >
              {t.finalCta.primary}
            </Button>
            <Button href="#enquiry" variant="secondary" size="lg">
              {t.finalCta.secondary}
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
