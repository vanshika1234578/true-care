"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type FilterOption = { value: string; label: string };

/**
 * The one filter dropdown used everywhere a directory needs to filter by
 * location, specialty, or hospital — replaces native <select> elements
 * (which render inconsistently across browsers and always look like plain
 * form controls) with a custom dropdown matching the same visual language
 * as the header's CountrySwitcher / NavResourcesDropdown: pill trigger,
 * rounded-2xl white panel, shadow-glow, checkmark on the active option.
 *
 * Using one shared component for every filter bar on the site (doctors,
 * hospitals, treatments) is what makes them feel like the same product
 * instead of three different people's idea of a dropdown.
 */
export default function FilterDropdown({
  icon: Icon,
  label,
  value,
  options,
  onChange,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative flex-1" ref={ref}>
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-navy-300 dark:text-white/50">
        <Icon size={13} /> {label}
      </p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm font-medium text-navy-500 transition-colors hover:border-primary-300 dark:border-white/10 dark:bg-white/5 dark:text-white"
      >
        <span className="truncate">{selected?.label ?? "All"}</span>
        <ChevronDown size={16} className={`flex-none text-navy-300 transition-transform dark:text-white/40 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 z-20 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-navy-100/70 bg-white p-1.5 shadow-glow dark:border-white/10 dark:bg-surface-dark"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-navy-500 hover:bg-primary-50 dark:text-white/80 dark:hover:bg-white/5"
              >
                <span className="truncate">{option.label}</span>
                {option.value === value && <Check size={15} className="flex-none text-primary-500" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
