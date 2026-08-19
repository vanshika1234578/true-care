import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, MapPin, MessageCircle } from "lucide-react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import FAQAccordion from "@/components/FAQAccordion";
import { TreatmentIcon } from "@/components/IconMap";
import { treatments } from "@/lib/data";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const treatment = treatments.find((t) => t.slug === params.slug);
  if (!treatment) return {};
  return {
    title: treatment.name,
    description: treatment.summary,
  };
}

export default function TreatmentDetailPage({ params }: { params: { slug: string } }) {
  const treatment = treatments.find((t) => t.slug === params.slug);
  if (!treatment) notFound();

  return (
    <>
      <section className="bg-hero-gradient pb-6 pt-16 dark:bg-hero-gradient-dark">
        <Container>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-300">
            <TreatmentIcon name={treatment.icon} size={28} />
          </div>
          <h1 className="mt-6 text-balance text-3xl font-bold text-navy-500 sm:text-4xl dark:text-white">
            {treatment.name}
          </h1>
          <p className="mt-3 max-w-2xl text-balance text-navy-300 dark:text-white/60">
            {treatment.summary}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-navy-400 dark:text-white/50">
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-primary-500" /> Estimated stay: {treatment.estimatedStay}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-primary-500" /> Available at partner hospitals across India
            </span>
          </div>
        </Container>
      </section>

      <Section align="left" className="pt-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-display text-xl font-semibold text-navy-500 dark:text-white">
                Overview
              </h2>
              <p className="mt-3 text-navy-300 dark:text-white/60">{treatment.overview}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-navy-500 dark:text-white">
                Symptoms that may indicate this is relevant to you
              </h2>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {treatment.symptoms.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-navy-300 dark:text-white/60">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-teal-500" /> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-navy-500 dark:text-white">
                Treatment options
              </h2>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {treatment.options.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-navy-300 dark:text-white/60">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-primary-500" /> {o}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-navy-500 dark:text-white">
                Recovery
              </h2>
              <p className="mt-3 text-navy-300 dark:text-white/60">{treatment.recovery}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-navy-500 dark:text-white">
                Why India
              </h2>
              <p className="mt-3 text-navy-300 dark:text-white/60">{treatment.whyIndia}</p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-navy-500 dark:text-white">
                Frequently asked questions
              </h2>
              <div className="mt-3">
                <FAQAccordion faqs={treatment.faqs} />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-navy-100/70 bg-white p-7 shadow-card dark:border-white/10 dark:bg-white/5">
              <h3 className="font-display text-lg font-semibold text-navy-500 dark:text-white">
                Not sure where to start?
              </h3>
              <p className="mt-2 text-sm text-navy-300 dark:text-white/60">
                Share your reports for a free medical review — no obligation.
              </p>
              <Button href="/contact" className="mt-5 w-full" icon={<MessageCircle size={16} />}>
                Book Free Consultation
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
