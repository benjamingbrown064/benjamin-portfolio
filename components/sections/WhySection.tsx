"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";

const VALUE_CARDS = [
  {
    title: "Full-Stack Delivery",
    description:
      "From database schema to deployed product. No handoffs, no gaps, no translation layer between design and engineering.",
  },
  {
    title: "AI-Native Approach",
    description:
      "Intelligence embedded where it creates real leverage — not bolted on as a feature. LLM orchestration, RAG pipelines, structured outputs.",
  },
  {
    title: "Crafted With Precision",
    description:
      "Every component is built to be maintained, not just to pass a sprint. Architecture decisions that hold up at scale.",
  },
];

export function WhySection() {
  return (
    <section
      id="why"
      className="py-20 md:py-28 border-t border-[#E8E8E3]"
    >
      <div className="site-container">
        <SectionHeader number="003" tag="/VALUES" />

        <h2 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-[-0.03em] text-black leading-none mb-16">
          Why Work<br />With Us
        </h2>

        {/* Stats */}
        <div className="flex gap-16 mb-16 pb-16 border-b border-[#E8E8E3]">
          <div>
            <p className="font-serif font-black text-7xl md:text-8xl leading-none tracking-[-0.03em] text-black">
              12+
            </p>
            <p className="font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-[#999999] mt-2">
              Live Products
            </p>
          </div>
          <div>
            <p className="font-serif font-black text-7xl md:text-8xl leading-none tracking-[-0.03em] text-black">
              500+
            </p>
            <p className="font-sans text-[11px] font-medium tracking-[0.12em] uppercase text-[#999999] mt-2">
              Features Shipped
            </p>
          </div>
        </div>

        {/* Value cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUE_CARDS.map((card, i) => (
            <div key={card.title} className="border-t-2 border-black pt-6">
              <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-[#999999] block mb-4">
                0{i + 1}
              </span>
              <h3 className="font-serif font-bold text-xl uppercase tracking-[-0.02em] text-black mb-3">
                {card.title}
              </h3>
              <p className="font-sans text-sm text-[#666666] leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
