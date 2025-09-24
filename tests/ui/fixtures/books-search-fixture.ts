import { test as base } from "@playwright/test";
import BooksPage from "../pages/books-page";
import hooks from "../../utils/hooks";
import pages from "../../utils/pages";

type MyFixtures = {
  singleResultQuery: BooksPage;
  multipleResultQuery: BooksPage;
  noResultQuery: BooksPage;
};

export type searchSettings = {
  singleResultString: string;
  multipleResultString: string;
  noResultString: string;
};

export const test = base.extend<MyFixtures & searchSettings>({
  singleResultString: "You Don't Know JS",
  multipleResultString: "java",
  noResultString: "playwright",

  singleResultQuery: async ({ page, singleResultString }, use) => {
    const booksPage = await hooks.beforeEach(
      page,
      BooksPage,
      pages.bookStorePage
    );
    await booksPage.fillSearchBar(singleResultString);
    await use(booksPage);
  },

  multipleResultQuery: async ({ page, multipleResultString }, use) => {
    const booksPage = await hooks.beforeEach(
      page,
      BooksPage,
      pages.bookStorePage
    );
    await booksPage.fillSearchBar(multipleResultString);
    await use(booksPage);
  },

  noResultQuery: async ({ page, noResultString }, use) => {
    const booksPage = await hooks.beforeEach(
      page,
      BooksPage,
      pages.bookStorePage
    );
    await booksPage.fillSearchBar(noResultString);
    await use(booksPage);
  },
});

export { expect } from "@playwright/test";
