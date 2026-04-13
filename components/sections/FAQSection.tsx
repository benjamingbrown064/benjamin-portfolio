"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { FAQS } from "@/lib/constants";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 border-t border-[#E8E8E3]">
      <div className="site-container">
        <FadeInUp>
          <SectionHeader number="009" tag="/FAQ" />
        </FadeInUp>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
          <FadeInUp delay={0.1}>
            <h2 className="font-serif font-black text-4xl md:text-5xl uppercase tracking-[-0.03em] text-black leading-none">
              Common<br />Questions
            </h2>
          </FadeInUp>

          <StaggerContainer stagger={0.07} delay={0.2} className="divide-y divide-[#E8E8E3]">
            {FAQS.map((faq, i) => (
              <StaggerItem key={i}>
                <div className="py-6">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-start justify-between gap-6 text-left group"
                  >
                    <span className="font-serif font-bold text-lg md:text-xl uppercase tracking-[-0.02em] text-black group-hover:text-[#333333] transition-colors duration-200 leading-snug">
                      {faq.question}
                    </span>
                    <motion.span
                      className="font-sans text-xl text-[#999999] flex-shrink-0 mt-0.5"
                      animate={{ rotate: openIndex === i ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-sm text-[#666666] leading-relaxed pt-4 pr-8">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
