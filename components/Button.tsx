"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "accent" | "whatsapp";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  icon?: ReactNode;
  // Use target="_blank" for external links (e.g. wa.me) so the current page
  // never navigates away — this keeps any conversion-tracking ping tied to
  // the click safe from being cut off mid-flight by the navigation.
  target?: "_blank";
};

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold transition-colors duration-300 rounded-full whitespace-nowrap";

const variants: Record<string, string> = {
  primary: "bg-primary-500 text-white shadow-glow hover:bg-primary-600",
  secondary:
    "bg-white text-navy-500 border border-navy-100 hover:border-primary-300 dark:bg-surface-darkSoft dark:text-white dark:border-white/10",
  ghost: "bg-transparent text-primary-600 hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-white/5",
  // Reserved for the single primary conversion action on a page — not a
  // general-purpose button color. Using it everywhere "primary" is used
  // today would defeat the point of it standing out.
  accent: "bg-accent-500 text-white shadow-glow hover:bg-accent-600",
  // WhatsApp's own brand green — matches the color used by
  // FloatingWhatsApp.tsx (bg-[#25D366]) so every WhatsApp entry point on
  // the site reads as the same action instead of the CTA looking like a
  // plain secondary/outline button next to it.
  whatsapp: "bg-[#25D366] text-white shadow-glow hover:bg-[#20bd5a]",
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
  target,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.97, y: 0 },
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
  };

  if (href) {
    return (
      <MotionLink
        href={href}
        className={classes}
        onClick={onClick}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        {...motionProps}
      >
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
