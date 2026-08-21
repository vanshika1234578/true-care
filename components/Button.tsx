"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  icon?: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold transition-colors duration-300 rounded-full whitespace-nowrap";

const variants: Record<string, string> = {
  primary: "bg-primary-500 text-white shadow-glow hover:bg-primary-600",
  secondary:
    "bg-white text-navy-500 border border-navy-100 hover:border-primary-300 dark:bg-surface-darkSoft dark:text-white dark:border-white/10",
  ghost: "bg-transparent text-primary-600 hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-white/5",
  // Reserved for the single primary conversion action on a page (e.g. the
  // WhatsApp CTA) — not a general-purpose button color. Using it everywhere
  // "primary" is used today would defeat the point of it standing out.
  accent: "bg-accent-500 text-white shadow-glow hover:bg-accent-600",
};

const sizes: Record<string, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const MotionLink = motion.create(Link);

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  icon,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.97, y: 0 },
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
  };

  if (href) {
    return (
      <MotionLink href={href} className={classes} onClick={onClick} {...motionProps}>
        {children}
        {icon}
      </MotionLink>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps}>
      {children}
      {icon}
    </motion.button>
  );
}
