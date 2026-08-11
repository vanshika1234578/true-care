import type { MetadataRoute } from "next";
import { treatments, hospitals } from "@/lib/data";

const BASE_URL = "https://truecare24.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/treatments",
    "/hospitals",
    "/doctors",
    "/find-doctor",
    "/why-india",
    "/patient-journey",
    "/patient-stories",
    "/blog",
    "/bd/knee-replacement-india",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/bd/knee-replacement-india" ? 0.9 : 0.6,
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

  return [...staticRoutes, ...treatmentRoutes, ...hospitalRoutes];
}
