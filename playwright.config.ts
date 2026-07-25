import { defineConfig, devices } from "@playwright/test";
import dotenv from 'dotenv'
import path from "node:path";
dotenv.config({path: path.resolve(__dirname,'.env')})


console.log(">>Hello config file");

export const baseConfig =  defineConfig({
  testDir: "./tests",

  fullyParallel: false,
  expect: { timeout: 10_000 },
  globalSetup: require.resolve("./tests/helpers/global-setup.ts"),
  globalTeardown:require.resolve("./tests/helpers/global-teardown.ts"),

  reporter: [
    ["html", { open: "never" }],
    [
      "allure-playwright",

      {
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          name: "Test",
          appName: "CURA",
          Release: "1.1",
        },
      },
    ],
  ],

  use: {
    trace: "on-first-retry",

    /** Suppress SSL certificate errors — useful for self-signed certs in dev/staging. */
    ignoreHTTPSErrors: true,
    navigationTimeout: 30_000,
    screenshot: "on",
  },

  projects: [
    {
      /** Run tests in a headless Chromium (Google Chrome-compatible) browser. */
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },

    // // ── Firefox ─────────────────────────────────────────────────────────────
    // // Uncomment to also run the full suite in Firefox.
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // ── WebKit (Safari) ──────────────────────────────────────────────────────
    // Uncomment to also run the full suite in Safari (via WebKit engine).
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // ── Mobile viewports ────────────────────────────────────────────────────
    // Uncomment to emulate mobile devices (touch events, viewport size, UA).
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // ── Branded browsers ────────────────────────────────────────────────────
    // Uncomment to run against the actual installed Edge / Chrome executables.
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  // ── Local dev server ──────────────────────────────────────────────────────
  // Uncomment if you want Playwright to spin up your app before running tests.
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
