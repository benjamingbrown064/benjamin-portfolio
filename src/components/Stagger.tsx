"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type StaggerProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  /** Seconds between each child. */
  step?: number;
};

/** One scroll observer for a whole grid or list, instead of one per child. */
export function Stagger({ children, className, ariaLabel, step = 0.07 }: StaggerProps) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : step } },
  };

  return (
    <motion.div
      className={className}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={container}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
};

export function StaggerItem({ children, className, y = 14 }: StaggerItemProps) {
  const reduce = useReducedMotion();

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.3 : 0.8, ease: EASE },
    },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
