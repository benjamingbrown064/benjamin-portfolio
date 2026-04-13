"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { PROCESS_STEPS } from "@/lib/constants";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="py-20 md:py-28 border-t border-[#E8E8E3] bg-black text-white"
    >
      <div className="site-container">
        <SectionHeader
          number="006"
          tag="/PROCESS"
          className="text-[#333333]"
        />

        <h2 className="font-serif font-black text-4xl md:text-5xl uppercase tracking-[-0.03em] text-white leading-none mb-16">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.number} className="border-t border-[#333333] pt-6">
              {/* Large number */}
              <span className="font-serif font-black text-7xl md:text-8xl leading-none tracking-[-0.04em] text-[#222222] block mb-6">
                {step.number}
              </span>
              <h3 className="font-serif font-bold text-xl uppercase tracking-[-0.02em] text-white mb-3">
                {step.title}
              </h3>
              <p className="font-sans text-sm text-[#666666] leading-relaxed">
                {step.description}
              </p>

              {/* Arrow connector (not last) */}
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 text-[#333333] text-lg">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
