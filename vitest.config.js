import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.js"],
    globals: true,
    include: ["**/*.test.{js,jsx}", "!**/*.browser.test.{js,jsx}"],
    esbuild: {
      jsx: "automatic",
    },
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules", "dist"],
    },
  },
});
