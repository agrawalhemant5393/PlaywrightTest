/**
 * @file mytest.spec.ts
 * @description Introductory Playwright tests for the CURA Healthcare Service demo app.
 *
 * This file covers three key scenarios:
 *   1. Basic page verification  — title and heading assertion
 *   2. Happy-path login flow    — navigate → fill credentials → log in  (@smoke)
 *   3. Failed login validation  — wrong password → assert error message (@smoke)
 *
 * Target app: https://katalon-demo-cura.herokuapp.com/
 * Run this file: npx playwright test tests/demo/mytest.spec.ts
 * Run smoke tag:  npx playwright test --grep @smoke
 *
 * NOTE: The `test.only` on the third test means ONLY that test runs when this
 * file is executed in isolation. Remove `.only` to run all three tests.
 */

import { test, expect } from "@playwright/test";

/**
 * Test: First Playwright Test
 *
 * A minimal sanity check — opens the CURA homepage and asserts:
 *  - The browser tab title equals "CURA Healthcare Service"
 *  - The main <h1> heading contains the same text
 *
 * This is a good starting point to verify the site is reachable before
 * running more complex scenarios.
 */
test("First Playwright Test", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // Verify page title shown in the browser tab.
  await expect(page).toHaveTitle("CURA Healthcare Service");

  // Verify main heading on the page using an XPath locator.
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

/**
 * Test: Should do something  [@smoke]
 *
 * Demonstrates the happy-path login flow:
 *  1. Navigate to the CURA homepage.
 *  2. Verify the page loaded correctly (title + heading).
 *  3. Click the "Make Appointment" link to reach the login page.
 *  4. Enter valid credentials and submit the login form.
 *
 * `testInfo` is injected by Playwright and contains metadata about the running
 * test (name, title, status, retry number, etc.) — useful for reporting / logging.
 *
 * Tagged @smoke so it can be targeted with: npx playwright test --grep @smoke
 */
test("Should do something", { tag: "@smoke" }, async ({ page }, testInfo) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // Verify page title shown in the browser tab.
  await expect(page).toHaveTitle("CURA Healthcare Service");

  // Verify main heading on the page using an XPath locator.
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

  // Navigate to the login page by clicking the "Make Appointment" link.
  await page.getByRole("link", { name: "Make Appointment" }).click();

  // Fill in valid credentials.
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").fill("ThisIsNotAPassword");

  // Submit the login form.
  await page.getByRole("button", { name: "Login" }).click();
});

/**
 * Test: Should prevent login  [@smoke]
 *
 * Verifies that the application shows a clear error message when a user
 * submits an incorrect password, and does NOT proceed to the booking page.
 *
 * Steps:
 *  1. Navigate to the CURA homepage and confirm the page loads.
 *  2. Click "Make Appointment" to open the login form.
 *  3. Enter a valid username but an INCORRECT password.
 *  4. Submit the form.
 *  5. Assert the error banner is present and contains the expected text.
 *
 * `test.only` — only this test runs when this file is executed; remove it
 * to enable all three tests in this file to run together.
 *
 * Tagged @smoke so it can be targeted with: npx playwright test --grep @smoke
 */
test("Should prevent login", { tag: "@smoke" }, async ({ page }, testInfo) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // Verify page title shown in the browser tab.
  await expect(page).toHaveTitle("CURA Healthcare Service");

  // Verify main heading on the page using an XPath locator.
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

  // Store the locator in a variable so we can reuse it and log its details.
  let makeappt = page.getByRole("link", { name: "Make Appointment" });
  await makeappt.click();

  // Log the locator description and its JSON representation for debugging.
  console.log(
    `Locator type ${makeappt} and value is ${JSON.stringify(makeappt)}`,
  );

  // Fill in a valid username.
  await page.getByLabel("Username").fill("John Doe");

  // Fill in an INCORRECT password to trigger the login error.
  await page.getByLabel("Password").fill("ThisAPassword");

  // Submit the login form.
  await page.getByRole("button", { name: "Login" }).click();

  // Click on the error message element to ensure it is interactive / visible.
  await page.getByText("Login failed! Please ensure").click();

  // Assert that the #login container shows the full expected error message.
  await expect(page.locator("#login")).toContainText(
    "Login failed! Please ensure the username and password are valid.",
  );
});

test.only("should demo config file", async ({ page }, testInfo) => {
  console.log(`Config at runtime : ${JSON.stringify(testInfo.config)}`);
});
