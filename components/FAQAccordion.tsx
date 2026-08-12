"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQ = { q: string; a: string };

export default function FAQAccordion({ faqs }: { faqs: readonly FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-2xl divide-y divide-navy-100/70 dark:divide-white/10">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.q}>
            <button
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-display text-[15px] font-semibold text-navy-500 dark:text-white">
                {faq.q}
              </span>
              <ChevronDown
                size={18}
                className={`flex-shrink-0 text-navy-300 transition-transform duration-300 dark:text-white/50 ${
                  isOpen ? "rotate-180 text-primary-500" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 pb-5" : "max-h-0"
              }`}
            >
              <p className="text-sm leading-relaxed text-navy-300 dark:text-white/60">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
