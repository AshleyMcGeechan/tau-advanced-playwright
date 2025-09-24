import { expect, Locator, Page } from "@playwright/test";

class InventoryPageSauceDemo {
  readonly page: Page;
  readonly firstImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstImage = page.getByAltText("Sauce Labs Backpack");
  }

  async checkLoggedIn() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }

  async checkLoggedInStandard() {
    // Standard user is displayed the correct item image
    const imageURL = "/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg";
    await expect(this.firstImage).toHaveAttribute("src", imageURL);
  }

  async checkLoggedInVisual() {
    // Visual user is displayed the wrong item image
    const imageURL = "/static/media/sl-404.168b1cce.jpg";
    await expect(this.firstImage).toHaveAttribute("src", imageURL);
  }
}

export default InventoryPageSauceDemo;
