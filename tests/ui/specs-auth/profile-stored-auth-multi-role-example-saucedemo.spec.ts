import { test } from "@playwright/test";
import InventoryPageSauceDemo from "../pages/inventory-page-saucedemo";

const URL = "https://www.saucedemo.com/inventory.html";
let inventoryPage: InventoryPageSauceDemo;

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test.describe("Saucedemo", () => {
  test("admin and user", async ({ browser }) => {
    const standardContext = await browser.newContext({
      storageState: ".auth/standard-user-saucedemo.json",
    });
    const standardPage = await standardContext.newPage();
    inventoryPage = new InventoryPageSauceDemo(standardPage);
    standardPage.goto(URL);
    await inventoryPage.checkLoggedInStandard();

    const visualContext = await browser.newContext({
      storageState: ".auth/visual-user-saucedemo.json",
    });
    const visualPage = await visualContext.newPage();
    inventoryPage = new InventoryPageSauceDemo(visualPage);
    visualPage.goto(URL);
    await inventoryPage.checkLoggedInVisual();
  });
});
