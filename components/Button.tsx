import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  icon?: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold transition-all duration-300 rounded-full whitespace-nowrap";

const variants: Record<string, string> = {
  primary:
    "bg-primary-500 text-white shadow-glow hover:bg-primary-600 hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-white text-navy-500 border border-navy-100 hover:border-primary-300 hover:-translate-y-0.5 dark:bg-surface-darkSoft dark:text-white dark:border-white/10",
  ghost:
    "bg-transparent text-primary-600 hover:bg-primary-50 dark:text-primary-300 dark:hover:bg-white/5",
};

const sizes: Record<string, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

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

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
      {icon}
    </button>
  );
}
