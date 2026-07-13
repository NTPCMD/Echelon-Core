import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#0b1020",
        brand: "#7457ff",
        done: "#16b878",
      },
      borderRadius: {
        "3xl": "2rem",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(116,87,255,.22)",
      },
      backgroundOpacity: {
        8: "0.08",
      },
      opacity: {
        8: "0.08",
        15: "0.15",
        16: "0.16",
        18: "0.18",
        22: "0.22",
        24: "0.24",
        26: "0.26",
        28: "0.28",
        32: "0.32",
        35: "0.35",
        38: "0.38",
        42: "0.42",
        44: "0.44",
        46: "0.46",
        48: "0.48",
        55: "0.55",
        58: "0.58",
        62: "0.62",
        64: "0.64",
        65: "0.65",
        66: "0.66",
        68: "0.68",
        72: "0.72",
        78: "0.78",
        82: "0.82",
        85: "0.85",
        88: "0.88",
        92: "0.92",
      },
    },
  },
  plugins: [],
} satisfies Config;
