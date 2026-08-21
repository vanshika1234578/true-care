"use client";

import { useMemo, useState } from "react";
import { MapPin, Stethoscope, X } from "lucide-react";
import DoctorCard from "./DoctorCard";
import FilterDropdown from "./FilterDropdown";
import { doctors, hospitals, treatments } from "@/lib/data";

const hospitalCityBySlug = new Map(hospitals.map((hospital) => [hospital.slug, hospital.city]));
const treatmentNameBySlug = new Map(treatments.map((t) => [t.slug, t.name]));

export default function DoctorDirectory() {
  const [location, setLocation] = useState("all");
  const [treatmentSlug, setTreatmentSlug] = useState("all");

  const locations = useMemo(
    () => Array.from(new Set(doctors.map((doctor) => hospitalCityBySlug.get(doctor.hospitalSlug) ?? doctor.hospital))).sort(),
    []
  );

  // Filtering by broad treatment category (Cardiology, Oncology, ...)
  // rather than each doctor's exact specialty string — with 150 doctors,
  // exact specialties are granular enough (121 distinct strings, e.g.
  // "Neurosurgery & Neuro-Radiation Surgery" vs "Paediatric Neurology")
  // that a dropdown of them stops being a useful filter at all. This also
  // matches how every other part of the site (treatment pages, country
  // hubs) already categorizes doctors.
  const treatmentOptions = useMemo(() => {
    const usedSlugs = new Set(doctors.map((d) => d.treatmentSlug));
    return treatments
      .filter((t) => usedSlugs.has(t.slug))
      .map((t) => ({ value: t.slug, label: t.name }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const doctorLocation = hospitalCityBySlug.get(doctor.hospitalSlug) ?? doctor.hospital;
      const matchesLocation = location === "all" || doctorLocation === location;
      const matchesTreatment = treatmentSlug === "all" || doctor.treatmentSlug === treatmentSlug;
      return matchesLocation && matchesTreatment;
    });
  }, [location, treatmentSlug]);

  const hasFilters = location !== "all" || treatmentSlug !== "all";

  function clearFilters() {
    setLocation("all");
    setTreatmentSlug("all");
  }

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-navy-100 bg-white p-5 dark:border-white/10 dark:bg-white/5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FilterDropdown
            icon={MapPin}
            label="Location"
            value={location}
            onChange={setLocation}
            options={[{ value: "all", label: "All locations" }, ...locations.map((l) => ({ value: l, label: l }))]}
          />
          <FilterDropdown
            icon={Stethoscope}
            label="Treatment Area"
            value={treatmentSlug}
            onChange={setTreatmentSlug}
            options={[{ value: "all", label: "All treatment areas" }, ...treatmentOptions]}
          />
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-navy-100/70 pt-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-navy-300 dark:text-white/60">
            Showing <span className="font-semibold text-navy-500 dark:text-white">{filteredDoctors.length}</span> of {doctors.length} doctors
            {treatmentSlug !== "all" && (
              <> in <span className="font-semibold text-navy-500 dark:text-white">{treatmentNameBySlug.get(treatmentSlug)}</span></>
            )}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-1.5 self-start rounded-full border border-navy-100 px-3 py-1.5 text-xs font-semibold text-navy-400 transition hover:border-primary-300 hover:text-primary-600 dark:border-white/10 dark:text-white/60 dark:hover:text-primary-300 sm:self-auto"
            >
              <X size={14} /> Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.slug} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-navy-100 bg-white p-10 text-center dark:border-white/10 dark:bg-white/5">
          <h3 className="font-display text-lg font-semibold text-navy-500 dark:text-white">No doctors match these filters</h3>
          <p className="mt-2 text-sm text-navy-300 dark:text-white/60">Try another location or treatment area, or clear the filters.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
