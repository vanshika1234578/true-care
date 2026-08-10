import AnimatedSection from "./AnimatedSection";

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
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-primary-300 via-teal-300 to-primary-100 dark:from-primary-500/50 dark:via-teal-500/40 dark:to-transparent" />
      <ol className="space-y-8">
        {steps.map((step, i) => (
          <AnimatedSection key={step.title} delay={i * 0.05}>
            <li className="relative flex gap-5 pl-0">
              <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary-500 bg-white text-sm font-bold text-primary-600 dark:bg-surface-dark dark:text-primary-300">
                {i + 1}
              </div>
              <div className="pt-1">
                <h3 className="font-display text-base font-semibold text-navy-500 dark:text-white">
                  {step.title}
                </h3>
                {!compact && (
                  <p className="mt-1 text-sm text-navy-300 dark:text-white/60">
                    {step.description}
                  </p>
                )}
              </div>
            </li>
          </AnimatedSection>
        ))}
      </ol>
    </div>
  );
}
