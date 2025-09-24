import { expect, test } from "@playwright/test";
import LoginPageSauceDemo from "../pages/login-page-saucedemo";

const userName = "standard_user";
const password = "secret_sauce";
let loginPage: LoginPageSauceDemo;
const URL = "https://www.saucedemo.com/";
const targetURL = "https://www.saucedemo.com/inventory.html";

test.use({ storageState: { cookies: [], origins: [] } }); // doesn't share the logged in session
// test.use({ storageState: undefined }); // https://github.com/microsoft/playwright/issues/17396
test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  loginPage = new LoginPageSauceDemo(page);
});

test.describe("SauceDemo- Login", () => {
  test(`successfull login`, async () => {
    await loginPage.doLogin(userName, password);
    await loginPage.checkLoggedIn();
  });

  test(`failing login - invalid username`, async () => {
    const invalidUsername = "Invalid";
    await loginPage.doLogin(invalidUsername, password);
    await loginPage.checkInvalidCredentials();
  });

  test(`failing login - invalid password`, async () => {
    const invalidPassword = "Invalid";
    await loginPage.doLogin(userName, invalidPassword);
    await loginPage.checkInvalidCredentials();
  });
});
