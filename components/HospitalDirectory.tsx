"use client";

import { useMemo, useState } from "react";
import { MapPin, X } from "lucide-react";
import HospitalCard from "./HospitalCard";
import FilterDropdown from "./FilterDropdown";
import type { Hospital } from "@/lib/data";

export default function HospitalDirectory({ hospitals }: { hospitals: Hospital[] }) {
  const locations = useMemo(
    () => Array.from(new Set(hospitals.map((hospital) => hospital.city))).sort(),
    [hospitals]
  );
  const [location, setLocation] = useState("all");

  const filteredHospitals = useMemo(
    () =>
      location === "all"
        ? hospitals
        : hospitals.filter((hospital) => hospital.city === location),
    [hospitals, location]
  );

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-navy-100 bg-white p-5 dark:border-white/10 dark:bg-white/5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FilterDropdown
            icon={MapPin}
            label="Location"
            value={location}
            onChange={setLocation}
            options={[{ value: "all", label: "All locations" }, ...locations.map((c) => ({ value: c, label: c }))]}
          />
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-navy-100/70 pt-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-navy-300 dark:text-white/60">
            Showing <span className="font-semibold text-navy-500 dark:text-white">{filteredHospitals.length}</span> of {hospitals.length} hospitals
          </p>
          {location !== "all" && (
            <button
              type="button"
              onClick={() => setLocation("all")}
              className="inline-flex items-center justify-center gap-1.5 self-start rounded-full border border-navy-100 px-3 py-1.5 text-xs font-semibold text-navy-400 transition hover:border-primary-300 hover:text-primary-600 dark:border-white/10 dark:text-white/60 dark:hover:text-primary-300 sm:self-auto"
            >
              <X size={14} /> Clear filter
            </button>
          )}
        </div>
      </div>

      {filteredHospitals.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filteredHospitals.map((hospital) => (
            <HospitalCard key={hospital.slug} hospital={hospital} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-navy-100 bg-white p-10 text-center dark:border-white/10 dark:bg-white/5">
          <h3 className="font-display text-lg font-semibold text-navy-500 dark:text-white">No hospitals found</h3>
          <p className="mt-2 text-sm text-navy-300 dark:text-white/60">Try selecting a different location.</p>
          <button
            type="button"
            onClick={() => setLocation("all")}
            className="mt-5 rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}
