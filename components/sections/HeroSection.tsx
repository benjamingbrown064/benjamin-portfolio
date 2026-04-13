"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeInUp } from "@/components/ui/MotionWrapper";
import { easeExpoOut } from "@/lib/animations";

const HEADLINE_LINES = ["Building", "in the", "Open.", "Shipping", "for Real."];

const stats = [
  { value: 26, suffix: "+", label: "Projects Shipped" },
  { value: 16, suffix: "", label: "Years in Tech" },
  { value: 4, suffix: "", label: "Live Businesses" },
];

export function HeroSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative pt-32 md:pt-40 pb-0 overflow-hidden bg-white"
    >
      <div className="site-container">
        <FadeInUp>
          <SectionHeader number="001" tag="/INTRO" />
        </FadeInUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — headline word-by-word */}
          <div>
            <h1 className="font-serif font-black text-5xl md:text-7xl lg:text-8xl uppercase leading-none tracking-[-0.04em] text-black overflow-hidden">
              {HEADLINE_LINES.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={shouldReduce ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + i * 0.09,
                      ease: easeExpoOut,
                    }}
                  >
                    {i === 3 ? <em className="italic not-italic font-black">{line}</em> : line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Stats row */}
            <motion.div
              className="flex gap-8 mt-10"
              initial={shouldReduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-serif font-black text-3xl md:text-4xl text-black leading-none">
                    {s.value}{s.suffix}
                  </p>
                  <p className="font-sans text-[10px] font-medium tracking-[0.12em] uppercase text-[#999999] mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — tagline + CTA */}
          <motion.div
            className="flex flex-col justify-between lg:pt-16"
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          >
            <div>
              <p className="font-sans text-lg text-[#666666] leading-relaxed max-w-[400px]">
                Founder and builder behind One Beyond. 26+ products taken from
                concept to commercial deployment across automotive, legal,
                compliance, and AI operations.
              </p>
              <Link
                href="/#portfolio"
                className="group inline-flex items-center gap-3 mt-8 font-sans text-sm font-medium tracking-[0.1em] uppercase text-black border-b-2 border-black pb-1 hover:border-[#999999] hover:text-[#666666] transition-all duration-300"
              >
                See the Work
                <motion.span
                  className="text-lg"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </Link>
            </div>

            <motion.div
              className="flex items-center gap-4 mt-16 lg:mt-0"
              initial={shouldReduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-[#999999]">
                Scroll Down
              </span>
              <motion.div
                className="w-px bg-[#E8E8E3]"
                initial={{ height: 0 }}
                animate={{ height: 48 }}
                transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Full-width hero image */}
      <motion.div
        className="mt-16 md:mt-20 overflow-hidden relative w-full h-[400px] md:h-[560px] lg:h-[640px] bg-[#D8D8D3]"
        initial={shouldReduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/images/hero-placeholder.jpg"
          alt="Benjamin Brown — Founder, One Beyond"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
      </motion.div>
    </section>
  );
}
