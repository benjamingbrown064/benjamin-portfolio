import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — strictly monochrome + warm grays
        black: "#000000",
        white: "#FFFFFF",
        "warm-50": "#F5F5F0",
        "warm-100": "#EBEBЕ6",
        "warm-200": "#E8E8E3",
        "warm-300": "#D8D8D3",
        "warm-400": "#BFBFBA",
        "warm-500": "#999999",
        "warm-600": "#666666",
        "warm-700": "#333333",
        "warm-800": "#1A1A1A",
        "warm-900": "#0D0D0D",
        // Orange period — used ONLY in brand mark
        "ob-orange": "#FF4500",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["7rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "display-xl": ["5.5rem", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "display-lg": ["4rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "stat-xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "stat-lg": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.025em" }],
      },
      spacing: {
        "section-y": "120px",
        "section-y-sm": "80px",
        "section-y-lg": "160px",
      },
      maxWidth: {
        "prose-narrow": "540px",
        "prose-wide": "720px",
        site: "1400px",
      },
      letterSpacing: {
        "tightest": "-0.04em",
        "editorial": "0.08em",
        "label": "0.12em",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      backdropBlur: {
        nav: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
