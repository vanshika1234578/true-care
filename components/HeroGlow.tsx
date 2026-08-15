"use client";

import { motion } from "framer-motion";

/**
 * Soft, blurred, slowly-floating gradient orbs for hero sections — adds a
 * premium "living background" feel without being distracting. Purely
 * decorative; safe to drop into any relatively-positioned hero container.
 */
export default function HeroGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-300/30 blur-3xl dark:bg-primary-500/20"
        animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-16 top-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl dark:bg-teal-500/15"
        animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary-200/20 blur-3xl dark:bg-primary-400/10"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </div>
  );
}
