"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

type CountUpProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  /** Zero-pad to this width, e.g. pad={2} renders 5 as "05". */
  pad?: number;
  durationMs?: number;
};

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function CountUp({
  to,
  prefix = "",
  suffix = "",
  pad = 0,
  durationMs = 1600,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  // Seeded with the final value so the server-rendered HTML carries the real
  // figure — these are credibility numbers and a crawler must not read "0".
  const count = useMotionValue(to);
  const text = useTransform(count, (v) => {
    const n = Math.round(v);
    return prefix + (pad ? String(n).padStart(pad, "0") : String(n)) + suffix;
  });

  // Rewind before first paint, so there is no flash of the final value.
  useIsoLayoutEffect(() => {
    if (!reduce) count.set(0);
  }, [reduce, count]);

  useEffect(() => {
    if (reduce) {
      count.set(to);
      return;
    }
    if (!inView) return;
    const controls = animate(count, to, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, reduce, count, to, durationMs]);

  return <motion.span ref={ref}>{text}</motion.span>;
}
