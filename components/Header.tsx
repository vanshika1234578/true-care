"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, MessageCircle } from "lucide-react";
import Container from "./Container";
import Button from "./Button";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/treatments", label: "Treatments" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/doctors", label: "Doctors" },
  { href: "/find-doctor", label: "Find a Doctor" },
  { href: "/why-india", label: "Why India" },
  { href: "/patient-journey", label: "Patient Journey" },
  { href: "/patient-stories", label: "Patient Stories" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open, and allow ESC to close it.
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-soft dark:bg-surface-dark/80"
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="TrueCare home">
          <Image
            src="/logo.png"
            alt="TrueCare — Making Medical Travel Effortless"
            width={860}
            height={300}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-white/5 ${
                  isActive ? "text-primary-600" : "text-navy-400 dark:text-white/70"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="rounded-full p-2 text-navy-400 hover:bg-navy-50 dark:text-white/70 dark:hover:bg-white/5"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <Button href="/contact" size="md" icon={<MessageCircle size={16} />}>
            Book Free Consultation
          </Button>
        </div>

        <button
          aria-label="Open menu"
          className="rounded-full p-2 text-navy-500 lg:hidden dark:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-navy-100/60 bg-white lg:hidden dark:border-white/10 dark:bg-surface-dark"
          >
            <motion.div
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              initial="hidden"
              animate="show"
              className="px-5 py-6"
            >
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-navy-500 hover:bg-primary-50 dark:text-white/80 dark:hover:bg-white/5"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.25 }}
                >
                  <Link
                    href="/contact"
                    className="block rounded-lg px-3 py-3 text-base font-medium text-navy-500 hover:bg-primary-50 dark:text-white/80 dark:hover:bg-white/5"
                  >
                    Contact
                  </Link>
                </motion.div>
              </nav>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.25 }}
                className="mt-4 flex items-center gap-3"
              >
                <button
                  aria-label="Toggle dark mode"
                  onClick={toggleTheme}
                  className="rounded-full border border-navy-100 p-2.5 text-navy-400 dark:border-white/10 dark:text-white/70"
                >
                  {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                </button>
                <Button href="/contact" className="flex-1">
                  Book Free Consultation
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
