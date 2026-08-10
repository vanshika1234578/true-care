import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageCircle } from "lucide-react";
import Container from "./Container";

const columns = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/why-india", label: "Why India" },
      { href: "/patient-journey", label: "Patient Journey" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Care",
    links: [
      { href: "/treatments", label: "Treatments" },
      { href: "/hospitals", label: "Hospitals" },
      { href: "/doctors", label: "Doctors" },
      { href: "/patient-stories", label: "Patient Stories" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-navy-100/60 bg-surface-soft dark:border-white/10 dark:bg-surface-darkSoft">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center" aria-label="TrueCare home">
              <Image
                src="/logo.png"
                alt="TrueCare — Making Medical Travel Effortless"
                width={860}
                height={300}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-navy-300 dark:text-white/60">
              Making medical travel effortless — trusted guidance for patients seeking treatment in India.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-display text-sm font-semibold text-navy-500 dark:text-white">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-navy-300 hover:text-primary-600 dark:text-white/60 dark:hover:text-primary-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-display text-sm font-semibold text-navy-500 dark:text-white">
              Talk to us
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://wa.me/919720574548"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-navy-300 hover:text-primary-600 dark:text-white/60 dark:hover:text-primary-300"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:truecareonline24@gmail.com"
                  className="flex items-center gap-2 text-sm text-navy-300 hover:text-primary-600 dark:text-white/60 dark:hover:text-primary-300"
                >
                  <Mail size={16} /> truecareonline24@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919720574548"
                  className="flex items-center gap-2 text-sm text-navy-300 hover:text-primary-600 dark:text-white/60 dark:hover:text-primary-300"
                >
                  <Phone size={16} /> +91 97205 74548
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-100/60 pt-8 text-xs text-navy-300 sm:flex-row dark:border-white/10 dark:text-white/50">
          <p>© {new Date().getFullYear()} TrueCare. All rights reserved.</p>
          <p className="max-w-md text-center sm:text-right">
            TrueCare is an independent patient guidance service and is not a hospital, clinic, or medical provider.
          </p>
        </div>
      </Container>
    </footer>
  );
}
