import { test } from "../fixtures/books-search-fixture";

test.describe.configure({ mode: "serial" });

test.describe.only("Books - Fixture & API", () => {
  test.use({
    singleResultString: "You Don't Know JS",
    multipleResultString: "java",
    noResultString: "playwright",
  });
  test("Single results", async ({ singleResultQuery }) => {
    singleResultQuery.assertBookQuantity(1);
  });

  test("Multiple results", async ({ multipleResultQuery }) => {
    multipleResultQuery.assertBookQuantity(4);
  });

  test("No results", async ({ noResultQuery }) => {
    noResultQuery.assertBookQuantity(0);
  });
});
