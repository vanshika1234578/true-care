"use client";

import { useState } from "react";
import {
  MessageCircle,
  ShieldCheck,
  Plane,
  Users,
  PhoneCall,
} from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import HeroGlow from "@/components/HeroGlow";
import FAQAccordion from "@/components/FAQAccordion";
import DoctorCard from "@/components/DoctorCard";
import HospitalCard from "@/components/HospitalCard";
import PriceComparisonTable from "@/components/PriceComparisonTable";
import {
  AnimatedStagger,
  AnimatedStaggerItem,
} from "@/components/AnimatedStagger";
import { doctors, hospitals } from "@/lib/data";
import { maxSavingsPercent } from "@/lib/priceComparison";
import { fireConversion } from "@/lib/analytics";
import { content, type Lang } from "./content";

const WHATSAPP_NUMBER = "919720574548";

// One icon per support item, in the same order as content.ts's support.items array.
const supportIcons = [ShieldCheck, Plane, Users, PhoneCall];

function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function track(event: string, extra?: Record<string, unknown>) {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event, ...extra });
  }
}

export default function OncologyCountryLanding({
  initialLang = "en",
}: {
  initialLang?: Lang;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const t = content[lang];
  const isRtl = lang === "ar";

  const chooseLang = (next: Lang) => {
    setLang(next);
    track("language_switch", { lang: next });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
          ...formData,
          country: content.en.countryName,
          treatment: "Oncology Treatment",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      // Primary conversion: lead form submitted successfully.
      fireConversion("leadFormSubmit");

      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Lead form submission failed:", error);
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  // NOTE: this assumes doctors/hospitals in lib/data.ts are tagged with a
  // treatmentSlug of "oncology". If no oncology doctors are tagged yet, the
  // Network section will show zero doctor cards and every partner hospital
  // will fall into the "pendingHospitals" onboarding message below — the
  // page still renders correctly, but you'll want to confirm this slug
  // (and add oncology doctor records) before sending traffic to it.
  const oncologyDoctors = doctors.filter((d) => d.treatmentSlug === "oncology");
  const oncologyHospitalSlugs = new Set(oncologyDoctors.map((d) => d.hospitalSlug));
  const oncologyHospitals = hospitals.filter((h) => oncologyHospitalSlugs.has(h.slug));
  const pendingHospitals = hospitals.filter((h) => !oncologyHospitalSlugs.has(h.slug));

  return (
    <div>
      {/* Language toggle bar — deliberately kept LTR and outside the dir-flip
          wrapper below, matching the fix applied on the orthopedics page. A
          language switcher should stay in a fixed position no matter which
          language is currently active. */}
      <div dir="ltr" className="border-b border-navy-100/60 bg-navy-50/60 py-2.5 dark:border-white/10 dark:bg-white/5">
        <Container className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="flex items-center gap-2 font-medium text-navy-500 dark:text-white/80">
            {t.flag} {t.badge}
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
              onClick={() => chooseLang("ar")}
              className={`rounded-full px-3 py-1 transition-colors ${
                lang === "ar" ? "bg-primary-500 text-white" : "text-navy-400 dark:text-white/60"
              }`}
            >
              {content.en.langToggle.ar}
            </button>
          </div>
        </Container>
      </div>

      {/* Everything below this point is the actual page content, and is the
          only part that should flip direction for Arabic. */}
      <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-arabic" : ""}>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-gradient py-16 dark:bg-hero-gradient-dark sm:py-24">
        <HeroGlow />
        <Container className="relative text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
            {t.flag} {t.hero.eyebrow}
          </p>
          <h1 className="mx-auto max-w-3xl text-balance font-display text-4xl font-bold text-navy-500 dark:text-white sm:text-5xl">
            {t.hero.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-navy-300 dark:text-white/60">
            {t.hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="#medical-review" variant="accent" size="lg">
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
        </Container>
      </section>

      {/* LEAD FORM */}
      <Section
        id="medical-review"
        eyebrow={t.leadForm.eyebrow}
        title={t.leadForm.title}
        description={t.leadForm.description}
      >
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl rounded-3xl border border-navy-100 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
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
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
                {t.leadForm.emailLabel}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder={t.leadForm.emailPlaceholder}
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
              {t.leadForm.phoneLabel}
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder={t.leadForm.phonePlaceholder}
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
              {t.leadForm.messageLabel}
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full resize-none rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder={t.leadForm.messagePlaceholder}
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

          <p className="mt-4 text-center text-xs text-navy-300 dark:text-white/50">
            {t.leadForm.privacyNote}
          </p>
        </form>
      </Section>

      {/* WHY PATIENTS REACH OUT */}
      <Section
        eyebrow={`${t.whyReachOut.eyebrowPrefix} ${t.countryName}`}
        title={t.whyReachOut.title}
        description={t.whyReachOut.description}
      >
        <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
          {t.symptoms.map((s) => (
            <div
              key={s}
              className="rounded-xl border border-navy-100/70 bg-white px-4 py-3 text-sm text-navy-400 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
            >
              {s}
            </div>
          ))}
        </div>
      </Section>

      {/* NETWORK */}
      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow={t.network.eyebrow}
        title={t.network.title}
        description={t.network.description}
      >
        <AnimatedStagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {oncologyDoctors.map((doc) => (
            <AnimatedStaggerItem key={doc.slug}>
              <DoctorCard doctor={doc} />
            </AnimatedStaggerItem>
          ))}
        </AnimatedStagger>

        {pendingHospitals.length > 0 && (
          <p className="mt-8 text-center text-sm text-navy-300 dark:text-white/50">
            {t.network.pendingPrefix}{" "}
            {pendingHospitals.map((h) => h.name).join(isRtl ? "، " : " and ")}{" "}
            {t.network.pendingSuffix}
          </p>
        )}
      </Section>

      {/* HOSPITALS */}
      <Section eyebrow={t.hospitals.eyebrow} title={t.hospitals.title}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {oncologyHospitals.map((h) => (
            <HospitalCard key={h.slug} hospital={h} />
          ))}
        </div>
      </Section>

      {/* SUPPORT */}
      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow={t.support.eyebrow}
        title={t.support.title}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.support.items.map(({ title, description }, i) => {
            const Icon = supportIcons[i];
            return (
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
            );
          })}
        </div>
      </Section>

      {/* SAVINGS */}
      <section className="bg-navy-500 py-14 dark:bg-surface-dark">
        <Container className="text-center">
          <p className="font-display text-5xl font-bold text-accent-500 sm:text-6xl">
            {t.savings.prefix} {maxSavingsPercent}%
          </p>
          <p className="mx-auto mt-3 max-w-md text-balance text-white/70">{t.savings.suffix}</p>
        </Container>
      </section>

      {/* COST */}
      <Section id="cost" eyebrow={t.cost.eyebrow} title={t.cost.title}>
        {/* Note: this shared table renders its headers in English regardless of
            the page language — translating it is a separate, cross-page change
            since it's reused by every country/treatment landing page. */}
        <PriceComparisonTable />

        <div className="mx-auto mt-8 max-w-2xl rounded-3xl bg-navy-500 p-8 text-center text-white sm:p-10">
          <p className="font-display text-4xl font-bold">{t.cost.priceRange}</p>
          <p className="mt-3 text-white/70">{t.cost.priceDescription}</p>
          <Button href="#medical-review" variant="accent" size="lg" className="mt-6">
            {t.cost.cta}
          </Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow={t.faq.eyebrow} title={t.faq.title}>
        <FAQAccordion faqs={t.faq.items} />
      </Section>

      {/* FINAL CTA */}
      <section className="bg-hero-gradient py-16 dark:bg-hero-gradient-dark sm:py-20">
        <Container className="text-center">
          <h2 className="mx-auto max-w-lg text-balance text-3xl font-bold text-navy-500 dark:text-white sm:text-4xl">
            {t.finalCta.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-300 dark:text-white/60">{t.finalCta.sub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="#medical-review" variant="accent" size="lg">
              {t.finalCta.primary}
            </Button>
            <Button
              href={whatsappHref(t.whatsappMessage)}
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle size={18} />}
              target="_blank"
              onClick={() => fireConversion("whatsappClick")}
            >
              {t.finalCta.secondary}
            </Button>
          </div>
        </Container>
      </section>
      </div>
    </div>
  );
}
