"use client";

import { useMemo, useState } from "react";
import { ChevronDown, MapPin, Stethoscope, X } from "lucide-react";
import DoctorCard from "./DoctorCard";
import { doctors, hospitals } from "@/lib/data";

const hospitalCityBySlug = new Map(hospitals.map((hospital) => [hospital.slug, hospital.city]));

export default function DoctorDirectory() {
  const [location, setLocation] = useState("all");
  const [specialty, setSpecialty] = useState("all");

  const locations = useMemo(
    () => Array.from(new Set(doctors.map((doctor) => hospitalCityBySlug.get(doctor.hospitalSlug) ?? doctor.hospital))).sort(),
    []
  );

  const specialties = useMemo(
    () => Array.from(new Set(doctors.map((doctor) => doctor.specialty))).sort((a, b) => a.localeCompare(b)),
    []
  );

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const doctorLocation = hospitalCityBySlug.get(doctor.hospitalSlug) ?? doctor.hospital;
      const matchesLocation = location === "all" || doctorLocation === location;
      const matchesSpecialty = specialty === "all" || doctor.specialty === specialty;
      return matchesLocation && matchesSpecialty;
    });
  }, [location, specialty]);

  const hasFilters = location !== "all" || specialty !== "all";

  function clearFilters() {
    setLocation("all");
    setSpecialty("all");
  }

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-navy-100/70 bg-white p-4 shadow-card dark:border-white/10 dark:bg-white/5 sm:p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy-300 dark:text-white/50">
              <MapPin size={14} /> Location
            </span>
            <div className="relative">
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full appearance-none rounded-xl border border-navy-100 bg-white px-4 py-3 pr-10 text-sm text-navy-500 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-white/10 dark:bg-white/5 dark:text-white"
                aria-label="Filter doctors by location"
              >
                <option value="all">All locations</option>
                {locations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy-300 dark:text-white/40" size={18} />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy-300 dark:text-white/50">
              <Stethoscope size={14} /> Speciality
            </span>
            <div className="relative">
              <select
                value={specialty}
                onChange={(event) => setSpecialty(event.target.value)}
                className="w-full appearance-none rounded-xl border border-navy-100 bg-white px-4 py-3 pr-10 text-sm text-navy-500 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-white/10 dark:bg-white/5 dark:text-white"
                aria-label="Filter doctors by speciality"
              >
                <option value="all">All specialities</option>
                {specialties.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy-300 dark:text-white/40" size={18} />
            </div>
          </label>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-navy-100/70 pt-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-navy-300 dark:text-white/60">
            Showing <span className="font-semibold text-navy-500 dark:text-white">{filteredDoctors.length}</span> of {doctors.length} doctors
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-1.5 self-start rounded-full border border-navy-100 px-3 py-1.5 text-xs font-semibold text-navy-400 transition hover:border-primary-200 hover:text-primary-600 dark:border-white/10 dark:text-white/60 dark:hover:text-primary-300 sm:self-auto"
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
          <p className="mt-2 text-sm text-navy-300 dark:text-white/60">Try another location or speciality, or clear the filters.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
