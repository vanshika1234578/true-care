"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RESOURCE_LINKS = [
  { href: "/find-doctor", label: "Find a Doctor", description: "AI-assisted specialist matching" },
  { href: "/patient-journey", label: "Patient Journey", description: "What to expect, step by step" },
  { href: "/patient-stories", label: "Patient Stories", description: "Real outcomes from real patients" },
  { href: "/blog", label: "Blog", description: "Guidance and treatment explainers" },
];

/**
 * Groups secondary/informational pages under one "Resources" nav item
 * instead of listing every page individually at the top level — 9 flat
 * links was crowding the header (and overflowing at common laptop widths).
 * Grouping related content is also just better information architecture.
 */
export default function NavResourcesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-navy-400 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:text-white/70 dark:hover:bg-white/5"
      >
        Resources
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-navy-100/70 bg-white p-2 shadow-glow dark:border-white/10 dark:bg-surface-dark"
          >
            {RESOURCE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 hover:bg-primary-50 dark:hover:bg-white/5"
              >
                <p className="text-sm font-semibold text-navy-500 dark:text-white">{link.label}</p>
                <p className="text-xs text-navy-300 dark:text-white/50">{link.description}</p>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
