"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FlagMark } from "./marks";
import { ThemeToggle } from "./ThemeToggle";

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
      <nav
        id="top"
        className={`topnav ${isCondensed ? "is-condensed" : ""}`.trim()}
        style={{ viewTransitionName: "site-header" }}
      >
        <div className="nav-inner">
          <Link className="wordmark" href="/" onClick={closeMenu}>
            <FlagMark className="mark-sm" accent />
            Benjamin Brown
          </Link>
          <div className="nav-center">
            <a href={home ? "#flag" : "/#flag"}>Flag</a>
            <a href={home ? "#work" : "/#work"}>Work</a>
            <Link href="/journal">Journal</Link>
            <a href={home ? "#talk" : "/#talk"}>Talk</a>
          </div>
          <div className="nav-right">
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
            <Link href="/" onClick={closeMenu}>
              Home
            </Link>
            <a href={home ? "#flag" : "/#flag"} onClick={closeMenu}>
              Flag
            </a>
            <a href={home ? "#work" : "/#work"} onClick={closeMenu}>
              Work
            </a>
            <Link href="/journal" onClick={closeMenu}>
              Journal
            </Link>
            <a href={home ? "#talk" : "/#talk"} onClick={closeMenu}>
              Talk
            </a>
          </div>

          <div className="mobile-menu-actions">
            <ThemeToggle />
          </div>

          <div className="mobile-menu-mark" aria-hidden="true">
            <FlagMark className="mark-xl" />
          </div>
        </div>
      </div>
    </>
  );
}
