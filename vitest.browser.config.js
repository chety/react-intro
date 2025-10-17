import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "browser",
    setupFiles: ["vitest-browser-react", "./vitest.browser.setup.js"],
    include: ["**/*.browser.test.{js,jsx}"],
    esbuild: {
      jsx: "automatic",
    },
    browser: {
      provider: "playwright",
      enabled: true,
      instances: [
        {
          browser: "chromium",
        },
      ],
    },
  },
});
