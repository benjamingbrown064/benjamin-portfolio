"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES, TECH_STACK } from "@/lib/constants";

export function ServicesSection() {
  // Duplicate stack for seamless loop
  const marqueeStack = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      id="services"
      className="py-20 md:py-28 border-t border-[#E8E8E3]"
    >
      <div className="site-container">
        <SectionHeader number="005" tag="/SERVICES" />

        <h2 className="font-serif font-black text-4xl md:text-5xl uppercase tracking-[-0.03em] text-black leading-none mb-16">
          What I Build
        </h2>

        {/* Services list */}
        <div className="divide-y divide-[#E8E8E3]">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="group py-8 grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-6 items-start"
            >
              <span className="font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-[#BFBFBA]">
                {service.number}
              </span>
              <h3 className="font-serif font-bold text-2xl md:text-3xl uppercase tracking-[-0.02em] text-black">
                {service.title}
              </h3>
              <p className="font-sans text-sm text-[#666666] leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech marquee */}
      <div className="mt-16 border-t border-b border-[#E8E8E3] py-4 overflow-hidden">
        <div className="marquee">
          {marqueeStack.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex-shrink-0 font-sans text-xs font-medium tracking-[0.1em] uppercase text-[#999999] mx-8"
            >
              {tech}
              <span className="ml-8 text-[#E8E8E3]">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
