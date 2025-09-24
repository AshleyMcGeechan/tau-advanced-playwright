import { chromium, firefox, webkit, FullConfig } from "@playwright/test";
import LoginPage from "../ui/pages/login-page";
import uiPages from "../utils/uiPages";

async function globalSetup(config: FullConfig) {
  const user = process.env.USERNAME!;
  const password = process.env.PASSWORD!;
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch({ headless: true, timeout: 10000 });
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await context.tracing.start({ screenshots: true, snapshots: true });
    const loginPage = new LoginPage(page);

    await page.goto(baseURL + uiPages.login, {
      timeout: 60000,
      waitUntil: "domcontentloaded",
    });
    await loginPage.doLogin(user, password);
    await loginPage.checkLoggedIn();
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
