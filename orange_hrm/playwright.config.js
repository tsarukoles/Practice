module.exports = {
  reporter: [["html", { outputFolder: "playwright-report" }]],
  testDir: "./tests",
  timeout: 30000,
  retries: 1,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    baseURL: "https://opensource-demo.orangehrmlive.com/",
    screenshot: "only-on-failure",
    video: "on-first-retry",
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "webkit",
      use: { browserName: "webkit" },
    },
  ],
  reporter: [["dot"], ["json", { outputFile: "reports/test-results.json" }]],
};
