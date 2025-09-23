import { expect, test } from "@playwright/test";

const userName = "standard_user";
const password = "secret_sauce";
const URL = "https://www.saucedemo.com/";
const targetURL = "https://www.saucedemo.com/inventory.html";

test.beforeEach(async ({ page }) => {
  await page.goto(targetURL);
});

test.describe("Profile - Stored Auth", () => {
  test("Check logged in", async ({ page }) => {
    await expect(page.url()).toBe(targetURL);
  });
});
