"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion, useScroll } from "framer-motion";

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
  const characters = useMemo(() => Array.from(text), [text]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.94", "end 0.34"],
  });

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    const unsubscribe = scrollYProgress.on("change", (value) => {
      setProgress((current) => Math.max(current, value));
    });

    return unsubscribe;
  }, [reduceMotion, scrollYProgress]);

  const visibleCount = reduceMotion
    ? characters.length
    : Math.round(clamp(progress, 0, 1) * characters.length);

  return (
    <p ref={ref} className={`${className ?? ""} scroll-type`}>
      <span aria-hidden="true">
        {characters.map((character, index) => {
          const isVisible = index < visibleCount;
          const showCaret = !reduceMotion && index === Math.max(visibleCount - 1, 0) && visibleCount < characters.length;

          return (
            <span
              key={`${character}-${index}`}
              className={`scroll-type-char ${isVisible ? "is-visible" : "is-hidden"} ${showCaret ? "has-caret" : ""}`}
            >
              {character}
            </span>
          );
        })}
      </span>
      <span className="sr-only">{text}</span>
    </p>
  );
}
