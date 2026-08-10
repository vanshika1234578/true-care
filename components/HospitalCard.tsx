import Link from "next/link";
import { MapPin, BadgeCheck } from "lucide-react";
import type { Hospital } from "@/lib/data";

export default function HospitalCard({ hospital }: { hospital: Hospital }) {
  return (
    <Link
      href={`/hospitals/${hospital.slug}`}
      className="flex flex-col rounded-2xl border border-navy-100/70 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 font-display text-lg font-bold text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
        {hospital.name.charAt(0)}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-navy-500 hover:text-primary-600 dark:text-white dark:hover:text-primary-300">
        {hospital.name}
      </h3>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-navy-300 dark:text-white/60">
        <MapPin size={14} /> {hospital.city} • {hospital.beds}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-navy-300 dark:text-white/60">
        {hospital.overview}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {hospital.specialties.map((s) => (
          <span
            key={s}
            className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 dark:bg-teal-500/10 dark:text-teal-300"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 border-t border-navy-100/60 pt-4 dark:border-white/10">
        {hospital.accreditations.map((a) => (
          <span
            key={a}
            className="flex items-center gap-1.5 text-xs font-medium text-navy-400 dark:text-white/50"
          >
            <BadgeCheck size={14} className="text-primary-500" /> {a}
          </span>
        ))}
      </div>
    </Link>
  );
}
