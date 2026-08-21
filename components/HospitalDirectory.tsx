"use client";

import { useMemo, useState } from "react";
import HospitalCard from "./HospitalCard";
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
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-navy-100 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <label htmlFor="hospital-location" className="block text-sm font-semibold text-navy-700 dark:text-white">
            Location
          </label>
          <select
            id="hospital-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="mt-2 w-full min-w-56 rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-white/15 dark:bg-navy-900 dark:text-white sm:w-auto"
          >
            <option value="all">All locations</option>
            {locations.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3 text-sm text-navy-400 dark:text-white/50">
          <span>
            Showing <span className="font-semibold text-navy-700 dark:text-white">{filteredHospitals.length}</span> of {hospitals.length} hospitals
          </span>
          {location !== "all" && (
            <button
              type="button"
              onClick={() => setLocation("all")}
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
            >
              Clear
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
        <div className="rounded-2xl border border-dashed border-navy-200 p-10 text-center dark:border-white/15">
          <h3 className="text-lg font-semibold text-navy-800 dark:text-white">No hospitals found</h3>
          <p className="mt-2 text-sm text-navy-400 dark:text-white/50">
            Try selecting a different location.
          </p>
        </div>
      )}
    </div>
  );
}
