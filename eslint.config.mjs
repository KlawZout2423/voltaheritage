import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // This site operates in English only — i18n is not required.
    rules: {
      "i18next/no-literal-string": "off",
      "@formatjs/no-literal-string-in-jsx": "off",
      "react/jsx-no-literals": "off",
    },
  },
]);

export default eslintConfig;
