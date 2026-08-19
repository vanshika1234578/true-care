"use client";

import { useEffect, useState } from "react";
import { getConsent, CONSENT_CHANGE_EVENT } from "@/lib/consent";

const WHATSAPP_NUMBER = "919720574548";
const DEFAULT_MESSAGE = "Hello, I'd like to know more about treatment in India.";

/**
 * Persistent floating WhatsApp action, visible on every page — matches the
 * always-on WhatsApp bubble pattern used by medical-travel reference sites.
 * Uses TrueCare's real WhatsApp Business number (already live in Footer.tsx).
 *
 * Shifts up while the cookie-consent bar is showing, since that bar's
 * Accept/Decline buttons sit in the same bottom-right corner on desktop —
 * without this the two would visually overlap.
 */
export default function FloatingWhatsApp() {
  const [cookieBarVisible, setCookieBarVisible] = useState(false);

  useEffect(() => {
    setCookieBarVisible(getConsent() === null);
    function onConsentChange() {
      setCookieBarVisible(false);
    }
    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with TrueCare on WhatsApp"
      className={`fixed right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-all hover:scale-110 sm:right-8 ${
        cookieBarVisible ? "bottom-28 sm:bottom-32" : "bottom-6 sm:bottom-8"
      }`}
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="white" aria-hidden="true">
        <path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.38 1.63 6.22L3.2 28.8l6.77-1.6a12.74 12.74 0 0 0 6.03 1.53h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.73-12.81-12.73Zm0 23.13h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02.95.96-3.92-.25-.4a10.33 10.33 0 0 1-1.6-5.5c0-5.85 4.76-10.6 10.61-10.6 2.83 0 5.49 1.1 7.49 3.11a10.53 10.53 0 0 1 3.1 7.5c.01 5.86-4.75 10.57-10.59 10.57Zm5.81-7.93c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.81 1.03-1 1.24-.18.21-.37.24-.68.08-1.85-.92-3.06-1.65-4.28-3.73-.32-.56.32-.52.92-1.72.1-.21.05-.39-.06-.55-.11-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54-.18-.01-.4-.01-.61-.01-.21 0-.55.08-.84.39-.29.32-1.11 1.09-1.11 2.65s1.14 3.07 1.3 3.28c.16.21 2.19 3.34 5.31 4.55 2.63 1.02 3.16.82 3.73.77.57-.05 1.85-.76 2.11-1.49.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  );
}
