import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  webServer: { command: "npm run preview -- --host 0.0.0.0", url: "http://localhost:4173", reuseExistingServer: true, timeout: 120000 },
  use: { baseURL: "http://localhost:4173", trace: "on-first-retry" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
