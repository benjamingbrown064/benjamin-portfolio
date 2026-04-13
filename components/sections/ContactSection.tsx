"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 md:py-32 border-t border-[#333333] bg-black text-white"
    >
      <div className="site-container">
        <SectionHeader number="010" tag="/CONTACT" className="text-[#333333]" />

        <div className="max-w-[900px]">
          <h2 className="font-serif font-black text-5xl md:text-7xl lg:text-8xl uppercase leading-none tracking-[-0.04em] text-white mb-12">
            Ready to<br />
            Build Something<br />
            That Matters?
          </h2>

          <p className="font-sans text-lg text-[#666666] leading-relaxed max-w-[480px] mb-12">
            Serious builders only. If you have a real problem and a commitment to
            solving it properly, let&apos;s talk.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-16">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-3 font-sans text-sm font-medium tracking-[0.1em] uppercase bg-white text-black px-8 py-4 hover:bg-[#F5F5F0] transition-colors duration-200"
            >
              Get in Touch
              <span>→</span>
            </a>
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-3 font-sans text-sm font-medium tracking-[0.1em] uppercase border border-[#333333] text-white px-8 py-4 hover:border-white transition-colors duration-200"
            >
              View My Work
            </Link>
          </div>

          {/* Email + socials */}
          <div className="border-t border-[#222222] pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <a
              href={`mailto:${SITE.email}`}
              className="font-sans text-sm text-[#666666] hover:text-white transition-colors duration-200"
            >
              {SITE.email}
            </a>
            <div className="flex items-center gap-8">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-[#666666] hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
