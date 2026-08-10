import type { Metadata } from "next";
import { Mail, Phone, MessageCircle } from "lucide-react";
import Section from "@/components/Section";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach TrueCare by form, WhatsApp, email, or phone for a free medical consultation.",
};

export default function ContactPage() {
  return (
    <Section
      eyebrow="Contact"
      title="Tell us what you need — we'll take it from there"
      description="Share a few details and your medical reports if you have them. A care coordinator responds within 24 hours."
    >
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        <div className="space-y-4 lg:col-span-2">
          <a
            href="https://wa.me/919720574548"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-navy-100/70 bg-white p-5 transition-colors hover:border-primary-300 dark:border-white/10 dark:bg-white/5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-300">
              <MessageCircle size={20} />
            </span>
            <span>
              <span className="block font-display text-sm font-semibold text-navy-500 dark:text-white">
                WhatsApp
              </span>
              <span className="block text-sm text-navy-300 dark:text-white/60">
                Fastest response, 24/7
              </span>
            </span>
          </a>

          <a
            href="mailto:truecareonline24@gmail.com"
            className="flex items-center gap-4 rounded-2xl border border-navy-100/70 bg-white p-5 transition-colors hover:border-primary-300 dark:border-white/10 dark:bg-white/5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
              <Mail size={20} />
            </span>
            <span>
              <span className="block font-display text-sm font-semibold text-navy-500 dark:text-white">
                Email
              </span>
              <span className="block text-sm text-navy-300 dark:text-white/60">
                truecareonline24@gmail.com
              </span>
            </span>
          </a>

          <a
            href="tel:+919720574548"
            className="flex items-center gap-4 rounded-2xl border border-navy-100/70 bg-white p-5 transition-colors hover:border-primary-300 dark:border-white/10 dark:bg-white/5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
              <Phone size={20} />
            </span>
            <span>
              <span className="block font-display text-sm font-semibold text-navy-500 dark:text-white">
                Phone
              </span>
              <span className="block text-sm text-navy-300 dark:text-white/60">
                +91 97205 74548
              </span>
            </span>
          </a>
        </div>
      </div>
    </Section>
  );
}
