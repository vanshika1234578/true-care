import type { Metadata } from "next";
import { Compass, GraduationCap, Heart, Linkedin, ShieldCheck, Users } from "lucide-react";
import Section from "@/components/Section";
import AnimatedSection from "@/components/AnimatedSection";
import JourneyTimeline from "@/components/JourneyTimeline";
import { journeySteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: "TrueCare's mission, vision, and how we support international patients seeking treatment in India.",
};

const values = [
  { icon: ShieldCheck, title: "Transparency", description: "We explain costs, timelines, and options clearly — no hidden steps, no overpromising." },
  { icon: Heart, title: "Patient-first", description: "Every recommendation is based on what fits your condition, not what's easiest for us to arrange." },
  { icon: Users, title: "Human support", description: "A dedicated coordinator stays with you from inquiry through follow-up, not just the booking." },
  { icon: Compass, title: "Honest guidance", description: "If a treatment or hospital isn't the right fit, we'll say so — even if it means a longer search." },
];

const founders = [
  {
    name: "Vanshika Singhal",
    role: "Co-Founder",
    education: "IIT Roorkee",
    bio: "Focused on building the product and technology behind TrueCare's doctor-matching and patient experience.",
    linkedin: "https://www.linkedin.com/in/vanshika-singhal-bb1b66286",
  },
  {
    name: "Urva Prajapati",
    role: "Co-Founder",
    education: "IIT Roorkee",
    bio: "Focused on hospital partnerships and building the on-ground patient care and coordination network.",
    linkedin: "https://www.linkedin.com/in/urva-prajapati-37a692393",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section
        eyebrow="About TrueCare"
        title="We help patients navigate treatment abroad, one honest step at a time"
        description="TrueCare was built around a simple observation: patients traveling for treatment need a guide they can trust, not just a booking service."
      >
        <div className="grid gap-8 sm:grid-cols-2">
          <AnimatedSection className="rounded-2xl border border-navy-100/70 bg-white p-8 dark:border-white/10 dark:bg-white/5">
            <h3 className="font-display text-xl font-semibold text-navy-500 dark:text-white">
              Our Mission
            </h3>
            <p className="mt-3 text-navy-300 dark:text-white/60">
              Making medical travel effortless — so patients and families can focus on getting
              better, not on logistics.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.05} className="rounded-2xl border border-navy-100/70 bg-white p-8 dark:border-white/10 dark:bg-white/5">
            <h3 className="font-display text-xl font-semibold text-navy-500 dark:text-white">
              Our Vision
            </h3>
            <p className="mt-3 text-navy-300 dark:text-white/60">
              A future where distance and unfamiliarity are never barriers to accessing quality
              healthcare, wherever it's available.
            </p>
          </AnimatedSection>
        </div>
      </Section>

      <Section
        eyebrow="About Us"
        align="left"
      >
        <AnimatedSection className="mx-auto max-w-3xl rounded-2xl border border-navy-100/70 bg-white p-8 sm:p-10 dark:border-white/10 dark:bg-white/5">
          <p className="text-balance text-lg leading-relaxed text-navy-500 dark:text-white/80 sm:text-xl">
            We&apos;re Vanshika Singhal and Urva Prajapati, two IIT Roorkee graduates who set out
            to solve a problem we saw up close — patients traveling across the world for care,
            without a trusted partner to guide them. Our mission is to make TrueCare the number
            one medical travel company in the world, powered by India&apos;s world-class hospitals
            and doctors.
          </p>
        </AnimatedSection>
      </Section>

      <Section
        eyebrow="Meet the Founders"
        title="Built by two IIT Roorkee graduates"
        description="TrueCare is led by founders who combine engineering rigor with a hands-on understanding of patient care."
      >
        <div className="grid gap-6 sm:grid-cols-2 sm:max-w-3xl sm:mx-auto">
          {founders.map(({ name, role, education, bio, linkedin }, i) => {
            const initials = name
              .split(" ")
              .map((n) => n.charAt(0))
              .join("");
            return (
              <AnimatedSection
                key={name}
                delay={i * 0.05}
                className="flex flex-col items-center rounded-2xl border border-navy-100/70 bg-white p-8 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-teal-400 font-display text-xl font-bold text-white">
                  {initials}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy-500 dark:text-white">
                  {name}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary-600 dark:text-primary-300">
                  {role}
                </p>
                <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-navy-300 dark:text-white/50">
                  <GraduationCap size={13} /> {education}
                </p>
                <p className="mt-3 text-sm text-navy-300 dark:text-white/60">{bio}</p>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  <Linkedin size={14} /> Connect on LinkedIn
                </a>
              </AnimatedSection>
            );
          })}
        </div>
      </Section>

      <Section
        className="bg-surface-soft dark:bg-surface-darkSoft"
        eyebrow="What we stand for"
        title="Our values"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }, i) => (
            <AnimatedSection
              key={title}
              delay={i * 0.05}
              className="rounded-2xl border border-navy-100/70 bg-white p-6 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-navy-500 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm text-navy-300 dark:text-white/60">{description}</p>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Our Process"
        title="How TrueCare works"
        description="The same nine-step process applies whether you're arriving for a routine procedure or complex, multi-stage treatment."
      >
        <JourneyTimeline steps={journeySteps} />
      </Section>
    </>
  );
}
