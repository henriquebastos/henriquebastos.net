import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  { rules: { "no-console": "error" } },
  {
    files: [".screenshots.mjs"],
    rules: { "no-console": "off" },
  },
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "public/pagefind/**",
      ".astropaper-trash/**",
      "infra/**",
      "jetpack/**",
      "libs/**",
      "prescriptions/**",
      "store/**",
      "wishlist/**",
      "wishlist1/**",
    ],
  },
];
