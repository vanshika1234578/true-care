"use client";

import { useMemo, useState } from "react";
import { Building2 } from "lucide-react";
import DoctorCard from "./DoctorCard";
import FilterDropdown from "./FilterDropdown";
import type { Doctor } from "@/lib/data";

export default function TreatmentDoctorDirectory({
  doctors,
  treatmentName,
}: {
  doctors: Doctor[];
  treatmentName: string;
}) {
  const [hospitalSlug, setHospitalSlug] = useState("all");

  const hospitalOptions = useMemo(() => {
    const unique = new Map<string, string>();
    for (const doctor of doctors) unique.set(doctor.hospitalSlug, doctor.hospital);
    return Array.from(unique.entries())
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([value, label]) => ({ value, label }));
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
      <div className="flex flex-col gap-5 rounded-2xl border border-navy-100 bg-white p-5 dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-navy-500 dark:text-white">
            {treatmentName} specialists across all partner hospitals
          </h2>
          <p className="mt-1 text-sm text-navy-300 dark:text-white/60">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length === 1 ? "" : "s"} from{" "}
            {hospitalSlug === "all" ? "all hospitals" : "the selected hospital"}.
          </p>
        </div>
        <div className="w-full sm:w-64">
          <FilterDropdown
            icon={Building2}
            label="Hospital"
            value={hospitalSlug}
            onChange={setHospitalSlug}
            options={[{ value: "all", label: "All hospitals" }, ...hospitalOptions]}
          />
        </div>
      </div>

      {filteredDoctors.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.slug} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-navy-100 bg-white p-8 text-center text-sm text-navy-400 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
          No doctors are currently listed for this hospital and specialty.
        </div>
      )}
    </div>
  );
}
