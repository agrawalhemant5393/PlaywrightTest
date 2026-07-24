/**
 * @file make.apt.spec.ts
 * @description Functional test for the Make Appointment feature of the CURA Healthcare Service.
 *
 * This suite tests the complete end-to-end appointment booking workflow:
 *   1. Log in with valid credentials (handled in beforeEach).
 *   2. Fill in every field on the appointment form.
 *   3. Submit the form and verify the confirmation page.
 *
 * The `beforeEach` hook handles navigation and login so the test itself can
 * focus entirely on the booking form interactions.
 *
 * Target app: https://katalon-demo-cura.herokuapp.com/
 * Run this file: npx playwright test tests/functional/make.apt.spec.ts
 */

import { test, expect } from "@playwright/test";

/**
 * Test suite: Make Appointment
 *
 * Groups all tests related to booking a healthcare appointment.
 * The shared beforeEach hook performs login so each test starts on the
 * appointment form — avoiding duplicated navigation and login code.
 */
test.describe("Make Appointment", async () => {

  /**
   * beforeEach hook — runs before EVERY test in this describe block.
   *
   * Steps performed:
   *  1. Open the CURA homepage.
   *  2. Click the "Make Appointment" link to navigate to the login page.
   *  3. Fill in valid credentials (username + password).
   *  4. Submit the login form.
   *
   * After this hook completes, the browser is on the appointment booking form.
   */
  test.beforeEach("Login", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    // Click the navigation link to reach the login form.
    await page.getByRole("link", { name: "Make Appointment" }).click();

    // Enter the valid username.
    await page.getByLabel("Username").fill("John Doe");

    // Enter the correct (demo) password.
    await page.getByLabel("Password").fill("ThisIsNotAPassword");

    // Submit the login form to land on the appointment booking page.
    await page.getByRole("button", { name: "Login" }).click();
  });

  /**
   * Test: test (full appointment booking flow)
   *
   * End-to-end test that exercises every input on the appointment form and
   * asserts the confirmation page content after submission.
   *
   * Form fields covered:
   *  - Facility          — dropdown: "Hongkong CURA Healthcare Center"
   *  - Readmission       — checkbox: checked
   *  - Healthcare prog.  — radio:    "Medicaid"
   *  - Visit date        — date-picker: day 30
   *  - Comment           — textarea:  multi-line comment
   *
   * Assertions after booking:
   *  - The "Appointment Confirmation" heading is visible.
   *  - The <h2> element contains "Appointment Confirmation".
   *  - The booked facility matches the selected option.
   *  - The "Go to Homepage" link is visible on the confirmation page.
   */
  test("test", async ({ page }) => {
    // Step 1: Select the healthcare facility from the Facility dropdown.
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");

    // Step 2: Check the "Apply for hospital readmission" checkbox.
    await page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();

    // Step 3: Choose the "Medicaid" healthcare programme via radio button.
    await page.getByRole("radio", { name: "Medicaid" }).check();

    // Step 4: Open the date-picker by clicking the calendar toggle (a <span>).
    await page.locator("span").click();

    // Step 5: Select day 30 from the calendar.
    //         .nth(1) selects the second matching cell to avoid the previous-month "30".
    await page.getByRole("cell", { name: "30" }).nth(1).click();

    // Step 6: Click anywhere on the form to close the date-picker overlay.
    await page.locator("form").click();

    // Step 7: Fill the Comment textarea with a multi-line comment.
    //         "\n" inserts a line break inside the textarea.
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("This is multiline Comment\nWrite different C");

    // Step 8: Click "Book Appointment" to submit the form.
    await page.getByRole("button", { name: "Book Appointment" }).click();

    // ── Assertions on the Confirmation page ─────────────────────────────────

    // The page heading should say "Appointment Confirmation".
    await expect(
      page.getByRole("heading", { name: "Appointment Confirmation" }),
    ).toBeVisible();

    // The <h2> element should also contain the confirmation text.
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");

    // The displayed facility should match the option selected in Step 1.
    await expect(page.locator("#facility")).toContainText(
      "Hongkong CURA Healthcare Center",
    );

    // A "Go to Homepage" link should be present on the confirmation page.
    await expect(
      page.getByRole("link", { name: "Go to Homepage" }),
    ).toBeVisible();
  });
});
