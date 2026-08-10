import { Briefcase, Languages, Stethoscope } from "lucide-react";
import type { Doctor } from "@/lib/data";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const initials = doctor.name
    .replace("Dr. ", "")
    .split(" ")
    .map((n) => n.charAt(0))
    .join("");

  return (
    <div className="flex flex-col items-center rounded-2xl border border-navy-100/70 bg-white p-6 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow dark:border-white/10 dark:bg-white/5">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-teal-400 font-display text-lg font-bold text-white">
        {initials}
      </div>
      <h3 className="mt-4 font-display text-base font-semibold text-navy-500 dark:text-white">
        {doctor.name}
      </h3>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-300">
        <Stethoscope size={14} /> {doctor.specialty}
      </p>
      {doctor.qualifications && (
        <p className="mt-1 text-xs text-navy-300 dark:text-white/50">{doctor.qualifications}</p>
      )}
      <p className="mt-3 text-sm text-navy-300 dark:text-white/60">{doctor.hospital}</p>
      <div className="mt-4 flex w-full flex-col gap-2 border-t border-navy-100/60 pt-4 text-xs text-navy-400 dark:border-white/10 dark:text-white/50">
        <span className="flex items-center justify-center gap-1.5">
          <Briefcase size={13} />{" "}
          {/^\d/.test(doctor.experience) ? `${doctor.experience} experience` : doctor.experience}
        </span>
        <span className="flex items-center justify-center gap-1.5">
          <Languages size={13} /> {doctor.languages.join(", ")}
        </span>
      </div>
    </div>
  );
}
