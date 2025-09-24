import { expect, test } from "@playwright/test";
import LoginPageSauceDemo from "../pages/login-page-saucedemo";

const targetURL = "https://www.saucedemo.com/inventory.html";

let loginPage: LoginPageSauceDemo;

test.beforeEach(async ({ page }) => {
  await page.goto(targetURL);
  loginPage = new LoginPageSauceDemo(page);
});

test.describe.skip("Profile - Stored Auth", () => {
  test("Check logged in", async ({ page }) => {
    await loginPage.checkLoggedIn();
  });
});
