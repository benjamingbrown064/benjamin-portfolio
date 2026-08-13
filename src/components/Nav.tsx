"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Magnetic } from "./Magnetic";

type NavProps = {
  variant?: "home" | "case-study" | "subpage";
};

export function Nav({ variant = "home" }: NavProps) {
  const home = variant === "home";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setIsCondensed(window.scrollY > 80);
    // rAF rather than a direct call so the initial sync happens after paint
    // (covers reloading part-way down the page).
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  // Escape closes, and focus moves into the panel on open and back to the
  // trigger on close — otherwise keyboard users are dropped at the top of the
  // document with no way back.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      {/* Named so the header can be pinned during route transitions — a
          sliding header removes the user's only fixed spatial reference. */}
      <nav
        className={`topnav ${isCondensed ? "is-condensed" : ""}`.trim()}
        style={{ viewTransitionName: "site-header" }}
      >
        <div className="nav-inner">
          <Link className="wordmark" href="/" onClick={closeMenu}>
            BENJAMIN BROWN<span className="wordmark-dot" aria-hidden="true" />
          </Link>
          <div className="nav-center">
            <a href={home ? "#about" : "/#about"}>About</a>
            <a href={home ? "#work" : "/#work"}>Work</a>
            <a href={home ? "#services" : "/#services"}>Services</a>
            <a href={home ? "#process" : "/#process"}>Process</a>
            <Link href="/journal">Journal</Link>
          </div>
          <div className="nav-right">
            {home ? (
              <a className="pill accent" href="#work">
                Work
                <svg
                  className="nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
                  <path d="M9 7.5V5.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                  <path d="M3 12.5h18" />
                </svg>
              </a>
            ) : (
              <Link className="pill ghost" href="/">
                ← Home
              </Link>
            )}
            <Magnetic>
              <a className="pill dark" href={home ? "#contact" : "/#contact"}>
                Get in touch <span className="arr">→</span>
              </a>
            </Magnetic>
            <ThemeToggle />
            <button
              ref={triggerRef}
              type="button"
              className="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      {/* inert keeps the nine controls inside out of the tab order and the
          accessibility tree while the panel is invisible. */}
      <div
        id="mobile-menu"
        className={`mobile-menu-panel ${isMobileMenuOpen ? "is-open" : ""}`}
        inert={!isMobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="mobile-menu-panel-inner">
          <button
            ref={closeButtonRef}
            type="button"
            className="mobile-menu-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            Close
          </button>

          <div className="mobile-menu-links">
            <Link href="/" onClick={closeMenu}>Home</Link>
            <a href={home ? "#work" : "/#work"} onClick={closeMenu}>Work</a>
            <a href={home ? "#about" : "/#about"} onClick={closeMenu}>About</a>
            <Link href="/journal" onClick={closeMenu}>Journal</Link>
            <a href={home ? "#services" : "/#services"} onClick={closeMenu}>Services</a>
            <a href={home ? "#process" : "/#process"} onClick={closeMenu}>Process</a>
          </div>

          <div className="mobile-menu-actions">
            <a className="pill dark" href={home ? "#contact" : "/#contact"} onClick={closeMenu}>
              Say Hi <span className="arr">→</span>
            </a>
            <ThemeToggle />
          </div>

          <div className="mobile-menu-mark" aria-hidden="true">
            BB
          </div>
        </div>
      </div>
    </>
  );
}
