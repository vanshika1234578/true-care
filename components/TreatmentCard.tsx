import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TreatmentIcon } from "./IconMap";
import type { Treatment } from "@/lib/data";

export default function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <Link
      href={`/treatments/${treatment.slug}`}
      className="group flex flex-col rounded-2xl border border-navy-100/70 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-300">
          <TreatmentIcon name={treatment.icon} size={22} />
        </div>
        <ArrowUpRight
          size={18}
          className="text-navy-200 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-500 dark:text-white/30"
        />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-navy-500 dark:text-white">
        {treatment.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-300 dark:text-white/60">
        {treatment.summary}
      </p>
    </Link>
  );
}
