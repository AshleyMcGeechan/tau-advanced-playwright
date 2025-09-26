import { test as base, BrowserContext, Page } from "@playwright/test";
import BooksPage from "../pages/books-page";
import hooks from "../../utils/hooks";
import pages from "../../utils/pages";
import apiPaths from "../../utils/apiPaths";

type MyFixtures = {
  booksPage: BooksPage;
  mockBooksPage: BooksPage;
};

export type searchSettings = {
  queryString: string;
};

export const test = base.extend<MyFixtures & searchSettings>({
  queryString: "Default",

  booksPage: async ({ page, queryString }, use) => {
    const booksPage = await hooks.beforeEach(
      page,
      BooksPage,
      pages.bookStorePage
    );
    await booksPage.fillSearchBar(queryString);
    await use(booksPage);
  },

  mockBooksPage: async ({ page, context, queryString }, use) => {
    const booksPage = await hooks.beforeEach(
      page,
      BooksPage,
      pages.bookStorePage
    );
    await watchAPICallAndMockResponse(page, context);
    await booksPage.fillSearchBar(queryString);
    await use(booksPage);

    async function watchAPICallAndMockResponse(
      page: Page,
      context: BrowserContext
    ) {
      await booksPage.mockBooksListResponse(context);
      const [response] = await Promise.all([
        page.waitForResponse(new RegExp(apiPaths.books)),
        await page.reload(),
      ]);
      await response.json();
    }
  },
});

export { expect } from "@playwright/test";
