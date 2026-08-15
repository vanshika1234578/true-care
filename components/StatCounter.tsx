import AnimatedSection from "./AnimatedSection";
import AnimatedCounter from "./AnimatedCounter";

export default function StatCounter({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <AnimatedSection delay={delay} className="text-center">
      <p className="font-display text-3xl font-bold text-primary-600 sm:text-4xl dark:text-primary-300">
        <AnimatedCounter value={value} />
      </p>
      <p className="mt-2 text-sm text-navy-300 dark:text-white/60">{label}</p>
    </AnimatedSection>
  );
}
