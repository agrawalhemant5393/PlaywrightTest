import { test, expect } from "@playwright/test";

test("First Playwright Test", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  // Verify page title
  await expect(page).toHaveTitle("CURA Healthcare Service");

  // Verify page heading
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test("Should do something", { tag: "@smoke" }, async ({ page }, testInfo) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  // Verify page title
  await expect(page).toHaveTitle("CURA Healthcare Service");

  // Verify page heading
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

  await page.getByRole("link", { name: "Make Appointment" }).click();
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole("button", { name: "Login" }).click();
});

test.only("Should prevent login", { tag: "@smoke" }, async ({ page }, testInfo) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  // Verify page title
  await expect(page).toHaveTitle("CURA Healthcare Service");

  // Verify page heading
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

  let makeappt =  page.getByRole("link", { name: "Make Appointment" });
  await makeappt.click();
  console.log(`Locator type ${makeappt} and value is ${JSON.stringify(makeappt)}`)
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").fill("ThisAPassword");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByText('Login failed! Please ensure').click();
  await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');

});
