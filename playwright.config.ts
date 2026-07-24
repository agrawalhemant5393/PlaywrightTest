/**
 * @file playwright.config.ts
 * @description Global Playwright configuration file for the entire test suite.
 *
 * This file controls:
 *  - Where Playwright looks for test files (testDir)
 *  - Parallelism and retry behaviour (local vs CI)
 *  - Which browsers / devices to run the tests on (projects)
 *  - Shared options that apply to every test (trace, ignoreHTTPSErrors, etc.)
 *
 * Run all tests:     npx playwright test
 * Open HTML report:  npx playwright show-report
 */

import { defineConfig, devices } from '@playwright/test';

/**
 * Dotenv integration (commented out by default).
 * Uncomment the three lines below if you want to load values from a .env file
 * (e.g. BASE_URL, credentials) into process.env before the tests start.
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * defineConfig() gives full TypeScript IntelliSense on every option.
 * See all options: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  /** Root directory Playwright scans recursively for *.spec.ts files. */
  testDir: './tests',

  /** Run every test file in parallel (each file gets its own worker). */
  fullyParallel: true,

  /**
   * Prevent accidental `test.only` from being committed.
   * On CI the build will fail if any test is marked with `.only`.
   */
  forbidOnly: !!process.env.CI,

  /**
   * Retry failed tests automatically.
   * - CI:    retry up to 2 times (helps with flaky network-dependent tests)
   * - Local: no retries so failures are surfaced immediately
   */
  retries: process.env.CI ? 2 : 0,

  /**
   * Number of parallel workers.
   * - CI:    1 worker (avoids resource contention on a shared agent)
   * - Local: Playwright chooses the optimal count based on CPU cores
   */
  workers: process.env.CI ? 1 : undefined,

  /**
   * Test reporter.
   * 'html' generates a rich interactive report at playwright-report/index.html.
   * Other options: 'list', 'dot', 'json', 'junit', etc.
   */
  reporter: 'html',

  /**
   * Shared settings inherited by every project defined below.
   * Individual projects can override any of these values.
   * See: https://playwright.dev/docs/api/class-testoptions
   */
  use: {
    /**
     * Base URL for page.goto() calls.
     * When set, `await page.goto('/login')` resolves to `<baseURL>/login`.
     * Uncomment and set to your application's root URL.
     */
    // baseURL: 'http://localhost:3000',

    /**
     * Collect a Playwright trace on the first retry of a failing test.
     * Traces can be viewed with: npx playwright show-trace <trace.zip>
     * Options: 'on' | 'off' | 'retain-on-failure' | 'on-first-retry'
     */
    trace: 'on-first-retry',

    /** Suppress SSL certificate errors — useful for self-signed certs in dev/staging. */
    ignoreHTTPSErrors: true,
  },

  /**
   * Projects define which browsers / device profiles to run.
   * Each project inherits the `use` block above and can add its own overrides.
   */
  projects: [
    {
      /** Run tests in a headless Chromium (Google Chrome-compatible) browser. */
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // ── Firefox ─────────────────────────────────────────────────────────────
    // Uncomment to also run the full suite in Firefox.
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
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
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
