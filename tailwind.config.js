const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, "app/**/*.{js,ts,jsx,tsx,mdx}"),
    join(__dirname, "components/**/*.{js,ts,jsx,tsx,mdx}"),
    join(__dirname, "pages/**/*.{js,ts,jsx,tsx,mdx}"),
  ],
  theme: {
    extend: {
      colors: {
        base: "#080808",
        surface: "#0f0f0f",
        card: "#141414",
        "card-hover": "#191919",
        border: "#1c1c1c",
        "border-light": "#282828",
        "text-primary": "#ece8df",
        "text-secondary": "#8a8880",
        "text-muted": "#4a4945",
        summit: {
          DEFAULT: "#4a7a5c",
          light: "#5f9970",
          muted: "#2d4a38",
          glow: "#4a7a5c40",
        },
        "summit-amber": "#c8a96a",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
    },
  },
  plugins: [],
};
