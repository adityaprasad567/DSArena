import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#14140F",
        "ink-raised": "#1C1C15",
        paper: "#EDEAE0",
        signal: "#E8A33D",
        jade: "#3FA796",
        muted: "#8B8A7D",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
