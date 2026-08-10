import { MapPin } from "lucide-react";
import Section from "./Section";
import AnimatedSection from "./AnimatedSection";
import type { Destination } from "@/lib/data";

const BADGE_COLORS = [
  "bg-primary-500",
  "bg-teal-500",
  "bg-navy-500",
  "bg-primary-600",
  "bg-teal-600",
  "bg-navy-400",
];

export default function TopDestinations({ destinations }: { destinations: Destination[] }) {
  return (
    <Section
      eyebrow="Where you'll be treated"
      title="Top Medical Destinations"
      description="Our network spans India's leading medical hubs — giving you the choice of cities, hospitals, and price."
    >
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-4">
        {destinations.map((d, i) => (
          <AnimatedSection key={d.city} delay={i * 0.04}>
            <div className="flex items-center gap-3 rounded-2xl border-2 border-primary-200 bg-primary-50/60 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-400 hover:shadow-glow dark:border-primary-500/30 dark:bg-white/5 dark:hover:border-primary-400/60">
              <span
                className={`flex h-9 w-11 flex-shrink-0 items-center justify-center rounded-md text-[10px] font-bold tracking-wide text-white ${BADGE_COLORS[i % BADGE_COLORS.length]}`}
              >
                {d.code}
              </span>
              <span className="whitespace-nowrap font-display text-lg font-bold text-primary-700 dark:text-primary-300">
                {d.city}
              </span>
            </div>
          </AnimatedSection>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-navy-300 dark:text-white/50">
        <MapPin size={15} className="text-primary-500" />
        <span>Every city listed has JCI- or NABH-accredited partner hospitals</span>
      </div>
    </Section>
  );
}
