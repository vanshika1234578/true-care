import type { Metadata } from "next";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How TrueCare collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <Section eyebrow="Legal" title="Privacy Policy" align="left">
      <div className="prose prose-sm mx-auto max-w-2xl text-navy-400 dark:text-white/70">
        <p className="text-sm text-navy-300 dark:text-white/50">Last updated: {new Date().getFullYear()}</p>

        <h3 className="mt-8 font-display text-base font-semibold text-navy-500 dark:text-white">
          What we collect
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          When you contact us or submit an inquiry — through our contact form, the medical report
          submission form, or WhatsApp — we collect the information you provide, which may include your
          name, contact details (email, phone/WhatsApp number), country, age, a description of your
          medical condition, and any medical reports or documents you choose to upload.
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          How we use it
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          We use this information solely to coordinate your care — connecting your case with the
          relevant hospital and specialist team, responding to your inquiries, and following up on
          your treatment journey. We do not sell your information, and we do not share it with third
          parties for marketing purposes.
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          Medical reports
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          Medical reports you upload are transmitted securely and stored only for the purpose of
          coordinating your treatment. They are not made publicly accessible, and access is limited to
          our patient coordination team and the hospital/specialist team relevant to your case.
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          WhatsApp communication
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          If you contact us or provide your number via WhatsApp, we may use it to send you updates
          related to your inquiry, such as confirming receipt of your submitted reports. We do not use
          your WhatsApp number for unrelated marketing messages.
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          Cookies and analytics
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          We may use cookies and similar technologies to understand how visitors use our site and to
          improve your experience. Where analytics tools are in use, they only run after you accept our
          cookie notice; declining means only strictly necessary functionality is used.
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          Your choices
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          You can ask us to access, correct, or delete the information we hold about you at any time by
          contacting us at{" "}
          <a href="mailto:truecareonline24@gmail.com" className="text-primary-600 dark:text-primary-300">
            truecareonline24@gmail.com
          </a>{" "}
          or via WhatsApp at{" "}
          <a href="tel:+919720574548" className="text-primary-600 dark:text-primary-300">
            +91 97205 74548
          </a>
          .
        </p>

        <h3 className="mt-6 font-display text-base font-semibold text-navy-500 dark:text-white">
          Contact us
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          If you have questions about this policy or how your information is handled, please reach out
          to us using the contact details above.
        </p>
      </div>
    </Section>
  );
}
