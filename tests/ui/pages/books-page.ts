import { type Page, type Locator, expect } from "@playwright/test";
import { buildUrl } from "../../utils/uiUrlBuilder";
import messages from "../../utils/messages";
import pages from "../../utils/pages";

class BooksPage {
  readonly page: Page;
  readonly searchBar: Locator;
  readonly rowGroup: Locator;
  readonly firstRow: Locator;
  readonly firstRowLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBar = page.getByRole("textbox", { name: "Type to search" });
    this.rowGroup = page.getByRole("rowgroup");
    this.firstRow = page.getByRole("rowgroup").first();
    this.firstRowLink = page.getByRole("rowgroup").first().getByRole("link");
  }

  async fillSearchBar(query: string) {
    await this.searchBar.fill(query);
  }

  // Asserts if the number of results returned by search match expected value
  async assertBookQuantity(expectedQuantity: number) {
    const titles = await this.rowGroup.getByRole("link");
    const count = await titles.count();
    await expect(count).toEqual(expectedQuantity);
  }
}

export default BooksPage;
