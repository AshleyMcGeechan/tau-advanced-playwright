import { APIRequestContext, test as setup, type Page } from "@playwright/test";
import LoginPage from "../ui/pages/login-page";
import uiPages from "../utils/uiPages";
import LoginPageSauceDemo from "../ui/pages/login-page-saucedemo";

const adminFile = ".auth/visual-user-saucedemo.json";
const URL = "https://www.saucedemo.com/";

setup("authenticate as admin", async ({ page }) => {
  const user = "visual_user";
  const password = "secret_sauce";
  await doLogin(page, user, password);

  await page.context().storageState({ path: adminFile });
});

const userFile = ".auth/standard-user-saucedemo.json";

setup("authenticate as user", async ({ page }) => {
  const user = "standard_user";
  const password = "secret_sauce";
  await doLogin(page, user, password);
  await page.context().storageState({ path: userFile });
});

async function doLogin(page: Page, user: string, password: string) {
  const loginPage = new LoginPageSauceDemo(page);

  await page.goto(URL);
  await loginPage.doLogin(user, password);
  await page.waitForURL(URL + "inventory.html");
  await loginPage.checkLoggedIn();
}
