import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], darkMode: "class", theme: { extend: { colors: { ink: "#0b1020", brand: "#7457ff" }, borderRadius: { "3xl": "2rem" }, boxShadow: { glow: "0 24px 80px rgba(116,87,255,.22)" } } }, plugins: [] } satisfies Config;
