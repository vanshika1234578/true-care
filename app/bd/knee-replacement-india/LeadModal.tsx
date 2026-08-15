"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ReportForm from "./ReportForm";
import type { Lang } from "./content";
import { content } from "./content";

export default function LeadModal({
  open,
  onClose,
  onSubmitSuccess,
  lang,
  whatsappNumber,
  onDetectBangladeshNumber,
}: {
  open: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
  lang: Lang;
  whatsappNumber: string;
  onDetectBangladeshNumber?: () => void;
}) {
  const t = content[lang];

  // Close on Escape key for accessibility.
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Prevent background scroll while the modal is open.
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-900/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t.reportForm.submit}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-glow dark:bg-surface-darkSoft sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-navy-300 transition-colors hover:bg-navy-50 hover:text-navy-500 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="max-h-[80vh] overflow-y-auto pr-1">
              <div className="mb-5 pr-8">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-primary-500">
                  {t.bdBadge}
                </p>
                <h2 className="text-balance font-display text-xl font-bold text-navy-500 dark:text-white sm:text-2xl">
                  {t.reports.title}
                </h2>
                <p className="mt-2 text-sm text-navy-300 dark:text-white/60">{t.reports.body}</p>
              </div>

              <ReportForm
                lang={lang}
                whatsappNumber={whatsappNumber}
                onDetectBangladeshNumber={onDetectBangladeshNumber}
                onSubmitSuccess={onSubmitSuccess}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
