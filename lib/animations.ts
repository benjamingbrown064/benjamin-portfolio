import { Variants } from "framer-motion";

// ─── Core easing ─────────────────────────────────────────────────────────────
export const easeExpoOut = [0.16, 1, 0.3, 1] as const;
export const easeExpoInOut = [0.87, 0, 0.13, 1] as const;

// ─── fadeInUp — primary scroll-reveal ────────────────────────────────────────
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeExpoOut,
    },
  },
};

// ─── fadeIn — simple opacity reveal ──────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// ─── staggerChildren — wraps lists / grids ────────────────────────────────────
export const staggerChildren = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

// ─── clipReveal — image / panel wipe from bottom ──────────────────────────────
export const clipReveal: Variants = {
  hidden: {
    clipPath: "inset(100% 0% 0% 0%)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: easeExpoOut,
    },
  },
};

// ─── slideInLeft ─────────────────────────────────────────────────────────────
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easeExpoOut,
    },
  },
};

// ─── slideInRight ────────────────────────────────────────────────────────────
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: easeExpoOut,
    },
  },
};

// ─── scaleIn — subtle scale up ───────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeExpoOut,
    },
  },
};

// ─── heroWordReveal — word-by-word animation ──────────────────────────────────
export const heroWordReveal: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: easeExpoOut,
    },
  },
};

// ─── pageTransition — route change ───────────────────────────────────────────
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeExpoOut,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// ─── Shared viewport settings (once-only reveals) ────────────────────────────
export const viewportOnce = { once: true, margin: "-80px" };
