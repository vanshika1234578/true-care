"use client";

import { useEffect } from "react";
import { captureAdAttribution } from "@/lib/adAttribution";

export default function AdAttributionCapture() {
  useEffect(() => {
    captureAdAttribution();
  }, []);

  return null;
}
