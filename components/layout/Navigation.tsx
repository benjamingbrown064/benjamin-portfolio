"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/90 backdrop-blur-nav border-b border-warm-200"
            : "bg-transparent"
        )}
      >
        <div className="site-container">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Brand mark */}
            <Link href="/" className="flex items-center group">
              <span className="font-serif font-black text-sm uppercase tracking-tight text-black">
                ONE BEYOND
                <span className="text-[#FF4500]">.</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-warm-600 hover:text-black transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden md:block">
              <Link
                href="/#contact"
                className="font-sans text-xs font-medium tracking-[0.1em] uppercase bg-black text-white px-5 py-2.5 hover:bg-warm-700 transition-colors duration-200"
              >
                Get in Touch
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  "block w-6 h-px bg-black transition-transform duration-300",
                  menuOpen && "translate-y-2.5 rotate-45"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-px bg-black transition-opacity duration-300",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-px bg-black transition-transform duration-300",
                  menuOpen && "-translate-y-2.5 -rotate-45"
                )}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-warm-200 md:hidden"
          >
            <div className="site-container py-8">
              <ul className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-sans text-sm font-medium tracking-[0.1em] uppercase text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-block mt-8 font-sans text-xs font-medium tracking-[0.1em] uppercase bg-black text-white px-5 py-2.5"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
