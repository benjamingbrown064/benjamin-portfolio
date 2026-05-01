"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";

type ScrollTypeOnViewProps = {
  text: string;
  className?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ScrollTypeOnView({ text, className }: ScrollTypeOnViewProps) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(reduceMotion ? 1 : 0);
  const characters = Array.from(text);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.84", "end 0.3"],
  });

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    const unsubscribe = scrollYProgress.on("change", (value) => {
      setProgress(value);
    });

    return unsubscribe;
  }, [reduceMotion, scrollYProgress]);

  return (
    <p ref={ref} className={className}>
      {characters.map((character, index) => {
        const start = (index / Math.max(characters.length - 1, 1)) * 0.82;
        const end = Math.min(start + 0.16, 1);
        const charProgress = reduceMotion ? 1 : clamp((progress - start) / Math.max(end - start, 0.001), 0, 1);
        const opacity = 0.18 + charProgress * 0.82;
        const blur = (1 - charProgress) * 6;
        const translateY = (1 - charProgress) * 0.42;

        return (
          <motion.span
            key={`${character}-${index}`}
            className="scroll-type-char"
            aria-hidden="true"
            style={{
              opacity,
              filter: `blur(${blur}px)`,
              transform: `translate3d(0, ${translateY}em, 0)`,
            }}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        );
      })}
      <span className="sr-only">{text}</span>
    </p>
  );
}
