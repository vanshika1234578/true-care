import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, BadgeCheck, MessageCircle, Stethoscope } from "lucide-react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import DoctorCard from "@/components/DoctorCard";
import { hospitals, doctors, getHospitalSpecialties } from "@/lib/data";

export function generateStaticParams() {
  return hospitals.map((h) => ({ slug: h.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const hospital = hospitals.find((h) => h.slug === params.slug);
  if (!hospital) return {};
  return {
    title: hospital.name,
    description: hospital.overview,
  };
}

export default function HospitalDetailPage({ params }: { params: { slug: string } }) {
  const hospital = hospitals.find((h) => h.slug === params.slug);
  if (!hospital) notFound();

  const hospitalDoctors = doctors.filter((d) => d.hospitalSlug === hospital.slug);

  return (
    <>
      {hospital.image && (
        <div className="relative h-56 w-full sm:h-72">
          <Image src={hospital.image} alt={hospital.name} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
        </div>
      )}
      <section className="bg-hero-gradient pb-6 pt-16 dark:bg-hero-gradient-dark">
        <Container>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 font-display text-2xl font-bold text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
            {hospital.name.charAt(0)}
          </div>
          <h1 className="mt-6 text-balance text-3xl font-bold text-navy-500 sm:text-4xl dark:text-white">
            {hospital.name}
          </h1>
          <p className="mt-3 max-w-2xl text-balance text-navy-300 dark:text-white/60">
            {hospital.overview}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-navy-400 dark:text-white/50">
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-primary-500" /> {hospital.city}
            </span>
            <span className="flex items-center gap-2">
              <Stethoscope size={16} className="text-primary-500" /> {hospital.beds}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {hospital.accreditations.map((a) => (
              <span
                key={a}
                className="flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-navy-500 dark:bg-white/10 dark:text-white/70"
              >
                <BadgeCheck size={13} className="text-primary-500" /> {a}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <Section align="left" className="pt-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold text-navy-500 dark:text-white">
              Specialties
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {getHospitalSpecialties(hospital.slug).map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-700 dark:bg-teal-500/10 dark:text-teal-300"
                >
                  {s}
                </span>
              ))}
            </div>

            <h2 className="mt-10 font-display text-xl font-semibold text-navy-500 dark:text-white">
              Doctors at {hospital.name}
            </h2>
            {hospitalDoctors.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {hospitalDoctors.map((d) => (
                  <DoctorCard key={d.slug} doctor={d} />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-navy-300 dark:text-white/60">
                We don't yet have specific doctor profiles listed for this hospital —
                reach out and we'll help connect you with the right specialist.
              </p>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-navy-100/70 bg-white p-7 shadow-card dark:border-white/10 dark:bg-white/5">
              <h3 className="font-display text-lg font-semibold text-navy-500 dark:text-white">
                Considering {hospital.name}?
              </h3>
              <p className="mt-2 text-sm text-navy-300 dark:text-white/60">
                Share your reports for a free medical review — we'll help you understand
                if this hospital is the right fit for your case.
              </p>
              <Button href="/contact" className="mt-5 w-full" icon={<MessageCircle size={16} />}>
                Book Free Consultation
              </Button>
              <Button href="/find-doctor" variant="secondary" className="mt-3 w-full">
                Try the Doctor Finder
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
