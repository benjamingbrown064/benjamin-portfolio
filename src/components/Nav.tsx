import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

type NavProps = {
  variant?: "home" | "case-study";
};

export function Nav({ variant = "home" }: NavProps) {
  const home = variant === "home";
  return (
    <nav className="topnav">
      <div className="nav-inner">
        <Link className="wordmark" href="/">
          BENJAMIN BROWN<span className="wordmark-dot" aria-hidden="true" />
        </Link>
        <div className="nav-center">
          <a href={home ? "#about" : "/#about"}>About</a>
          <a href={home ? "#work" : "/#work"}>Work</a>
          <a href={home ? "#services" : "/#services"}>Services</a>
          <a href={home ? "#process" : "/#process"}>Process</a>
          <a href={home ? "#faq" : "/#faq"}>FAQ</a>
        </div>
        <div className="nav-right">
          {home ? (
            <a className="pill ghost" href="#work">
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
            <Link className="pill ghost" href="/#work">
              ← All work
            </Link>
          )}
          <a className="pill dark" href={home ? "#contact" : "/#contact"}>
            Get in touch <span className="arr">→</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
