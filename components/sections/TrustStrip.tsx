"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { CountUp } from "@/components/ui/CountUp";

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
    <section id="trust" className="py-20 md:py-24 border-t border-[#E8E8E3]">
      <div className="site-container">
        <FadeInUp>
          <SectionHeader number="001" tag="/PARTNER" />
        </FadeInUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeInUp delay={0.1}>
            <h2 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-none tracking-[-0.03em] text-black">
              26 Projects.<br />
              4 Industries.<br />
              All Shipped.
            </h2>
          </FadeInUp>

          <div>
            <FadeInUp delay={0.15}>
              <div className="mb-10">
                <p className="font-serif font-black text-7xl md:text-8xl leading-none tracking-[-0.03em] text-black">
                  £<CountUp target={1} suffix="M+" duration={1200} />
                </p>
                <p className="font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-[#999999] mt-2">
                  Revenue Per Business in Year One
                </p>
              </div>
            </FadeInUp>

            <StaggerContainer stagger={0.08} delay={0.2} className="flex flex-wrap gap-3">
              {logos.map((logo) => (
                <StaggerItem key={logo}>
                  <span className="inline-flex items-center px-4 py-2 border border-[#E8E8E3] font-sans text-xs font-medium tracking-[0.06em] uppercase text-[#666666]">
                    {logo}
                  </span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
