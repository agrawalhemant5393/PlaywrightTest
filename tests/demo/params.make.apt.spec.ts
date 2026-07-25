import { test, expect } from "@playwright/test";
import TestData from "../../data/test-data";

const makeAppTestData = TestData.makeAppoinmentTestData();

for (const appdata of makeAppTestData) {
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
      await page.getByLabel("Username").fill(process.env.TEST_USERNAME);

      // Enter the correct (demo) password.
      await page.getByLabel("Password").fill(process.env.TEST_PASSWORD);

      // Submit the login form to land on the appointment booking page.
      await page.getByRole("button", { name: "Login" }).click();

      const loginCookies = await page.context().cookies();
      // Store cookies as a JSON string to keep process.env values as strings
      process.env.LOGIN_COOKIES = JSON.stringify(loginCookies);
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
    test(`test ${appdata.testId}`, async ({ page }, testInfo) => {
      // Step 1: Select the healthcare facility from the Facility dropdown.
      console.log(`>>Curent Config: \n ${JSON.stringify(testInfo.config)} `);
      await page.getByLabel("Facility").selectOption(appdata.facility);

      // Step 2: Check the "Apply for hospital readmission" checkbox.
      await page
        .getByRole("checkbox", { name: "Apply for hospital readmission" })
        .check();

      // Step 3: Choose the "Medicaid" healthcare programme via radio button.
      await page.getByRole("radio", { name: appdata.hcp }).check();

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
      await expect(page.locator("h2")).toContainText(
        "Appointment Confirmation",
      );

      // The displayed facility should match the option selected in Step 1.
      await expect(page.locator("#facility")).toContainText(appdata.facility);

      // A "Go to Homepage" link should be present on the confirmation page.
      await expect(
        page.getByRole("link", { name: "Go to Homepage" }),
      ).toBeVisible();
    });
  });
}
