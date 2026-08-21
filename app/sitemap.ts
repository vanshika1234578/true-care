import type { MetadataRoute } from "next";
import { treatments, hospitals, doctors } from "@/lib/data";
import { countries } from "@/lib/countries";

const BASE_URL = "https://truecare24.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/medical-disclaimer",
    "/treatments",
    "/hospitals",
    "/doctors",
    "/find-doctor",
    "/why-india",
    "/patient-journey",
    "/patient-stories",
    "/blog",
    "/bd/knee-replacement-india",
    "/bd/knee-replacement-india/bn",
    "/bd/cardiac-treatment-india",
    "/oman/cardiac-treatment-india",
    "/kuwait/cardiac-treatment-india",
    "/uae/cardiac-treatment-india",
    "/bahrain/cardiac-treatment-india",
    "/saudi-arabia/cardiac-treatment-india",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path.startsWith("/bd/knee-replacement-india") || path.startsWith("/bd/cardiac-treatment-india") || path.startsWith("/oman/") || path.startsWith("/kuwait/") || path.startsWith("/uae/") || path.startsWith("/bahrain/") || path.startsWith("/saudi-arabia/") ? 0.9 : 0.6,
  }));

  const treatmentRoutes = treatments.map((t) => ({
    url: `${BASE_URL}/treatments/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const hospitalRoutes = hospitals.map((h) => ({
    url: `${BASE_URL}/hospitals/${h.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const doctorRoutes = doctors.map((d) => ({
    url: `${BASE_URL}/doctors/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // Country hub pages (/[country]) and generic country×treatment listing
  // pages (/[country]/[treatment]) — data-driven from the same registries
  // used to build the actual routes, so this can't silently drift out of
  // sync with what pages really exist.
  const countryHubRoutes = countries.map((c) => ({
    url: `${BASE_URL}/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const countryTreatmentRoutes = countries.flatMap((c) =>
    treatments.map((t) => ({
      url: `${BASE_URL}/${c.slug}/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [
    ...staticRoutes,
    ...treatmentRoutes,
    ...hospitalRoutes,
    ...doctorRoutes,
    ...countryHubRoutes,
    ...countryTreatmentRoutes,
  ];
}
