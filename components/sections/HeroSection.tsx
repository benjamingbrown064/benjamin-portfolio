"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HeroSection() {
  const stats = [
    { value: "26+", label: "Projects Shipped" },
    { value: "16", label: "Years in Tech" },
    { value: "4", label: "Live Businesses" },
  ];

  return (
    <section
      id="hero"
      className="relative pt-32 md:pt-40 pb-0 overflow-hidden bg-white"
    >
      <div className="site-container">
        <SectionHeader number="001" tag="/INTRO" />

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — headline */}
          <div>
            <h1 className="font-serif font-black text-5xl md:text-7xl lg:text-8xl uppercase leading-none tracking-[-0.04em] text-black">
              Building<br />
              in the<br />
              Open.<br />
              <span className="italic">Shipping</span><br />
              for Real.
            </h1>

            {/* Stats row */}
            <div className="flex gap-8 mt-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-serif font-black text-3xl md:text-4xl text-black leading-none">
                    {s.value}
                  </p>
                  <p className="font-sans text-[10px] font-medium tracking-[0.12em] uppercase text-[#999999] mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — tagline + CTA */}
          <div className="flex flex-col justify-between lg:pt-16">
            <div>
              <p className="font-sans text-lg text-[#666666] leading-relaxed max-w-[400px]">
                Founder and builder behind One Beyond. 26+ products taken from
                concept to commercial deployment across automotive, legal,
                compliance, and AI operations.
              </p>
              <Link
                href="/#portfolio"
                className="inline-flex items-center gap-3 mt-8 font-sans text-sm font-medium tracking-[0.1em] uppercase text-black border-b-2 border-black pb-1 hover:border-[#999999] hover:text-[#666666] transition-all duration-300"
              >
                See the Work
                <span className="text-lg">→</span>
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="flex items-center gap-4 mt-16 lg:mt-0">
              <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-[#999999]">
                Scroll Down
              </span>
              <div className="w-px h-12 bg-[#E8E8E3]" />
            </div>
          </div>
        </div>
      </div>

      {/* Full-width hero image */}
      <div className="mt-16 md:mt-20 relative w-full h-[400px] md:h-[560px] lg:h-[640px] bg-[#F5F5F0] overflow-hidden">
        <Image
          src="/images/hero-placeholder.jpg"
          alt="Benjamin Brown — Founder, One Beyond"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          onError={() => {}}
        />
        {/* Fallback pattern when no image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-serif font-black text-8xl md:text-[180px] text-[#E8E8E3] uppercase tracking-[-0.04em] select-none">
            BB
          </p>
        </div>
      </div>
    </section>
  );
}
