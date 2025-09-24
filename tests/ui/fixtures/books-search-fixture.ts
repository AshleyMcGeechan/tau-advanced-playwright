import { test as base } from "@playwright/test";
import BooksPage from "../pages/books-page";
import hooks from "../../utils/hooks";
import pages from "../../utils/pages";

type MyFixtures = {
  booksPage: BooksPage;
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
});

export { expect } from "@playwright/test";
