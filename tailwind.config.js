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
        border: "#1e1e1e",
        "border-light": "#2a2a2a",
        "text-primary": "#ede9e0",
        "text-secondary": "#9a9690",
        "text-muted": "#52504b",
        summit: {
          DEFAULT: "#4a7a5c",
          light: "#62a876",
          muted: "#2d4a38",
          glow: "#4a7a5c40",
        },
        "summit-amber": "#d4a96a",
        "summit-gold": "#c8943a",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "ui-serif", "serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "0.94", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-summit": "linear-gradient(135deg, #4a7a5c 0%, #2d4a38 100%)",
        "gradient-mountain": "linear-gradient(180deg, transparent 0%, rgba(8,8,8,0.7) 60%, #080808 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.7s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
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
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
