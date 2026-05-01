"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

type AutoTypeTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  initialDelayMs?: number;
  charMs?: number;
};

export function AutoTypeText({
  text,
  className,
  as: Tag = "div",
  initialDelayMs = 250,
  charMs = 42,
}: AutoTypeTextProps) {
  const reduceMotion = useReducedMotion();
  const characters = useMemo(() => Array.from(text), [text]);
  const [visibleCount, setVisibleCount] = useState(reduceMotion ? characters.length : 0);

  useEffect(() => {
    if (reduceMotion) {
      setVisibleCount(characters.length);
      return;
    }

    setVisibleCount(0);

    let interval: number | undefined;
    const startTimer = window.setTimeout(() => {
      let index = 0;
      interval = window.setInterval(() => {
        index += 1;
        setVisibleCount(index);
        if (index >= characters.length && interval) {
          window.clearInterval(interval);
        }
      }, charMs);
    }, initialDelayMs);

    return () => {
      window.clearTimeout(startTimer);
      if (interval) window.clearInterval(interval);
    };
  }, [charMs, characters.length, initialDelayMs, reduceMotion]);

  const isComplete = visibleCount >= characters.length;

  return (
    <Tag className={`${className ?? ""} scroll-type`}>
      <span aria-hidden="true">
        {characters.map((character, index) => {
          const isVisible = index < visibleCount;
          const showCaret = !reduceMotion && index === Math.max(visibleCount - 1, 0) && !isComplete;

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
    </Tag>
  );
}
