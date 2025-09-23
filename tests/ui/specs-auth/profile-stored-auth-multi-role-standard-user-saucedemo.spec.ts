import { expect, test } from "@playwright/test";
import InventoryPageSauceDemo from "../pages/inventory-page-saucedemo";

const URL = "https://www.saucedemo.com/inventory.html";
let inventoryPage: InventoryPageSauceDemo;

test.use({ storageState: ".auth/standard-user-saucedemo.json" });

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test.describe("Saucedemo - Profile", () => {
  test.use({ storageState: ".auth/standard-user-saucedemo.json" });
  test("CheckLoggedIn - standard user", async ({ page }) => {
    inventoryPage = new InventoryPageSauceDemo(page);
    await inventoryPage.checkLoggedInStandard();
  });
});
