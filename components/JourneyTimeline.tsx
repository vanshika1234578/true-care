"use client";

import { motion } from "framer-motion";

type Step = { title: string; description: string };

export default function JourneyTimeline({
  steps,
  compact = false,
}: {
  steps: Step[];
  compact?: boolean;
}) {
  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Static faint track, always visible */}
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-navy-100 dark:bg-white/10" />
      {/* Animated fill that progresses as the section scrolls into view */}
      <motion.div
        className="absolute left-[19px] top-2 w-px origin-top bg-gradient-to-b from-primary-400 via-teal-400 to-primary-300 dark:from-primary-500 dark:via-teal-500 dark:to-primary-500/60"
        style={{ bottom: 8 }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: Math.min(0.5 + steps.length * 0.15, 1.6), ease: [0.22, 1, 0.36, 1] }}
      />
      <ol className="space-y-8">
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            className="relative flex gap-5 pl-0"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 bg-white text-sm font-bold dark:bg-surface-dark"
              initial={{ scale: 0.7, borderColor: "rgb(203 213 225)", color: "rgb(148 163 184)" }}
              whileInView={{ scale: 1, borderColor: "rgb(47 111 228)", color: "rgb(47 111 228)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.12 + 0.1, type: "spring", stiffness: 260, damping: 20 }}
            >
              {i + 1}
            </motion.div>
            <div className="pt-1">
              <h3 className="font-display text-base font-semibold text-navy-500 dark:text-white">
                {step.title}
              </h3>
              {!compact && (
                <p className="mt-1 text-sm text-navy-300 dark:text-white/60">{step.description}</p>
              )}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
