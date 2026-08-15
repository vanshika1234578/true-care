"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Variant = "fade-up" | "fade" | "scale" | "slide-left" | "slide-right";

const variants: Record<Variant, { initial: Record<string, number>; animate: Record<string, number> }> = {
  "fade-up": { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } },
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  scale: { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1 } },
  "slide-left": { initial: { opacity: 0, x: 32 }, animate: { opacity: 1, x: 0 } },
  "slide-right": { initial: { opacity: 0, x: -32 }, animate: { opacity: 1, x: 0 } },
};

export default function AnimatedSection({
  children,
  delay = 0,
  className = "",
  y,
  variant = "fade-up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  variant?: Variant;
}) {
  const v = variants[variant];
  const initial = y !== undefined && variant === "fade-up" ? { opacity: 0, y } : v.initial;

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={v.animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
