"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * Parses strings like "40+", "15+ yrs", "30+" into a leading number + suffix
 * so the number can count up. Range values like "60–80%" (contains an en-dash
 * or hyphen between two numbers) are deliberately left alone — counting up to
 * a range doesn't read naturally, so those are rendered as static text.
 */
function parseCountable(value: string): { number: number; suffix: string } | null {
  const isRange = /\d\s*[–-]\s*\d/.test(value);
  if (isRange) return null;

  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return null;

  return { number: parseInt(match[1], 10), suffix: match[2] };
}

export default function AnimatedCounter({ value }: { value: string }) {
  const parsed = parseCountable(value);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1.4, bounce: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView && parsed) {
      motionValue.set(parsed.number);
    }
  }, [isInView, parsed, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [spring]);

  if (!parsed) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {displayValue}
      {parsed.suffix}
    </span>
  );
}
