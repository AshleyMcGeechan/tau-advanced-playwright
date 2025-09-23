import { APIRequestContext, test as setup, type Page } from "@playwright/test";
import LoginPageSauceDemo from "../ui/pages/login-page-saucedemo";

const visualUserFile = ".auth/visual-user-saucedemo.json";
const URL = "https://www.saucedemo.com/";

setup("authenticate as visual user", async ({ page }) => {
  const user = "visual_user";
  const password = "secret_sauce";
  await doLogin(page, user, password);

  await page.context().storageState({ path: visualUserFile });
});

const standardUserFile = ".auth/standard-user-saucedemo.json";

setup("authenticate as standard user", async ({ page }) => {
  const user = "standard_user";
  const password = "secret_sauce";
  await doLogin(page, user, password);
  await page.context().storageState({ path: standardUserFile });
});

async function doLogin(page: Page, user: string, password: string) {
  const loginPage = new LoginPageSauceDemo(page);

  await page.goto(URL);
  await loginPage.doLogin(user, password);
  await page.waitForURL(URL + "inventory.html");
  await loginPage.checkLoggedIn();
}
