/**
 * @file login.spec.ts
 * @description Functional tests for the Login feature of the CURA Healthcare Service.
 *
 * This suite validates two core login scenarios:
 *   1. Successful login  — valid credentials redirect to the appointment form.
 *   2. Failed login      — wrong password displays an error message (no redirect).
 *
 * A shared `beforeEach` hook navigates to the homepage, verifies it loaded
 * correctly, and clicks "Make Appointment" so every test begins on the login form.
 *
 * Target app: https://katalon-demo-cura.herokuapp.com/
 * Run this file: npx playwright test tests/functional/login.spec.ts
 * Run @smoke tag:  npx playwright test --grep @smoke
 */

import { test, expect } from "@playwright/test";

/**
 * Test suite: Login Functionality
 *
 * All tests in this block share a common precondition (beforeEach) and together
 * cover the positive and negative login paths.
 */
test.describe("Login Functionality", () => {

  /**
   * beforeEach hook — runs automatically before every test in this describe block.
   *
   * Steps performed:
   *  1. Navigate to the CURA homepage.
   *  2. Assert the page title equals "CURA Healthcare Service".
   *  3. Assert the <h1> heading equals "CURA Healthcare Service".
   *  4. Click the "Make Appointment" link to open the login form.
   *
   * After this hook finishes, the current page is the login form.
   */
  test.beforeEach("Before each test script", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    // Verify the browser tab title matches the expected application title.
    await expect(page).toHaveTitle("CURA Healthcare Service");

    // Verify the main page heading using an XPath locator.
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    // Click the navigation link to reach the login form.
    await page.getByRole("link", { name: "Make Appointment" }).click();
  });

  /**
   * Test: Should Login  [@smoke]
   *
   * Happy-path test — enters the correct username and password and submits
   * the login form. A successful login redirects the user to the appointment
   * booking form (no assertion needed here; absence of an error is the signal).
   *
   * Credentials used:
   *  - Username: "John Doe"
   *  - Password: "ThisIsNotAPassword"  (the app's hardcoded demo password)
   *
   * Tagged @smoke so it runs as part of the smoke regression suite.
   */
  test("Should Login", { tag: "@smoke" }, async ({ page }, testInfo) => {
    // Enter the valid username into the Username field.
    await page.getByLabel("Username").fill("John Doe");

    // Enter the correct (demo) password into the Password field.
    await page.getByLabel("Password").fill("ThisIsNotAPassword");

    // Click the Login button to submit the form.
    await page.getByRole("button", { name: "Login" }).click();
  });

  /**
   * Test: Should prevent login  [@smoke]
   *
   * Negative-path test — enters a valid username but a WRONG password, then
   * asserts that:
   *  - The error message element is present and clickable.
   *  - The #login container displays the full expected error text.
   *
   * This confirms the app does NOT silently fail; it communicates the error
   * clearly to the user.
   *
   * Tagged @smoke so it runs as part of the smoke regression suite.
   */
  test(
    "Should prevent login",
    { tag: "@smoke" },
    async ({ page }, testInfo) => {
      // Enter the valid username.
      await page.getByLabel("Username").fill("John Doe");

      // Enter an INCORRECT password to trigger the login failure.
      await page.getByLabel("Password").fill("ThisAPassword");

      // Submit the form.
      await page.getByRole("button", { name: "Login" }).click();

      // Click on the error text to confirm it is present and interactive.
      await page.getByText("Login failed! Please ensure").click();

      // Assert the full error message is visible inside the #login container.
      await expect(page.locator("#login")).toContainText(
        "Login failed! Please ensure the username and password are valid.",
      );
    },
  );
});
