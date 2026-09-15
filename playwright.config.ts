import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:3100", trace: "retain-on-failure", reducedMotion: "reduce" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel: "msedge", viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: "msedge", defaultBrowserType: "chromium" } },
  ],
  webServer: { command: "node scripts/serve.mjs", env: { PORT: "3100" }, url: "http://127.0.0.1:3100", reuseExistingServer: !process.env.CI },
});
