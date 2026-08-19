import { MessageCircle } from "lucide-react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";
import DoctorCard from "@/components/DoctorCard";
import { doctors, treatments, hospitals } from "@/lib/data";

const WHATSAPP_NUMBER = "919720574548";

export default function CountryTreatmentDoctorList({
  countryFlag,
  countryName,
  treatmentSlug,
  whatsappMessage,
}: {
  countryFlag: string;
  countryName: string;
  treatmentSlug: string;
  whatsappMessage: string;
}) {
  const treatment = treatments.find((t) => t.slug === treatmentSlug);
  if (!treatment) return null;

  const treatmentDoctors = doctors.filter((d) => d.treatmentSlug === treatmentSlug);
  const treatmentHospitalSlugs = new Set(treatmentDoctors.map((d) => d.hospitalSlug));
  const treatmentHospitals = hospitals.filter((h) => treatmentHospitalSlugs.has(h.slug));
  const pendingHospitals = hospitals.filter((h) => !treatmentHospitalSlugs.has(h.slug));

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <section className="bg-hero-gradient py-14 dark:bg-hero-gradient-dark sm:py-20">
        <Container className="text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-1.5 text-sm font-semibold text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
            {countryFlag} {countryName} → India
          </p>
          <h1 className="mx-auto max-w-3xl text-balance font-display text-4xl font-bold text-navy-500 dark:text-white sm:text-5xl">
            {treatment.name} in India
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-navy-300 dark:text-white/60">
            {treatment.summary}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={whatsappHref} variant="accent" size="lg" icon={<MessageCircle size={18} />}>
              Share My Reports on WhatsApp
            </Button>
          </div>
        </Container>
      </section>

      <Section eyebrow="Real Doctors" title={`${treatment.name} specialists`}>
        {treatmentDoctors.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {treatmentDoctors.map((doc) => (
              <DoctorCard key={doc.slug} doctor={doc} />
            ))}
          </div>
        ) : (
          <p className="text-center text-navy-300 dark:text-white/50">
            We're still finalizing our {treatment.name.toLowerCase()} specialist listing. Send us
            your reports on WhatsApp and we'll match you with the right doctor directly.
          </p>
        )}

        {pendingHospitals.length > 0 && treatmentDoctors.length > 0 && (
          <p className="mt-8 text-center text-sm text-navy-300 dark:text-white/50">
            We're also proud to work with {pendingHospitals.map((h) => h.name).join(" and ")} — we're
            still building out their {treatment.name.toLowerCase()} team's profiles here.
          </p>
        )}
      </Section>

      {treatmentHospitals.length > 0 && (
        <Section
          className="bg-surface-soft dark:bg-surface-darkSoft"
          eyebrow="Where You'll Be Treated"
          title="Hospitals you can trust"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {treatmentHospitals.map((h) => (
              <a
                key={h.slug}
                href={`/hospitals/${h.slug}`}
                className="rounded-2xl border border-navy-100/70 bg-white p-6 text-center shadow-card transition-shadow hover:shadow-glow dark:border-white/10 dark:bg-white/5"
              >
                <h3 className="font-display text-base font-semibold text-navy-500 dark:text-white">
                  {h.name}
                </h3>
                <p className="mt-1 text-sm text-navy-300 dark:text-white/60">{h.city}</p>
              </a>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
