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
        className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-glow dark:bg-white/5"
      >
        {/* Small, fixed-size rectangular photo — not circular (a circular
            crop cut off faces on several real doctor photos), but also not
            scaled to the full card width, which made cards feel dominated
            by an oversized image and inconsistent in height card-to-card. */}
        <div className="flex justify-center pt-6">
          <div className="relative h-28 w-24 flex-none overflow-hidden rounded-xl bg-navy-100">
            {doctor.photo ? (
              <FadeInImage
                src={doctor.photo}
                alt={doctor.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-100 to-teal-100 font-display text-2xl font-bold text-primary-600 dark:from-primary-500/15 dark:to-teal-500/15">
                {initials}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 pt-4 text-center">
          <h3 className="font-display text-base font-semibold text-navy-500 dark:text-white">
            {doctor.name}
          </h3>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-primary-600 dark:text-primary-300">
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
        </div>
      </motion.div>
    </Link>
  );
}
