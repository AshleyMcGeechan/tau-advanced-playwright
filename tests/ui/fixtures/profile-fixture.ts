import { test as base } from "@playwright/test";
import BookPage from "../pages/book-page";
import hooks from "../../utils/hooks";
import pages from "../../utils/pages";
import SearchPage from "../pages/profile-page";
import createBooksCollection from "../../api/requests/create-books-collection";

type MyFixtures = {
  profileTest: SearchPage;
};

export type bookList = {
  books: string[];
};

export const test = base.extend<MyFixtures & bookList>({
  books: [],

  profileTest: async ({ page, books }, use) => {
    const profileTest = await hooks.beforeEach(page, SearchPage, pages.profile);

    await use(profileTest);
  },
});

export { expect } from "@playwright/test";
