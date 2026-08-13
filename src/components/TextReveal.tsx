"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type TextRevealProps = {
  /** Rendered as plain text with <br /> between entries — the heading animates
   *  as a single block, so these only control where lines break. */
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A heading settles into place: it resolves out of a soft blur while rising a
 * few pixels. Deliberately not a per-line mask slide — staggered lines sliding
 * up from their baseline announce themselves, and the movement is the part
 * that reads as dated. Here nothing travels far enough to be watched; the eye
 * registers the text sharpening, not a transition playing.
 */
export function TextReveal({
  lines,
  as = "h2",
  className,
  delay = 0,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 8,
      filter: reduce ? "blur(0px)" : "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: reduce ? 0.3 : 0.85, delay, ease: EASE },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={variants}
    >
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </MotionTag>
  );
}
