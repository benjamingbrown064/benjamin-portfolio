"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/90 backdrop-blur-[20px] border-b border-[#E8E8E3]"
            : "bg-transparent"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
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
                <li key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-[#666666] hover:text-black transition-colors duration-200 pb-1"
                  >
                    {link.label}
                  </Link>
                  {/* Underline — grows left to right */}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300 origin-left" />
                </li>
              ))}
            </ul>

            {/* CTA — desktop only */}
            <Link
              href="/#contact"
              className="hidden md:inline-flex items-center gap-2 font-sans text-xs font-medium tracking-[0.1em] uppercase bg-black text-white px-5 py-2.5 hover:bg-[#333333] transition-colors duration-200"
            >
              Get in Touch →
            </Link>

            {/* Mobile toggle — hidden on desktop */}
            <button
              className="flex flex-col gap-1.5 p-2 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-6 h-px bg-black transition-transform duration-300"
                style={{ transform: menuOpen ? "translateY(10px) rotate(45deg)" : "none" }}
              />
              <span
                className="block w-6 h-px bg-black transition-opacity duration-200"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-6 h-px bg-black transition-transform duration-300"
                style={{ transform: menuOpen ? "translateY(-10px) rotate(-45deg)" : "none" }}
              />
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-[#E8E8E3] md:hidden"
          >
            <div className="site-container py-8">
              <ul className="flex flex-col gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-sans text-sm font-medium tracking-[0.1em] uppercase text-black"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
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
