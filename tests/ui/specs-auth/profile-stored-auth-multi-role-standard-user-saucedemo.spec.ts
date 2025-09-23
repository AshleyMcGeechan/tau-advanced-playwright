import { expect, test } from "@playwright/test";

const URL = "https://www.saucedemo.com/inventory.html";

test.use({ storageState: ".auth/standard-user-saucedemo.json" });

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test.describe("Saucedemo - Profile", () => {
  test.use({ storageState: ".auth/standard-user-saucedemo.json" });
  test("CheckLoggedIn - standard user", async ({ page }) => {
    await expect(page.url()).toBe(URL);
  });
});
