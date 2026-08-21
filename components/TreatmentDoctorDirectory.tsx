"use client";

import { useMemo, useState } from "react";
import DoctorCard from "./DoctorCard";
import type { Doctor } from "@/lib/data";

export default function TreatmentDoctorDirectory({
  doctors,
  treatmentName,
}: {
  doctors: Doctor[];
  treatmentName: string;
}) {
  const [hospitalSlug, setHospitalSlug] = useState("all");

  const hospitals = useMemo(() => {
    const unique = new Map<string, string>();
    for (const doctor of doctors) unique.set(doctor.hospitalSlug, doctor.hospital);
    return Array.from(unique.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [doctors]);

  const filteredDoctors = useMemo(
    () =>
      hospitalSlug === "all"
        ? doctors
        : doctors.filter((doctor) => doctor.hospitalSlug === hospitalSlug),
    [doctors, hospitalSlug]
  );

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-navy-100/70 bg-white p-5 shadow-card dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-navy-500 dark:text-white">
            {treatmentName} specialists across all partner hospitals
          </h2>
          <p className="mt-1 text-sm text-navy-300 dark:text-white/60">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length === 1 ? "" : "s"} from {hospitalSlug === "all" ? "all hospitals" : "the selected hospital"}.
          </p>
        </div>
        <label className="flex min-w-56 flex-col gap-1.5 text-sm font-medium text-navy-400 dark:text-white/70">
          Hospital
          <select
            value={hospitalSlug}
            onChange={(event) => setHospitalSlug(event.target.value)}
            className="rounded-xl border border-navy-100 bg-white px-3 py-2.5 text-sm text-navy-500 outline-none ring-primary-500 focus:ring-2 dark:border-white/10 dark:bg-surface-dark dark:text-white"
          >
            <option value="all">All hospitals</option>
            {hospitals.map(([slug, name]) => (
              <option key={slug} value={slug}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredDoctors.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.slug} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-navy-100 p-8 text-center text-sm text-navy-400 dark:border-white/10 dark:text-white/50">
          No doctors are currently listed for this hospital and specialty.
        </div>
      )}
    </div>
  );
}
