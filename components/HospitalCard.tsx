"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, BadgeCheck } from "lucide-react";
import FadeInImage from "./FadeInImage";
import { getHospitalSpecialties, type Hospital } from "@/lib/data";

const MotionLink = motion.create(Link);

export default function HospitalCard({ hospital }: { hospital: Hospital }) {
  const specialties = getHospitalSpecialties(hospital.slug);
  const shownSpecialties = specialties.slice(0, 4);
  const remainingCount = specialties.length - shownSpecialties.length;

  return (
    <MotionLink
      href={`/hospitals/${hospital.slug}`}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-glow dark:bg-white/5"
    >
      {/* Photo-led: the image carries the visual weight, not a boxed
          letter-avatar underneath it — that redundancy was removed. */}
      <div className="relative h-48 w-full overflow-hidden bg-navy-100">
        {hospital.image ? (
          <FadeInImage
            src={hospital.image}
            alt={hospital.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-100 to-teal-100 font-display text-3xl font-bold text-primary-600 dark:from-primary-500/15 dark:to-teal-500/15">
            {hospital.name.charAt(0)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/0 to-transparent" />
        {hospital.accreditations[0] && (
          <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-navy-500 shadow-sm backdrop-blur-sm">
            <BadgeCheck size={13} className="text-primary-500" /> {hospital.accreditations[0]}
          </span>
        )}
        <div className="absolute bottom-0 left-0 p-5">
          <h3 className="font-display text-lg font-semibold text-white">{hospital.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80">
            <MapPin size={13} /> {hospital.city} • {hospital.beds}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-relaxed text-navy-300 dark:text-white/60">
          {hospital.overview}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {shownSpecialties.map((s) => (
            <span
              key={s}
              className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700 dark:bg-teal-500/10 dark:text-teal-300"
            >
              {s}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-400 dark:bg-white/10 dark:text-white/60">
              +{remainingCount} more
            </span>
          )}
        </div>
        {hospital.accreditations.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-3 border-t border-navy-100/60 pt-4 dark:border-white/10">
            {hospital.accreditations.slice(1).map((a) => (
              <span
                key={a}
                className="flex items-center gap-1.5 text-xs font-medium text-navy-400 dark:text-white/50"
              >
                <BadgeCheck size={13} className="text-primary-500" /> {a}
              </span>
            ))}
          </div>
        )}
      </div>
    </MotionLink>
  );
}
