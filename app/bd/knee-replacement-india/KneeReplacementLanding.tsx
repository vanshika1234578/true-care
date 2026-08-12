"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  CheckCircle2,
  FileUp,
  Search,
  ClipboardCheck,
  Stethoscope,
  Building2,
  ShieldCheck,
  GraduationCap,
  Plane,
  HeartHandshake,
  Globe2,
} from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import FAQAccordion from "@/components/FAQAccordion";
import { doctors, hospitals, testimonials } from "@/lib/data";
import { content, type Lang } from "./content";
import ReportForm from "./ReportForm";
import LeadModal from "./LeadModal";
import TestimonialCard from "@/components/TestimonialCard";

const WHATSAPP_NUMBER = "919720574548";
const LEAD_MODAL_SESSION_KEY = "truecare_bd_knee_lead_modal_dismissed";
const doctor = doctors.find((d) => d.slug === "dr-atul-mishra");
const hospital = hospitals.find((h) => h.slug === "fortis-hospital-noida");
const relevantTestimonial = testimonials.find((t) => t.treatment === "Orthopedics");

function track(event: string, extra?: Record<string, unknown>) {
  if (typeof window !== "undefined" && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event, ...extra });
  }
}

function whatsappHref(prefill: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefill)}`;
}

export default function KneeReplacementLanding({ initialLang = "en" }: { initialLang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [langManuallySet, setLangManuallySet] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const t = content[lang];

  useEffect(() => {
    let alreadyDismissed = false;
    try {
      alreadyDismissed = sessionStorage.getItem(LEAD_MODAL_SESSION_KEY) === "1";
    } catch {
      // sessionStorage can throw in some privacy modes — fail safe by showing the modal.
    }
    if (alreadyDismissed) return;

    const timer = setTimeout(() => {
      setShowLeadModal(true);
      track("lead_modal_shown");
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const closeLeadModal = () => {
    setShowLeadModal(false);
    track("lead_modal_closed");
    markModalDismissedThisSession();
  };

  const markModalDismissedThisSession = () => {
    try {
      sessionStorage.setItem(LEAD_MODAL_SESSION_KEY, "1");
    } catch {
      // Ignore — worst case the modal may reappear on a later page load this session.
    }
  };

  const chooseLang = (next: Lang) => {
    setLang(next);
    setLangManuallySet(true);
    track("language_switch", { lang: next });
  };

  const autoDetectBangladesh = () => {
    if (!langManuallySet && lang !== "bn") {
      setLang("bn");
      track("language_switch", { lang: "bn", trigger: "auto_detect_phone" });
    }
  };

  const heroWhatsapp = whatsappHref(
    lang === "en"
      ? "Hello TrueCare, I'm interested in knee replacement treatment in India."
      : "Hello TrueCare, আমি ভারতে নী রিপ্লেসমেন্ট চিকিৎসা সম্পর্কে জানতে চাই।"
  );

  return (
    <div className={lang === "bn" ? "font-bengali" : ""}>
      {/* Context bar */}
      <div className="border-b border-navy-100/60 bg-navy-50/60 py-2.5 dark:border-white/10 dark:bg-white/5">
        <Container className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="flex items-center gap-2 font-medium text-navy-500 dark:text-white/80">
            🇧🇩 {t.bdBadge}
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient py-16 dark:bg-hero-gradient-dark sm:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance font-display text-3xl font-bold text-navy-500 dark:text-white sm:text-5xl">
              {t.hero.headline}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-balance text-navy-300 dark:text-white/60">
              {t.hero.subheadline}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href="#report-form"
                size="lg"
                onClick={() => track("CTA_click", { cta: "hero_primary" })}
              >
                {t.hero.ctaPrimary}
              </Button>
              <a
                href={heroWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "hero" })}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-100 bg-white px-7 py-3.5 text-base font-semibold text-navy-500 transition-all hover:-translate-y-0.5 hover:border-teal-300 dark:border-white/10 dark:bg-surface-darkSoft dark:text-white"
              >
                <MessageCircle size={18} className="text-teal-500" />
                {t.hero.ctaSecondary}
              </a>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {t.hero.trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center justify-center gap-1.5 rounded-full bg-white/70 px-3 py-2 text-xs font-medium text-navy-400 shadow-card dark:bg-white/5 dark:text-white/60"
                >
                  <CheckCircle2 size={13} className="flex-shrink-0 text-teal-500" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Trust strip */}
      <section className="py-14">
        <Container>
          <h2 className="mb-8 text-center font-display text-xl font-bold text-navy-500 dark:text-white sm:text-2xl">
            {t.trustStrip.title}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.trustStrip.items.map((item, i) => {
              const icons = [Building2, Stethoscope, Globe2, ClipboardCheck];
              const Icon = icons[i] ?? CheckCircle2;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-navy-100/70 bg-white p-5 shadow-card dark:border-white/10 dark:bg-white/5"
                >
                  <Icon size={22} className="text-primary-500" />
                  <h3 className="mt-3 font-display text-sm font-semibold text-navy-500 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-navy-300 dark:text-white/60">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-surface-soft py-16 dark:bg-surface-darkSoft sm:py-20">
        <Container>
          <h2 className="mb-10 text-center font-display text-2xl font-bold text-navy-500 dark:text-white sm:text-3xl">
            {t.howItWorks.title}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {t.howItWorks.steps.map((step, i) => {
              const icons = [FileUp, Search, ClipboardCheck];
              const Icon = icons[i];
              return (
                <div
                  key={step.title}
                  className="rounded-2xl border border-navy-100/70 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                    <Icon size={20} />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary-500">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold text-navy-500 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy-300 dark:text-white/60">{step.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-xs text-navy-300 dark:text-white/50">
            {t.howItWorks.note}
          </p>
        </Container>
      </section>

      {/* Doctor section */}
      {doctor && (
        <section className="py-16 sm:py-20">
          <Container>
            <h2 className="mb-8 text-center font-display text-2xl font-bold text-navy-500 dark:text-white sm:text-3xl">
              {t.doctor.title}
            </h2>
            <div className="mx-auto max-w-2xl rounded-2xl border border-navy-100/70 bg-white p-8 text-center shadow-card dark:border-white/10 dark:bg-white/5">
              {doctor.photo ? (
                <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
                  <Image src={doctor.photo} alt={doctor.name} fill className="object-cover" sizes="80px" />
                </div>
              ) : (
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-teal-400 font-display text-lg font-bold text-white">
                  {doctor.name.replace("Dr. ", "").split(" ").map((n) => n.charAt(0)).join("")}
                </div>
              )}
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-500 dark:text-white">
                {doctor.name}
              </h3>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-primary-600 dark:text-primary-300">
                <Stethoscope size={14} /> {doctor.specialty}
              </p>
              <p className="mt-1 text-sm text-navy-300 dark:text-white/60">{doctor.hospital}</p>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-navy-300 dark:text-white/50">
                <GraduationCap size={13} /> {doctor.qualifications}
              </p>
              <p className="mt-1 text-xs text-navy-300 dark:text-white/50">
                {doctor.experience !== "Confirm with hospital" ? doctor.experience : ""}
              </p>

              <div className="mt-5 border-t border-navy-100/60 pt-5 dark:border-white/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-navy-300 dark:text-white/40">
                  {t.doctor.expertiseLabel}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
                  {t.doctor.expertise.map((e) => (
                    <span
                      key={e}
                      className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600 dark:bg-primary-500/10 dark:text-primary-300"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                href="#report-form"
                className="mt-6"
                onClick={() => track("doctor_profile_view")}
              >
                {t.doctor.cta}
              </Button>
            </div>
          </Container>
        </section>
      )}

      {/* Hospital section */}
      {hospital && (
        <section className="bg-surface-soft py-16 dark:bg-surface-darkSoft sm:py-20">
          <Container>
            <h2 className="mb-8 text-center font-display text-2xl font-bold text-navy-500 dark:text-white sm:text-3xl">
              {t.hospital.title}
            </h2>
            <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-navy-100/70 bg-white shadow-card dark:border-white/10 dark:bg-white/5">
              {hospital.image && (
                <div className="relative h-44 w-full">
                  <Image src={hospital.image} alt={hospital.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 700px" />
                </div>
              )}
              <div className="p-8">
              <div className="flex items-start gap-3">
                <Building2 size={22} className="mt-0.5 flex-shrink-0 text-primary-500" />
                <div>
                  <h3 className="font-display text-base font-semibold text-navy-500 dark:text-white">
                    {hospital.name}
                  </h3>
                  <p className="mt-1 text-sm text-navy-300 dark:text-white/60">{hospital.city}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-navy-300 dark:text-white/60">
                {hospital.overview}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {hospital.accreditations.map((a) => (
                  <span
                    key={a}
                    className="flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-600 dark:bg-teal-500/10 dark:text-teal-300"
                  >
                    <ShieldCheck size={12} /> {a}
                  </span>
                ))}
              </div>
              <p className="mt-5 border-t border-navy-100/60 pt-4 text-xs text-navy-300 dark:border-white/10 dark:text-white/50">
                {t.hospital.note}
              </p>
              <Link
                href={`/hospitals/${hospital.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-300"
                onClick={() => track("hospital_section_view")}
              >
                {t.hospital.infoLabel} →
              </Link>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Testimonial */}
      {relevantTestimonial && (
        <section className="py-12">
          <Container>
            <div className="mx-auto max-w-xl">
              <TestimonialCard {...relevantTestimonial} />
            </div>
          </Container>
        </section>
      )}

      {/* Patient education */}
      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-navy-500 dark:text-white sm:text-3xl">
            {t.education.title}
          </h2>
          <div className="mx-auto max-w-2xl space-y-6">
            {t.education.blocks.map((block) => (
              <div key={block.h}>
                <h3 className="font-display text-base font-semibold text-navy-500 dark:text-white">
                  {block.h}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-300 dark:text-white/60">
                  {block.p}
                </p>
              </div>
            ))}
            <p className="rounded-xl bg-navy-50/60 p-4 text-xs text-navy-400 dark:bg-white/5 dark:text-white/50">
              {t.education.disclaimer}
            </p>
          </div>
        </Container>
      </section>

      {/* Cost */}
      <section className="bg-surface-soft py-16 dark:bg-surface-darkSoft sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold text-navy-500 dark:text-white sm:text-3xl">
              {t.cost.title}
            </h2>
            <p className="mt-4 text-sm text-navy-300 dark:text-white/60">{t.cost.body}</p>
            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2 text-left sm:grid-cols-2">
              {t.cost.factors.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-navy-400 shadow-card dark:bg-white/5 dark:text-white/60"
                >
                  <CheckCircle2 size={13} className="flex-shrink-0 text-primary-500" /> {f}
                </span>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-md text-sm font-medium text-navy-500 dark:text-white/80">
              {t.cost.fallback}
            </p>
            <Button href="#report-form" className="mt-5" onClick={() => track("CTA_click", { cta: "cost_estimate" })}>
              {t.cost.cta}
            </Button>
          </div>
        </Container>
      </section>

      {/* Reports / Report submission form */}
      <section id="report-form" className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold text-navy-500 dark:text-white sm:text-3xl">
                {t.reports.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-navy-300 dark:text-white/60">
                {t.reports.body}
              </p>
            </div>
            <div className="mt-8 rounded-2xl border border-navy-100/70 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5 sm:p-8">
              <ReportForm lang={lang} whatsappNumber={WHATSAPP_NUMBER} onDetectBangladeshNumber={autoDetectBangladesh} />
            </div>
          </div>
        </Container>
      </section>

      {/* International patient support */}
      <section className="bg-surface-soft py-16 dark:bg-surface-darkSoft sm:py-20">
        <Container>
          <h2 className="mb-10 text-center font-display text-2xl font-bold text-navy-500 dark:text-white sm:text-3xl">
            {t.support.title}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[t.support.before, t.support.during, t.support.after].map((phase, i) => {
              const icons = [Plane, HeartHandshake, ClipboardCheck];
              const Icon = icons[i];
              return (
                <div
                  key={phase.title}
                  className="rounded-2xl border border-navy-100/70 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5"
                >
                  <Icon size={20} className="text-primary-500" />
                  <h3 className="mt-3 font-display text-base font-semibold text-navy-500 dark:text-white">
                    {phase.title}
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-1.5 text-xs text-navy-300 dark:text-white/60"
                      >
                        <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0 text-teal-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-xs text-navy-300 dark:text-white/50">
            {t.support.note}
          </p>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-navy-500 dark:text-white sm:text-3xl">
            {t.faqTitle}
          </h2>
          <FAQAccordion faqs={t.faqs} />
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-hero-gradient py-16 dark:bg-hero-gradient-dark sm:py-20">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-balance font-display text-2xl font-bold text-navy-500 dark:text-white sm:text-3xl">
              {t.finalCta.headline}
            </h2>
            <p className="mt-3 text-navy-300 dark:text-white/60">{t.finalCta.sub}</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="#report-form" size="lg" onClick={() => track("CTA_click", { cta: "final_primary" })}>
                {t.finalCta.primary}
              </Button>
              <a
                href={heroWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "final_cta" })}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-100 bg-white px-7 py-3.5 text-base font-semibold text-navy-500 transition-all hover:-translate-y-0.5 hover:border-teal-300 dark:border-white/10 dark:bg-surface-darkSoft dark:text-white"
              >
                <MessageCircle size={18} className="text-teal-500" />
                {t.finalCta.secondary}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Floating WhatsApp button (page-scoped) */}
      <a
        href={heroWhatsapp}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { location: "floating_button" })}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-teal-500 px-4 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-teal-600 sm:bottom-6 sm:right-6"
        aria-label={t.whatsappFloat}
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">{t.whatsappFloat}</span>
      </a>

      <LeadModal
        open={showLeadModal}
        onClose={closeLeadModal}
        onSubmitSuccess={markModalDismissedThisSession}
        lang={lang}
        whatsappNumber={WHATSAPP_NUMBER}
        onDetectBangladeshNumber={autoDetectBangladesh}
      />
    </div>
  );
}
