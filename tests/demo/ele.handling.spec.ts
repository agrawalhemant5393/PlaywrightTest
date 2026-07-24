/**
 * @file ele.handlingspec.ts
 * @description Demonstrates various element-interaction techniques in Playwright
 *              using the CURA Healthcare Service demo application.
 *
 * Key concepts illustrated in this file:
 *  - test.describe()  — grouping related tests under a shared name
 *  - test.beforeEach() — reusable setup (login) that runs before every test
 *  - Right-click navigation (button: 'right') vs regular click
 *  - Selecting dropdown options with selectOption()
 *  - Interacting with checkboxes and radio buttons
 *  - Clicking a date-picker cell by role and index
 *  - Filling a multi-line textarea with newline characters
 *  - Multiple assertion types: toBeVisible(), toContainText()
 *
 * NOTE: The beforeEach uses a RIGHT-CLICK on "Make Appointment" which is
 * intentional — it explores how Playwright handles non-standard click types.
 * In a real scenario, a regular .click() is preferred for navigation.
 *
 * Target app: https://katalon-demo-cura.herokuapp.com/
 * Run this file: npx playwright test "tests/demo/ele.handlingspec.ts"
 */

import { test, expect } from "@playwright/test";

/**
 * Test suite: Make Appointment
 *
 * Groups all tests that exercise the appointment-booking workflow.
 * The beforeEach hook handles site navigation and login so each individual
 * test starts on the appointment form — avoiding repeated setup code.
 */
test.describe("Make Appointment", async () => {

  /**
   * beforeEach hook — runs before EVERY test inside this describe block.
   *
   * Steps performed:
   *  1. Open the CURA homepage.
   *  2. Right-click the "Make Appointment" link (demonstrates the `button` option).
   *     Commented alternatives show press("Enter") and dblclick() for reference.
   *  3. Enter valid credentials and submit the login form.
   *
   * After this hook completes, the page is on the appointment-booking form.
   */
  test.beforeEach("Login", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    // Right-click on the link — demonstrates the `button` interaction option.
    // Alternatives (commented out for reference):
    // await page.getByRole("link", { name: "Make Appointment" }).press("Enter");   // keyboard navigation
    // await page.getByRole("link", { name: "Make Appointment" }).dblclick();       // double-click
    await page.getByRole("link", { name: "Make Appointment" }).click({ button: 'right' });

    // Fill in the username field using its label text.
    await page.getByLabel("Username").fill("John Doe");

    // Fill in the password field using its label text.
    await page.getByLabel("Password").fill("ThisIsNotAPassword");

    // Click the Login button to submit the credentials.
    await page.getByRole("button", { name: "Login" }).click();
  });

  /**
   * Test: test (appointment booking)
   *
   * End-to-end test that fills in every field on the appointment form and
   * verifies the confirmation page after submission.
   *
   * Steps:
   *  1. Select "Hongkong CURA Healthcare Center" from the Facility dropdown.
   *  2. Check the "Apply for hospital readmission" checkbox.
   *  3. Select the "Medicaid" healthcare programme radio button.
   *  4. Open the date-picker (by clicking the calendar icon / span).
   *  5. Pick day 30 from the calendar (second occurrence, to avoid ambiguity).
   *  6. Click outside the date-picker to close it.
   *  7. Fill in the Comment textarea with a multi-line comment.
   *  8. Submit the form by clicking "Book Appointment".
   *  9. Assert the confirmation page heading, facility name, and navigation link.
   */
  test("test", async ({ page }) => {
    // Step 1: Choose the healthcare facility from the dropdown.
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");

    // Step 2: Check the hospital readmission checkbox.
    await page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();

    // Step 3: Select the Medicaid healthcare programme via radio button.
    await page.getByRole("radio", { name: "Medicaid" }).check();

    // Step 4: Click the calendar icon (a <span>) to open the date-picker.
    await page.locator("span").click();

    // Step 5: Click the cell labelled "30" — use .nth(1) because the calendar
    //         may show "30" in both the previous-month column and current month.
    await page.getByRole("cell", { name: "30" }).nth(1).click();

    // Step 6: Click the form background to close the date-picker.
    await page.locator("form").click();

    // Step 7: Fill in the comment textarea with a multi-line comment.
    //         "\n" inserts a newline inside the text area.
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("This is multiline Comment\nWrite different C");

    // Step 8: Submit the appointment booking form.
    await page.getByRole("button", { name: "Book Appointment" }).click();

    // ── Assertions ──────────────────────────────────────────────────────────

    // Assert the confirmation heading is visible on the next page.
    await expect(
      page.getByRole("heading", { name: "Appointment Confirmation" }),
    ).toBeVisible();

    // Assert the <h2> element also contains the confirmation text.
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");

    // Assert the booked facility matches what was selected in Step 1.
    await expect(page.locator("#facility")).toContainText(
      "Hongkong CURA Healthcare Center",
    );

    // Assert the "Go to Homepage" navigation link is visible on the confirmation page.
    await expect(
      page.getByRole("link", { name: "Go to Homepage" }),
    ).toBeVisible();
  });
});
