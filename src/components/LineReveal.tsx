"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type LineRevealProps = {
  /** One entry per visual line. Keep each within the heading's max-width so it
   *  lands on a single line — a wrapped entry still animates, just as one block. */
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function LineReveal({
  lines,
  as = "h2",
  className,
  delay = 0,
}: LineRevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { delayChildren: delay, staggerChildren: reduce ? 0 : 0.075 },
    },
  };

  const line: Variants = {
    hidden: { y: reduce ? 0 : "120%", opacity: reduce ? 0 : 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: reduce ? 0.3 : 0.9, ease: EASE },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={container}
    >
      {lines.map((text, i) => (
        <span className="line-mask" key={i}>
          <motion.span className="line-inner" variants={line}>
            {/* Trailing space keeps copy-paste and screen readers from running
                the lines together — it collapses visually at the line end. */}
            {i < lines.length - 1 ? `${text} ` : text}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
