"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import { X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { countries, regions } from "@/lib/countries";

/**
 * Full-screen country picker, grouped by region — matches the pattern used
 * by medical-travel reference sites (flag grid grouped by region, click a
 * country to go straight to its treatment hub).
 *
 * Deliberately only lists the 6 countries in lib/countries.ts. Do not pad
 * this with extra regions/countries TrueCare doesn't have real content for
 * — that would misrepresent market presence we don't actually have.
 */
export default function CountrySwitcher() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Portals need a browser document to render into — this flips true only
  // after client-side mount, avoiding an SSR/hydration mismatch.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Header (and this component) persists across client-side navigations —
  // without this, if the modal is ever left open and the visitor navigates
  // away by any route other than selectCountry() below, it stays stuck open
  // (dimmed backdrop + panel) on whatever page they land on next.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  function selectCountry(slug: string) {
    setOpen(false);
    router.push(`/${slug}`);
  }

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ pointerEvents: open ? "auto" : "none" }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-navy-900/60 p-4 py-10 backdrop-blur-sm sm:p-8"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-3xl bg-surface-soft p-8 shadow-2xl dark:bg-surface-dark sm:p-10"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-6 top-6 rounded-full p-1.5 text-navy-400 hover:bg-navy-100/60 dark:text-white/60 dark:hover:bg-white/10"
            >
              <X size={22} />
            </button>

            <h2 className="mb-8 font-display text-3xl font-bold text-navy-500 dark:text-white">
              Choose Your Country
            </h2>

            {regions.map((region) => {
              const regionCountries = countries.filter((c) => c.region === region);
              if (regionCountries.length === 0) return null;
              return (
                <div key={region} className="mb-8 last:mb-0">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-navy-300 dark:text-white/40">
                    {region}
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {regionCountries.map((c) => (
                      <button
                        key={c.slug}
                        onClick={() => selectCountry(c.slug)}
                        className="flex items-center gap-2.5 rounded-xl bg-white px-4 py-3 text-left text-sm font-semibold text-navy-500 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-glow dark:bg-white/5 dark:text-white"
                      >
                        <span className="text-lg leading-none">{c.flag}</span>
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-navy-400 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:text-white/70 dark:hover:bg-white/5"
      >
        <Globe size={16} />
        <span className="hidden sm:inline">Your Country</span>
      </button>

      {/* Rendered via a portal straight into <body>, deliberately outside
          the <header> DOM tree — <header> conditionally gets a
          backdrop-blur class on scroll, and backdrop-filter creates a new
          containing block for `position: fixed` descendants. Without this
          portal, the modal would silently re-anchor to the header's own
          80px-tall box instead of the real viewport the moment the page
          is scrolled — which was the exact "hides behind on scroll" bug. */}
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
