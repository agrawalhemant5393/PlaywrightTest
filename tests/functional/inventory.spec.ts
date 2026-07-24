import { test, expect } from "@playwright/test";

test.describe("Inventory Feature", () => {
  test.beforeEach("Login with credentials", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("should confirm all prices are non-zero value", async ({ page }) => {
    let products = page.locator(".inventory_item");
    await expect(products).toHaveCount(6);

    let totalProducts = await products.count();

    let priceArr = [];
    for (let i = 0; i < totalProducts; i++) {
      let eleNode = await products.nth(i);

      let productName = await eleNode
        .locator(".inventory_item_name")
        .innerText();

      let productPrice = await eleNode
        .locator(".inventory_item_price")
        .innerText();

      console.log(
        `Product Name: ${productName} and price of the product is ${productPrice}`,
      );

      priceArr.push(productPrice);
    }

    let modifiedPrice = priceArr.map((ele) =>
      parseFloat(ele.replaceAll("$", "")),
    );
    console.log(modifiedPrice);
    let realvalies = modifiedPrice.filter(ele => ele<=0);
    if(realvalies.length>0){
        console.log('Incorrect value found')
    }
    else{
        console.log('Go ahead')
    }
  });
});
