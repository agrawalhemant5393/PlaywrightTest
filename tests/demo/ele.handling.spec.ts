import { test, expect } from "@playwright/test";

test.describe("Make Appointment", async () => {
  test.beforeEach("Login", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    // await page.getByRole("link", { name: "Make Appointment" }).press("Enter");
    // await page.getByRole("link", { name: "Make Appointment" }).dblclick();
    // await page.getByRole("link", { name: "Make Appointment" }).click({button:'right'});
    await page
      .getByRole("link", { name: "Make Appointment" })
      .click({ timeout: 10000 });
    // await page.getByRole("link", { name: "Make Appointment" }).hover();

    await page.getByLabel("Username").fill("John Doe");

    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("test", async ({ page }) => {
    const options = page.getByLabel("Facility").locator("option");

    const texts = await options.allTextContents();
    console.log(texts);
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");

    await page
      .getByRole("checkbox", { name: "Apply for hospital readmission" })
      .check();
    await page.getByRole("radio", { name: "Medicaid" }).check();
    await page.locator("span").click();
    await page.getByRole("cell", { name: "30" }).nth(1).click();
    await page.locator("form").click();

    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("This is multiline Comment\nWrite different C");
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(
      page.getByRole("heading", { name: "Appointment Confirmation" }),
    ).toBeVisible();
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
    await expect(page.locator("#facility")).toContainText(
      "Hongkong CURA Healthcare Center",
    );
    await expect(
      page.getByRole("link", { name: "Go to Homepage" }),
    ).toBeVisible();
  });
});
