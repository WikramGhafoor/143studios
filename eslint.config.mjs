import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

function normalizeConfig(config) {
  return Array.isArray(config) ? config : [config];
}

const eslintConfig = defineConfig([
  ...normalizeConfig(nextVitals),
  ...normalizeConfig(nextTs),

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;