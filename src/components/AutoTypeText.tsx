"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type AutoTypeTextProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  initialDelayMs?: number;
  charMs?: number;
  startWhenInView?: boolean;
  rootMargin?: string;
};

export function AutoTypeText({
  text,
  className,
  as: Tag = "div",
  initialDelayMs = 250,
  charMs = 42,
  startWhenInView = false,
  rootMargin = "0px 0px -10% 0px",
}: AutoTypeTextProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const characters = useMemo(() => Array.from(text), [text]);
  const [visibleCount, setVisibleCount] = useState(reduceMotion ? characters.length : 0);
  const [shouldStart, setShouldStart] = useState(!startWhenInView || reduceMotion);

  useEffect(() => {
    if (!startWhenInView || reduceMotion) {
      setShouldStart(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldStart(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion, rootMargin, startWhenInView]);

  useEffect(() => {
    if (reduceMotion) {
      setVisibleCount(characters.length);
      return;
    }

    if (!shouldStart) {
      setVisibleCount(0);
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
  }, [charMs, characters.length, initialDelayMs, reduceMotion, shouldStart]);

  const isComplete = visibleCount >= characters.length;

  return (
    <div ref={ref}>
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
    </div>
  );
}
