import { expect, test } from "@playwright/test";

const URL = "https://www.saucedemo.com/inventory.html";

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test.describe("Saucedemo", () => {
  test("admin and user", async ({ browser }) => {
    const standardContext = await browser.newContext({
      storageState: ".auth/standard-user-saucedemo.json",
    });
    const standardPage = await standardContext.newPage();
    await standardPage.goto(URL);
    await expect(standardPage.url()).toBe(URL);

    const visualContext = await browser.newContext({
      storageState: ".auth/visual-user-saucedemo.json",
    });
    const visualPage = await visualContext.newPage();
    await visualPage.goto(URL);
    await expect(visualPage.url()).toBe(URL);

    await standardContext.close();
    await visualContext.close();
  });
});
