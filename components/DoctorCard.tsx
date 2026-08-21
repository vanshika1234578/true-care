"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Languages, Stethoscope } from "lucide-react";
import FadeInImage from "./FadeInImage";
import type { Doctor } from "@/lib/data";

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const initials = doctor.name
    .replace("Dr. ", "")
    .replace("Dr ", "")
    .split(" ")
    .map((n) => n.charAt(0))
    .join("");

  return (
    <Link href={`/doctors/${doctor.slug}`} className="block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="flex h-full flex-col items-center rounded-2xl bg-white p-6 text-center shadow-card transition-shadow duration-300 hover:shadow-glow dark:bg-white/5"
      >
        {/* Soft colored halo behind the photo — a person-first accent that
            a plain utility card (e.g. CountryTreatmentCard) deliberately
            doesn't get, so doctors read as people, not menu items. */}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-teal-100 dark:from-primary-500/20 dark:to-teal-500/20">
          {doctor.photo ? (
            <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-white dark:ring-surface-dark">
              <FadeInImage src={doctor.photo} alt={doctor.name} fill className="object-cover" sizes="64px" />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-teal-400 font-display text-lg font-bold text-white ring-2 ring-white dark:ring-surface-dark">
              {initials}
            </div>
          )}
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
          {doctor.experience && doctor.experience !== "Confirm with hospital" && (
            <span className="flex items-center justify-center gap-1.5">
              <Briefcase size={13} />{" "}
              {/^\d/.test(doctor.experience) ? `${doctor.experience} experience` : doctor.experience}
            </span>
          )}
          <span className="flex items-center justify-center gap-1.5">
            <Languages size={13} /> {doctor.languages.join(", ")}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
