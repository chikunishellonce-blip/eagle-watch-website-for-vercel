import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#101415",
        "ink-light": "#FFFFFF",
        charcoal: "#1B2424",
        panel: "#F7F5EF",
        steel: "#68716D",
        "steel-light": "#BBC2BC",
        navy: "#1D2929",
        "navy-light": "#33403E",
        signal: "#D88932",
        "signal-dim": "#B96B1D",
        gold: "#D88932",
        "gold-dark": "#B96B1D",
        paper: "#FBFAF6",
        "paper-dim": "#F0EEE7",
        line: "rgba(255,255,255,0.16)",
        "line-dark": "rgba(16,20,21,0.12)",
      },
      fontFamily: {
        display: ["Avenir Next", "Trebuchet MS", "sans-serif"],
        body: ["DM Sans", "Segoe UI", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "monospace"],
      },
      maxWidth: {
        wrap: "1180px",
      },
      transitionTimingFunction: {
        eagle: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
