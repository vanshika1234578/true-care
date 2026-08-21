import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, MessageCircle, Briefcase, Languages, GraduationCap, Stethoscope } from "lucide-react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import FadeInImage from "@/components/FadeInImage";
import DoctorCard from "@/components/DoctorCard";
import { doctors, hospitals } from "@/lib/data";

const WHATSAPP_NUMBER = "919720574548";

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const doctor = doctors.find((d) => d.slug === params.slug);
  if (!doctor) return {};
  return {
    title: `${doctor.name} — ${doctor.specialty}`,
    description: `${doctor.name}, ${doctor.specialty} at ${doctor.hospital}. Request a consultation through TrueCare.`,
  };
}

export default function DoctorDetailPage({ params }: { params: { slug: string } }) {
  const doctor = doctors.find((d) => d.slug === params.slug);
  if (!doctor) notFound();

  const hospital = hospitals.find((h) => h.slug === doctor.hospitalSlug);
  const hasRealExperience = doctor.experience && doctor.experience !== "Confirm with hospital";

  const whatsappMessage = `Hello, I'd like to request a consultation with ${doctor.name} (${doctor.specialty}) at ${doctor.hospital}.`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  // Other doctors in the same specialty, for a "see other specialists" strip.
  const relatedDoctors = doctors
    .filter((d) => d.treatmentSlug === doctor.treatmentSlug && d.slug !== doctor.slug)
    .slice(0, 3);

  const initials = doctor.name
    .replace("Dr. ", "")
    .replace("Dr ", "")
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .slice(0, 2);

  return (
    <>
      <section className="bg-hero-gradient pb-10 pt-16 dark:bg-hero-gradient-dark sm:pt-24">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
            {doctor.photo ? (
              <div className="relative h-28 w-28 flex-none overflow-hidden rounded-full border-4 border-white shadow-glow dark:border-surface-dark sm:h-32 sm:w-32">
                <FadeInImage src={doctor.photo} alt={doctor.name} fill className="object-cover" sizes="128px" />
              </div>
            ) : (
              <div className="flex h-28 w-28 flex-none items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-primary-500 to-teal-400 font-display text-3xl font-bold text-white shadow-glow dark:border-surface-dark sm:h-32 sm:w-32">
                {initials}
              </div>
            )}
            <div>
              <h1 className="font-display text-3xl font-bold text-navy-500 dark:text-white sm:text-4xl">
                {doctor.name}
              </h1>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-base font-medium text-primary-600 dark:text-primary-300 sm:justify-start">
                <Stethoscope size={16} /> {doctor.specialty}
              </p>
              {hospital && (
                <Link
                  href={`/hospitals/${hospital.slug}`}
                  className="mt-2 flex items-center justify-center gap-1.5 text-sm text-navy-300 hover:text-primary-600 dark:text-white/60 sm:justify-start"
                >
                  <MapPin size={14} /> {doctor.hospital}, {hospital.city}
                </Link>
              )}

              <div className="mt-5 flex flex-wrap justify-center gap-3 sm:justify-start">
                {hasRealExperience && (
                  <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-navy-400 shadow-sm dark:bg-white/5 dark:text-white/70">
                    <Briefcase size={13} /> {doctor.experience}
                  </span>
                )}
                <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-navy-400 shadow-sm dark:bg-white/5 dark:text-white/70">
                  <Languages size={13} /> {doctor.languages.join(", ")}
                </span>
              </div>

              <div className="mt-6">
                <Button href={whatsappHref} variant="accent" size="lg" icon={<MessageCircle size={18} />}>
                  Request Consultation on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {doctor.qualifications && (
        <Section eyebrow="Background" title="Qualifications & Training">
          <div className="mx-auto flex max-w-2xl items-start gap-3 rounded-2xl border border-navy-100/70 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5">
            <GraduationCap size={20} className="mt-0.5 flex-none text-primary-500" />
            <p className="text-sm leading-relaxed text-navy-400 dark:text-white/70">
              {doctor.qualifications}
            </p>
          </div>
        </Section>
      )}

      {hospital && (
        <Section className="bg-surface-soft dark:bg-surface-darkSoft" eyebrow="Hospital" title={hospital.name}>
          <div className="mx-auto max-w-2xl rounded-2xl border border-navy-100/70 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5">
            <p className="text-sm leading-relaxed text-navy-400 dark:text-white/70">
              {hospital.overview}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {hospital.accreditations.map((a) => (
                <span
                  key={a}
                  className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-500/10 dark:text-teal-300"
                >
                  {a}
                </span>
              ))}
            </div>
            <Link
              href={`/hospitals/${hospital.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-primary-600 hover:underline dark:text-primary-300"
            >
              View hospital profile →
            </Link>
          </div>
        </Section>
      )}

      {relatedDoctors.length > 0 && (
        <Section eyebrow="Also See" title="Other specialists in this field">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relatedDoctors.map((d) => (
              <DoctorCard key={d.slug} doctor={d} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
