import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing your use of the TrueCare website and services.",
};

export default function TermsPage() {
  return (
    <Section eyebrow="Legal" title="Terms of Service" align="left">
      <div className="prose prose-sm mx-auto max-w-2xl text-navy-400 dark:text-white/70">
        <p className="text-sm text-navy-300 dark:text-white/50">Last updated: {new Date().getFullYear()}</p>

        <h3 className="mt-8 font-display text-base font-semibold text-navy-500 dark:text-white">
          Our role
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          TrueCare ("we," "us," "our") operates this website to help international patients connect
          with independent hospitals and medical professionals in India, and to coordinate the logistics
          of that process. By using this website or submitting an inquiry, you agree to these terms.
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          Not a healthcare provider
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          TrueCare is a coordination and facilitation service. We are not a hospital, clinic, or medical
          practice, and we do not provide medical treatment, diagnosis, or clinical advice. All medical
          decisions are made by independent, qualified doctors and hospitals. See our{" "}
          <a href="/medical-disclaimer" className="text-primary-600 dark:text-primary-300">
            Medical Disclaimer
          </a>{" "}
          for more detail.
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          Accuracy of information
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          We aim to keep information on this site accurate and up to date, but treatment costs,
          timelines, and hospital/doctor details are subject to change and should be confirmed directly
          with the treating hospital before making any decisions.
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          Your information
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          Information you submit through our forms, including medical reports, is handled according to
          our{" "}
          <a href="/privacy" className="text-primary-600 dark:text-primary-300">
            Privacy Policy
          </a>
          .
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          Limitation of liability
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          TrueCare facilitates connections between patients and independent healthcare providers but is
          not responsible for the clinical outcomes, actions, or omissions of those providers.
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          Contact
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          Questions about these terms can be sent to{" "}
          <a href="mailto:truecareonline24@gmail.com" className="text-primary-600 dark:text-primary-300">
            truecareonline24@gmail.com
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
