"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { getConsent, setConsent } from "@/lib/consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
  }, []);

  if (!visible) return null;

  const handleChoice = (value: "accepted" | "declined") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy-100/70 bg-white/95 p-4 shadow-glow backdrop-blur-sm dark:border-white/10 dark:bg-surface-darkSoft/95 sm:p-5">
      <div className="container-page flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-start gap-3">
          <Cookie size={20} className="mt-0.5 flex-shrink-0 text-primary-500" />
          <p className="text-sm text-navy-400 dark:text-white/70">
            We use cookies to understand how visitors use this site and improve your experience.
            See our{" "}
            <Link href="/privacy" className="font-medium text-primary-600 underline dark:text-primary-300">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            onClick={() => handleChoice("declined")}
            className="rounded-full border border-navy-100 px-4 py-2 text-sm font-semibold text-navy-500 transition-colors hover:border-navy-300 dark:border-white/10 dark:text-white/80"
          >
            Decline
          </button>
          <button
            onClick={() => handleChoice("accepted")}
            className="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-600"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
