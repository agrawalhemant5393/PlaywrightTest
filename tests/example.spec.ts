/**
 * @file example.spec.ts
 * @description Starter / smoke tests for the official Playwright documentation site.
 *
 * These tests ship with every new Playwright project as a working reference.
 * They demonstrate the two most fundamental patterns:
 *   1. Asserting a page title with toHaveTitle()
 *   2. Clicking a link and asserting the resulting heading with toBeVisible()
 *
 * Target URL: https://playwright.dev/
 * Run this file: npx playwright test tests/example.spec.ts
 */

import { test, expect } from '@playwright/test';

/**
 * Test: has title
 *
 * Navigates to the Playwright docs homepage and verifies that the browser
 * tab title contains the word "Playwright".
 *
 * Uses a RegExp matcher so the assertion passes regardless of the full title
 * string (e.g. "Playwright" or "Fast and reliable end-to-end testing | Playwright").
 */
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // The title must contain the substring "Playwright" (case-sensitive regex).
  await expect(page).toHaveTitle(/Playwright/);
});

/**
 * Test: get started link
 *
 * Navigates to the Playwright docs homepage, clicks the "Get started" link
 * in the hero section, and verifies that the destination page shows an
 * "Installation" heading — confirming the correct page was loaded.
 */
test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Locate the "Get started" link by its accessible role + visible name and click it.
  await page.getByRole('link', { name: 'Get started' }).click();

  // After navigation the page should show an "Installation" section heading.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
