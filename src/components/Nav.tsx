"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

type NavProps = {
  variant?: "home" | "case-study" | "subpage";
};

export function Nav({ variant = "home" }: NavProps) {
  const home = variant === "home";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="topnav">
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
            <a className="pill dark" href={home ? "#contact" : "/#contact"}>
              Get in touch <span className="arr">→</span>
            </a>
            <ThemeToggle />
            <button
              type="button"
              className="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu-panel ${isMobileMenuOpen ? "is-open" : ""}`}>
        <div className="mobile-menu-panel-inner">
          <button
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
