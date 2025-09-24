import { APIRequestContext, test as setup, type Page } from "@playwright/test";
import LoginPage from "../ui/pages/login-page";
import uiPages from "../utils/uiPages";

const adminFile = ".auth/admin.json";

setup("authenticate as admin", async ({ request }) => {
  const user = process.env.USERNAME_ADMIN!;
  const password = process.env.PASSWORD!;
  await doLogin(user, password, request);

  await request.storageState({ path: adminFile });
});

const userFile = ".auth/user.json";

setup("authenticate as user", async ({ request }) => {
  const user = process.env.USERNAME_USER!;
  const password = process.env.PASSWORD!;
  await doLogin(user, password, request);
  await request.storageState({ path: userFile });
});

async function doLogin(
  user: string,
  password: string,
  request: APIRequestContext
) {
  const baseURL = setup.info().project.use.baseURL!;

  await request.post(baseURL, {
    form: {
      user: user,
      password: password,
    },
  });
}
