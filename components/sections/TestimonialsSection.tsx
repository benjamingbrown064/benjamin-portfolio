"use client";

import { useState, useEffect } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 border-t border-[#333333] bg-black text-white"
    >
      <div className="site-container">
        <SectionHeader number="008" tag="/TESTIMONIAL" className="text-[#333333]" />

        <div className="max-w-[800px]">
          {/* Quote */}
          <blockquote className="font-serif font-black text-2xl md:text-3xl lg:text-4xl uppercase leading-tight tracking-[-0.02em] text-white mb-12">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          {/* Attribution */}
          <div className="flex items-center gap-6">
            {/* Avatar placeholder */}
            <div className="w-12 h-12 rounded-full bg-[#222222] flex items-center justify-center flex-shrink-0">
              <span className="font-serif font-black text-lg text-[#444444]">
                {t.author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-sans text-sm font-medium text-white">
                {t.author}
              </p>
              <p className="font-sans text-xs text-[#666666]">{t.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center gap-3 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-8 h-px transition-all duration-300 ${
                i === current ? "bg-white" : "bg-[#333333]"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}

          {/* Arrow controls */}
          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() =>
                setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
              }
              className="font-sans text-sm text-[#666666] hover:text-white transition-colors duration-200"
            >
              ←
            </button>
            <button
              onClick={() =>
                setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)
              }
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
