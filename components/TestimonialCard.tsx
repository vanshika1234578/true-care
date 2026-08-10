import { Quote } from "lucide-react";

export default function TestimonialCard({
  name,
  country,
  treatment,
  quote,
}: {
  name: string;
  country: string;
  treatment: string;
  quote: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-navy-100/70 bg-white p-7 shadow-card dark:border-white/10 dark:bg-white/5">
      <Quote size={22} className="text-teal-400" />
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-navy-500 dark:text-white/80">
        “{quote}”
      </p>
      <div className="mt-6 border-t border-navy-100/60 pt-4 dark:border-white/10">
        <p className="font-display text-sm font-semibold text-navy-500 dark:text-white">
          {name}
        </p>
        <p className="text-xs text-navy-300 dark:text-white/50">
          {country} • {treatment}
        </p>
      </div>
    </div>
  );
}
