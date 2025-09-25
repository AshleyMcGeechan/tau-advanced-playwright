import { test } from "../fixtures/books-search-fixture";

test.describe.configure({ mode: "serial" });

test.describe("Book Search - Fixture", () => {
  test.describe("Single result", () => {
    test.use({
      queryString: "You Don't Know JS",
    });
    test("Single result", async ({ booksPage }) => {
      booksPage.assertBookQuantity(1);
    });
  });

  test.describe("Multiple results", () => {
    test.use({
      queryString: "java",
    });
    test("Multiple results", async ({ booksPage }) => {
      booksPage.assertBookQuantity(4);
    });
  });

  test.describe("No results", () => {
    test.use({
      queryString: "playwright",
    });
    test("No results", async ({ booksPage }) => {
      booksPage.assertBookQuantity(0);
    });
  });
});
