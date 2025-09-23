import { expect, test } from "@playwright/test";

const userName = "standard_user";
const password = "secret_sauce";
const URL = "https://www.saucedemo.com/";
const targetURL = "https://www.saucedemo.com/inventory.html";

test.use({ storageState: { cookies: [], origins: [] } }); // doesn't share the logged in session
// test.use({ storageState: undefined }); // https://github.com/microsoft/playwright/issues/17396
test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
});

test("regular sign in", async ({ page }) => {
  await page.goto(URL);
  const usernameField = page.getByPlaceholder("Username");
  const passwordField = await page.getByPlaceholder("Password");
  const signInButton = await page.getByRole("button", { name: "Login" });

  await usernameField.fill(userName);
  await passwordField.fill(password);
  await signInButton.click();

  await expect(page.url()).toBe(targetURL);
});
