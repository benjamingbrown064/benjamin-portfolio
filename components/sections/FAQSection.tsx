"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQS } from "@/lib/constants";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-20 md:py-28 border-t border-[#E8E8E3]"
    >
      <div className="site-container">
        <SectionHeader number="009" tag="/FAQ" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
          <div>
            <h2 className="font-serif font-black text-4xl md:text-5xl uppercase tracking-[-0.03em] text-black leading-none">
              Common<br />Questions
            </h2>
          </div>

          <div className="divide-y divide-[#E8E8E3]">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-6">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-start justify-between gap-6 text-left group"
                >
                  <span className="font-serif font-bold text-lg md:text-xl uppercase tracking-[-0.02em] text-black group-hover:text-[#333333] transition-colors duration-200 leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`font-sans text-xl text-[#999999] flex-shrink-0 mt-0.5 transition-transform duration-300 ${
                      openIndex === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${
                    openIndex === i ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                  style={{
                    transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
                  }}
                >
                  <p className="font-sans text-sm text-[#666666] leading-relaxed pr-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
