"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Scroll-linked parallax on the hero portrait. The inner layer is scaled up
 *  slightly so it can drift without exposing an edge inside the frame. */
export function HeroPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-4.5%", "4.5%"]);

  return (
    <div className="hero-photo" ref={ref} aria-label="Editorial portrait of Benjamin Brown">
      <motion.div
        className="hero-photo-layer"
        style={reduce ? undefined : { y, scale: 1.12 }}
      >
        <Image
          src="/assets/ben-portrait.jpg"
          alt="Benjamin Brown — portrait"
          fill
          sizes="(min-width: 1280px) 1200px, 100vw"
          priority
          className="portrait"
          style={{ objectFit: "cover", objectPosition: "center 45%" }}
        />
      </motion.div>
      <span className="cap">Portrait — Costa Mesa, CA · 2026</span>
    </div>
  );
}
