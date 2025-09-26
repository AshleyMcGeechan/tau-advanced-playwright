import { test } from "../fixtures/profile-fixture";
import { APIRequestContext, expect, Page } from "@playwright/test";
import baseAPIUrl from "../../utils/environmentBaseUrl";
import deleteBookAPIRequest from "../../api/requests/delete-books-collection";
import SearchPage from "../pages/profile-page";
import pages from "../../utils/pages";
import createBooksCollection from "../../api/requests/create-books-collection";
import LoginPage from "../pages/login-page";
import hooks from "../../utils/hooks";
import bookAdditionDeletion from "../../data/book-addition-deletion";

test.use({ storageState: { cookies: [], origins: [] } });
test.describe.configure({ mode: "serial" });

let profilePage: SearchPage;
let loginPage: LoginPage;

let apiContext: APIRequestContext;
const env = process.env.NODE_ENV!;
const password = process.env.PASSWORD!;
const userId = process.env.USERID!;
const userName = process.env.USERNAME!;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: baseAPIUrl[env].api,
    extraHTTPHeaders: {
      // Authorization: `Basic ${apiToken}`,
      Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString(
        "base64"
      )}`,
      // Authorization: `Basic ${env}`,
      Accept: "application/json",
    },
  });
});

test.beforeEach(async ({ page }) => {
  loginPage = await hooks.beforeEach(page, LoginPage, pages.loginPage);
  await loginPage.doLogin(userName, password);
  await loginPage.checkLoggedIn();
  await deleteBookAPIRequest.deleteAllBooksByUser(apiContext, userId);
  profilePage = new SearchPage(page);
  await page.goto(pages.profile, { waitUntil: "load" });
});

test.describe.skip("Books - Fixture & API", () => {
  test.use({ books: bookAdditionDeletion });
  test("Add list of books to the collection", async ({
    profileTest,
    books,
  }) => {
    // ARRANGE

    // ACT - Add each book to collection
    for (const book of books) {
      await createBooksCollection.addBookToCollection(apiContext, userId, book);
    }
    await profileTest.page.reload();

    // ASSERT - books are visible on user page
    for (const book of books) {
      await profileTest.assertBookVisible(book);
    }
  });

  test("Delete single book from collection", async ({ profileTest, books }) => {
    // ARRANGE - Ensure books are in collection before attempting deletion
    for (const book of books) {
      await createBooksCollection.addBookToCollection(apiContext, userId, book);
    }

    // ACT - Delete first book
    await deleteBookAPIRequest.deleteBookAPIByIsbn(
      apiContext,
      userId,
      books[0]
    );
    await profileTest.page.reload();

    // ASSERT - only first book has been removed
    for (let i = 0; i < books.length; i++) {
      if (i == 0) {
        await profileTest.assertBookNotVisible(books[i]);
      } else {
        await profileTest.assertBookVisible(books[i]);
      }
    }
  });

  test("Delete list of books from the collection", async ({
    profileTest,
    books,
  }) => {
    // ARRANGE - Ensure books are in collection before attempting deletion
    for (const book of books) {
      await createBooksCollection.addBookToCollection(apiContext, userId, book);
    }

    // ACT - Delete each book
    for (const book of books) {
      await deleteBookAPIRequest.deleteBookAPIByIsbn(apiContext, userId, book);
    }
    await profileTest.page.reload();

    // ASSERT - books are not visible on user page
    for (const book of books) {
      await profileTest.assertBookNotVisible(book);
    }
  });
});
