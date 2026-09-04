import { MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import HeroGlow from "@/components/HeroGlow";
import CountryTreatmentCard from "@/components/CountryTreatmentCard";
import { treatments, doctors } from "@/lib/data";
import { fireConversion } from "@/lib/analytics";
import type { FeaturedTreatmentImage } from "@/lib/featuredTreatmentImages";

const WHATSAPP_NUMBER = "919720574548";

export type CountryHubContent = {
  flag: string;
  countryName: string;
  countrySlug: string;
  heroHeadline: string;
  heroSub: string;
  whatsappMessage: string;
  // Optional: if this country already has a dedicated, richer landing page
  // for a specific treatment (e.g. the Oman/Kuwait/UAE cardiac ad-campaign
  // pages), link that treatment's card straight there instead of the
  // generic /[country]/[treatment] listing.
  dedicatedPages?: Record<string, string>;
  // Optional: image-led featured treatment cards for regions that have
  // real supplied visuals (see lib/featuredTreatmentImages.ts). Omitted
  // entirely for countries without one — no generic stock imagery filler.
  featuredTreatments?: FeaturedTreatmentImage[];
};

export default function CountryHub({ content }: { content: CountryHubContent }) {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(content.whatsappMessage)}`;

  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient py-16 dark:bg-hero-gradient-dark sm:py-24">
        <HeroGlow />
        <Container className="relative text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
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
              href={whatsappHref}
              variant="accent"
              size="lg"
              icon={<MessageCircle size={18} />}
              target="_blank"
              // Scoped to Bangladesh only, per request — other countries
              // sharing this component are untouched.
              onClick={
                content.countrySlug === "bd"
                  ? () => fireConversion("whatsappClick")
                  : undefined
              }
            >
              Talk to Us on WhatsApp
            </Button>
          </div>
        </Container>
      </section>

      {content.featuredTreatments && content.featuredTreatments.length > 0 && (
        <Section eyebrow="Popular in Your Region" title="Care our patients ask about most">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-3">
            {content.featuredTreatments.map((ft) => (
              <Link
                key={ft.treatmentSlug}
                href={content.dedicatedPages?.[ft.treatmentSlug] ?? `/${content.countrySlug}/${ft.treatmentSlug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl shadow-glow transition-transform duration-500 hover:-translate-y-1.5"
              >
                <span className="absolute right-4 top-4 z-10 rounded-full bg-accent-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
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

      <Section
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
    </>
  );
}
