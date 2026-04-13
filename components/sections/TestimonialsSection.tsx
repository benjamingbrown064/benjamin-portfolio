"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInUp } from "@/components/ui/MotionWrapper";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-20 md:py-28 border-t border-[#333333] bg-black text-white">
      <div className="site-container">
        <FadeInUp>
          <SectionHeader number="008" tag="/TESTIMONIAL" className="text-[#333333]" />
        </FadeInUp>

        <div className="max-w-[800px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif font-black text-2xl md:text-3xl lg:text-4xl uppercase leading-tight tracking-[-0.02em] text-white mb-12"
            >
              &ldquo;{TESTIMONIALS[current].quote}&rdquo;
            </motion.blockquote>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`attr-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-6"
            >
              <div className="w-12 h-12 rounded-full bg-[#222222] flex items-center justify-center flex-shrink-0">
                <span className="font-serif font-black text-lg text-[#444444]">
                  {TESTIMONIALS[current].author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-white">
                  {TESTIMONIALS[current].author}
                </p>
                <p className="font-sans text-xs text-[#666666]">{TESTIMONIALS[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-px transition-all duration-300 ${
                i === current ? "bg-white w-10" : "bg-[#333333] w-6"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="font-sans text-sm text-[#666666] hover:text-white transition-colors duration-200"
            >
              ←
            </button>
            <button
              onClick={() => setCurrent((p) => (p + 1) % TESTIMONIALS.length)}
              className="font-sans text-sm text-[#666666] hover:text-white transition-colors duration-200"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
