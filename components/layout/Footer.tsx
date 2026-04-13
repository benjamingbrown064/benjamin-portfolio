"use client";

import Link from "next/link";
import { FOOTER_NAV, SOCIAL_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="site-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-dm-serif), 'Playfair Display', Georgia, serif",
                fontSize: "18px",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "#fff",
                fontWeight: 400,
              }}
            >
              Benjamin
            </span>
            <p className="mt-5 font-sans text-sm text-[#666666] max-w-[260px] leading-relaxed">
              Building technology businesses that generate real revenue in real markets.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="tag-label text-warm-600 mb-5">Navigation</p>
            <ul className="flex flex-col gap-3">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-warm-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="tag-label text-warm-600 mb-5">Connect</p>
            <ul className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-warm-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="font-sans text-sm text-warm-400 hover:text-white transition-colors duration-200"
                >
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-16 pt-8 border-t border-warm-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-sans text-xs text-[#666666]">
            © {year} Benjamin Brown / One Beyond. All rights reserved.
          </p>
          <p className="font-sans text-xs text-warm-700">
            Built in public. Shipped for real.
          </p>
        </div>
      </div>
    </footer>
  );
}
