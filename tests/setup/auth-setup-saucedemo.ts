import { APIRequestContext, test as setup, type Page } from "@playwright/test";
import LoginPage from "../ui/pages/login-page";
import uiPages from "../utils/uiPages";

const adminFile = ".auth/visual-user-saucedemo.json";

setup("authenticate as admin", async ({ request }) => {
  const user = "visual_user";
  const password = "secret_sauce";
  await doLogin(user, password, request);

  await request.storageState({ path: adminFile });
});

const userFile = ".auth/standard-user-saucedemo.json";

setup("authenticate as user", async ({ request }) => {
  const user = "standard_user";
  const password = "secret_sauce";
  await doLogin(user, password, request);
  await request.storageState({ path: userFile });
});

async function doLogin(
  user: string,
  password: string,
  request: APIRequestContext
) {
  const baseURL = "https://www.saucedemo.com/";

  await request.post(baseURL, {
    form: {
      user: user,
      password: password,
    },
  });
}
