import { expect, chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const user = "standard_user";
  const password = "secret_sauce";
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch({ headless: true, timeout: 10000 });
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto("https://www.saucedemo.com/");
    const usernameField = page.getByPlaceholder("Username");
    const passwordField = await page.getByPlaceholder("Password");
    const signInButton = await page.getByRole("button", { name: "Login" });

    await usernameField.fill(user);
    await passwordField.fill(password);
    await signInButton.click();

    await expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
    await page.context().storageState({ path: storageState as string });
    await context.tracing.stop({
      path: "./test-results/setup-trace.zip",
    });
    await browser.close();
  } catch (error) {
    await context.tracing.stop({
      path: "./test-results/setup-trace.zip",
    });
    await browser.close();
    throw error;
  }
}

export default globalSetup;

// https://playwright.dev/docs/test-global-setup-teardown#capturing-trace-of-failures-during-global-setup
// https://playwright.dev/docs/trace-viewer
