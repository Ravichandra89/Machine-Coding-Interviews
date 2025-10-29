// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  js.configs.recommended, // ✅ base JavaScript rules

  {
    ignores: ["dist"], // ✅ replace ignorePath
  },

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    settings: {
      react: { version: "detect" }, // Auto-detect React version
    },

    rules: {
      // ✅ JS recommended rules
      ...js.configs.recommended.rules,

      // ✅ React recommended rules
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,

      // ✅ Hooks rules
      ...reactHooks.configs.recommended.rules,

      // Disable unused rule
      "react/jsx-no-target-blank": "off",

      // Recommended by Vite plugin
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
