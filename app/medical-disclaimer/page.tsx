import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description: "Important information about the medical content on this website.",
};

export default function MedicalDisclaimerPage() {
  return (
    <Section eyebrow="Legal" title="Medical Disclaimer" align="left">
      <div className="prose prose-sm mx-auto max-w-2xl text-navy-400 dark:text-white/70">
        <p className="mt-2 text-sm leading-relaxed">
          The information provided on this website, including descriptions of treatments, procedures,
          costs, and recovery timelines, is for general educational purposes only. It is not intended as,
          and should not be used as a substitute for, professional medical advice, diagnosis, or
          treatment from a qualified healthcare provider.
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          TrueCare is a coordination platform, not a healthcare provider
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          TrueCare helps international patients connect with independent hospitals and medical
          professionals in India and coordinates the logistics of that process. TrueCare does not
          diagnose medical conditions, does not provide medical treatment, and does not make clinical
          decisions. All diagnoses, treatment plans, and clinical decisions are made solely by the
          qualified doctors and hospitals involved in your care.
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          No guaranteed outcomes
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          Every patient's condition is different. Nothing on this website should be interpreted as a
          guarantee of any specific treatment outcome, recovery timeline, or cost. Estimated costs and
          timelines mentioned on this site are general ranges and are subject to change based on your
          specific case, as determined by the treating hospital after reviewing your medical reports.
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          Always consult a qualified professional
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          Before making any decisions about your health or a medical procedure, please consult a
          qualified healthcare professional who can evaluate your specific medical history and current
          condition.
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          Questions
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          If you have questions about this disclaimer, please contact us at{" "}
          <a href="mailto:truecareonline24@gmail.com" className="text-primary-600 dark:text-primary-300">
            truecareonline24@gmail.com
          </a>
          .
        </p>
      </div>
    </Section>
  );
}
