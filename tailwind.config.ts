import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        "ink-light": "#FFFFFF",
        charcoal: "#2A2A2A",
        panel: "#F5F5F5",
        steel: "#808080",
        "steel-light": "#B0B0B0",
        navy: "#333333",
        "navy-light": "#555555",
        signal: "#4A4A4A",
        "signal-dim": "#CCCCCC",
        paper: "#FFFFFF",
        "paper-dim": "#F0F0F0",
        line: "rgba(0,0,0,0.20)",
        "line-dark": "rgba(0,0,0,0.20)",
      },
      fontFamily: {
        display: ["ui-sans-serif", "system-ui", "sans-serif"],
        body: ["ui-sans-serif", "system-ui", "sans-serif"],
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
