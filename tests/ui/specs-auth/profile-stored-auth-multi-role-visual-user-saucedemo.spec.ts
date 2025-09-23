import { expect, test } from "@playwright/test";

const URL = "https://www.saucedemo.com/inventory.html";

test.use({ storageState: ".auth/visual-user-saucedemo.json" });

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test.describe("Saucedemo - Profile", () => {
  test.use({ storageState: ".auth/visual-user-saucedemo.json" });
  test("CheckLoggedIn - visual user", async ({ page }) => {
    await expect(page.url()).toBe(URL);
  });
});
