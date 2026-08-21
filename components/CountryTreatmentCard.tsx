import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import { TreatmentIcon } from "./IconMap";
import type { Treatment } from "@/lib/data";

export default function CountryTreatmentCard({
  treatment,
  countrySlug,
  doctorCount,
  href,
}: {
  treatment: Treatment;
  countrySlug: string;
  doctorCount: number;
  href?: string;
}) {
  return (
    <Link
      href={href ?? `/${countrySlug}/${treatment.slug}`}
      className="group flex flex-col rounded-xl border border-navy-100 bg-white p-6 transition-colors duration-200 hover:border-primary-300 hover:bg-primary-50/40 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
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
      {doctorCount > 0 && (
        <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary-600 dark:text-primary-300">
          <Users size={13} /> {doctorCount} doctor{doctorCount !== 1 ? "s" : ""} available
        </p>
      )}
    </Link>
  );
}
