import { test } from "../fixtures/books-search-fixture";
import searchQueryStrings from "../../data/search-query-strings";
import { BrowserContext } from "@playwright/test";
import BookPage from "../pages/book-page";

test.describe.configure({ mode: "serial" });

test.describe("Book Search - Fixture", () => {
  test.describe("Single result", () => {
    test.use({
      queryString: searchQueryStrings.singleResult,
    });
    test("Single result", async ({ booksPage }) => {
      booksPage.assertBookQuantity(1);
    });
  });

  test.describe("Multiple results", () => {
    test.use({
      queryString: searchQueryStrings.multipleResults,
    });
    test("Multiple results", async ({ booksPage }) => {
      booksPage.assertBookQuantity(4);
    });
  });

  test.describe("No results", () => {
    test.use({
      queryString: searchQueryStrings.noResults,
    });
    test("No results", async ({ booksPage }) => {
      booksPage.assertBookQuantity(0);
    });
  });
});

test.describe("Book Search - Mock", () => {
  test.describe("Single result", () => {
    test.use({ queryString: searchQueryStrings.singleResultMock });
    test("Single Result", async ({ mockBooksPage }) => {
      await mockBooksPage.assertBookQuantity(1);
    });
  });

  test.describe("Multiple results", () => {
    test.use({ queryString: searchQueryStrings.multipleResultsMock });
    test("Multiple Results", async ({ mockBooksPage }) => {
      await mockBooksPage.assertBookQuantity(2);
    });
  });

  test.describe("No results", () => {
    test.use({ queryString: searchQueryStrings.noResultsMock });
    test("No results", async ({ mockBooksPage }) => {
      await mockBooksPage.assertBookQuantity(0);
    });
  });
});
