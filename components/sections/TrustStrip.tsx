"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";

export function TrustStrip() {
  const logos = [
    "One Beyond",
    "Love Warranty",
    "The DMS",
    "WilboLaw",
    "HatSafe",
    "Zebi",
  ];

  return (
    <section
      id="trust"
      className="py-20 md:py-24 border-t border-[#E8E8E3]"
    >
      <div className="site-container">
        <SectionHeader number="001" tag="/PARTNER" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — bold claim */}
          <div>
            <h2 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-none tracking-[-0.03em] text-black">
              26 Projects.<br />
              4 Industries.<br />
              All Shipped.
            </h2>
          </div>

          {/* Right — stat + logos */}
          <div>
            <div className="mb-10">
              <p className="font-serif font-black text-7xl md:text-8xl leading-none tracking-[-0.03em] text-black">
                £1M<span className="text-5xl md:text-6xl">+</span>
              </p>
              <p className="font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-[#999999] mt-2">
                Revenue Per Business in Year One
              </p>
            </div>

            {/* Logo grid */}
            <div className="flex flex-wrap gap-3">
              {logos.map((logo) => (
                <span
                  key={logo}
                  className="inline-flex items-center px-4 py-2 border border-[#E8E8E3] font-sans text-xs font-medium tracking-[0.06em] uppercase text-[#666666]"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
