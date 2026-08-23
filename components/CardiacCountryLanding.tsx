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
import { doctors, hospitals, treatments } from "@/lib/data";
import { maxSavingsPercent } from "@/lib/priceComparison";

const WHATSAPP_NUMBER = "919720574548";

export type CardiacCountryContent = {
  flag: string;
  countryName: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSub: string;
  whatsappMessage: string;
};

function whatsappHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const supportItems = [
  {
    icon: ShieldCheck,
    title: "Medical Visa Guidance",
    description:
      "We'll walk you through everything you need for your Indian medical visa.",
  },
  {
    icon: Plane,
    title: "Arrival Assistance",
    description:
      "Someone's there to meet you at the airport and help you settle in.",
  },
  {
    icon: Users,
    title: "Companion Support",
    description:
      "Bringing someone with you? We'll help sort accommodation for you both.",
  },
  {
    icon: PhoneCall,
    title: "WhatsApp Coordinator",
    description:
      "One coordinator, with you on WhatsApp in Arabic or English, from day one through follow-up.",
  },
];

export default function CardiacCountryLanding({
  content,
}: {
  content: CardiacCountryContent;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formStatus, setFormStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setIsSubmitting(true);
    setFormStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          country: content.countryName,
          treatment: "Cardiac Treatment",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Something went wrong");
      }

      setFormStatus("success");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Lead form submission failed:", error);
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const cardiology = treatments.find(
    (t) => t.slug === "cardiology"
  )!;

  const cardiacDoctors = doctors.filter(
    (d) => d.treatmentSlug === "cardiology"
  );

  const cardiacHospitalSlugs = new Set(
    cardiacDoctors.map((d) => d.hospitalSlug)
  );

  const cardiacHospitals = hospitals.filter((h) =>
    cardiacHospitalSlugs.has(h.slug)
  );

  const pendingHospitals = hospitals.filter(
    (h) => !cardiacHospitalSlugs.has(h.slug)
  );

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
            <Button
              href="#medical-review"
              variant="accent"
              size="lg"
            >
              Get a Free Medical Review
            </Button>

            <Button
              href={whatsappHref(content.whatsappMessage)}
              variant="secondary"
              size="lg"
              icon={<MessageCircle size={18} />}
            >
              WhatsApp Us
            </Button>
          </div>
        </Container>
      </section>

      {/* LEAD FORM */}
      <Section
        id="medical-review"
        eyebrow="Free Medical Review"
        title="Tell us about the patient"
        description="Share a few details and our care team will review the case and get back to you."
      >
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl rounded-3xl border border-navy-100 bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
                Full Name
              </label>

              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder="Patient or family member name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
                Email Address
              </label>

              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
              WhatsApp / Phone Number
            </label>

            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
              className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder="+968 XXXXXXXX"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-navy-500 dark:text-white">
              Tell us about the patient's condition
            </label>

            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
              className="w-full resize-none rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-500 outline-none focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder="Briefly describe the diagnosis, symptoms, or treatment required..."
            />
          </div>

          {formStatus === "success" && (
            <p className="mt-5 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
              Thank you. Your details have been submitted successfully. Our
              care team will contact you shortly.
            </p>
          )}

          {formStatus === "error" && (
            <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
              Something went wrong. Please try again or contact us on
              WhatsApp.
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-xl bg-primary-600 px-6 py-4 font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Submitting..."
              : "Get My Free Medical Review"}
          </button>

          <p className="mt-4 text-center text-xs text-navy-300 dark:text-white/50">
            Your information will only be used to help review your medical
            case.
          </p>
        </form>
      </Section>

      {/* WHY PATIENTS REACH OUT */}
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

      {/* NETWORK */}
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
            We're also proud to work with{" "}
            {pendingHospitals.map((h) => h.name).join(" and ")} — we're still
            building out their cardiac team's profiles here. Send your reports
            anyway, and we'll match you with the right specialist across our
            whole network.
          </p>
        )}
      </Section>

      {/* HOSPITALS */}
      <Section
        eyebrow="Where You'll Be Treated"
        title="Hospitals you can trust, across India"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cardiacHospitals.map((h) => (
            <HospitalCard key={h.slug} hospital={h} />
          ))}
        </div>
      </Section>

      {/* SUPPORT */}
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

              <p className="mt-2 text-sm text-navy-300 dark:text-white/60">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* SAVINGS */}
      <section className="bg-navy-500 py-14 dark:bg-surface-dark">
        <Container className="text-center">
          <p className="font-display text-5xl font-bold text-accent-500 sm:text-6xl">
            Save up to {maxSavingsPercent}%
          </p>

          <p className="mx-auto mt-3 max-w-md text-balance text-white/70">
            on your treatment, compared to typical private care in the UK or
            Dubai.
          </p>
        </Container>
      </section>

      {/* COST */}
      <Section
        id="cost"
        eyebrow="The Cost of Care"
        title="Great care shouldn't cost a fortune"
      >
        <PriceComparisonTable />

        <div className="mx-auto mt-8 max-w-2xl rounded-3xl bg-navy-500 p-8 text-center text-white sm:p-10">
          <p className="font-display text-4xl font-bold">$6,000 – $12,500</p>

          <p className="mt-3 text-white/70">
            That's the typical range for a full cardiac treatment package. Your
            actual cost depends on the procedure and complexity of the case.
          </p>

          <Button
            href="#medical-review"
            variant="accent"
            size="lg"
            className="mt-6"
          >
            Get My Personalized Estimate
          </Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Frequently Asked Questions" title="Common questions">
        <FAQAccordion
          faqs={[
            ...cardiology.faqs,
            {
              q: "How quickly can my case be reviewed?",
              a: "Usually within 2–4 hours during business hours.",
            },
            {
              q: "Can a family member travel with me?",
              a: "Yes — we'll help arrange their visa and stay too.",
            },
            {
              q: "Is my medical information confidential?",
              a: "Yes. Only the relevant medical team will review your reports.",
            },
          ]}
        />
      </Section>

      {/* FINAL CTA */}
      <section className="bg-hero-gradient py-16 dark:bg-hero-gradient-dark sm:py-20">
        <Container className="text-center">
          <h2 className="mx-auto max-w-lg text-balance text-3xl font-bold text-navy-500 dark:text-white sm:text-4xl">
            Ready to get a second opinion?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-navy-300 dark:text-white/60">
            Share your details and our team will help you understand the next
            steps for treatment in India.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="#medical-review" variant="accent" size="lg">
              Get a Free Medical Review
            </Button>

            <Button
              href={whatsappHref(content.whatsappMessage)}
              variant="secondary"
              size="lg"
              icon={<MessageCircle size={18} />}
            >
              Chat on WhatsApp
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}