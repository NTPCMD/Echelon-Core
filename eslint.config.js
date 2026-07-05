import js from "@eslint/js";
export default [
  js.configs.recommended,
  { ignores: ["node_modules/**", ".next/**", "dist/**"] },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },
];
