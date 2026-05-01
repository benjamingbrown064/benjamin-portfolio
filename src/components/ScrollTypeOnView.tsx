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
    offset: ["start 0.84", "end 0.28"],
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

  const visibleCount = reduceMotion
    ? characters.length
    : Math.round(clamp(progress, 0, 1) * characters.length);
  const visibleText = characters.slice(0, visibleCount).join("");
  const isComplete = visibleCount >= characters.length;

  return (
    <p ref={ref} className={`${className ?? ""} scroll-type`}>
      <span className="scroll-type-ghost" aria-hidden="true">
        {text}
      </span>
      <span className="scroll-type-live" aria-hidden="true">
        {visibleText}
        {!isComplete ? <span className="scroll-type-caret" /> : null}
      </span>
      <span className="sr-only">{text}</span>
    </p>
  );
}
