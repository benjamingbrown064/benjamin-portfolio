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
          BENJAMIN BROWN<sup>®</sup>
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
              Work ↗
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
