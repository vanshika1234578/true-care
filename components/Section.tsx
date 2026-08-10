import { ReactNode } from "react";
import Container from "./Container";

export default function Section({
  children,
  className = "",
  eyebrow,
  title,
  description,
  align = "center",
  id,
}: {
  children?: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "center" | "left";
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>
        {(eyebrow || title || description) && (
          <div
            className={`mb-12 max-w-2xl ${
              align === "center" ? "mx-auto text-center" : "text-left"
            }`}
          >
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-500">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-bold sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-balance text-navy-300 dark:text-white/60">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
