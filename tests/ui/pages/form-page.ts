import { type Page, type Locator, expect } from "@playwright/test";
import { buildUrl } from "../../utils/uiUrlBuilder";
import messages from "../../utils/messages";
import pages from "../../utils/pages";

class FormPage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly genderRadio: Locator;

  readonly mobileField: Locator;
  readonly dobField: Locator;
  readonly subjectField: Locator;
  readonly hobbyCheckboxes: Locator;
  readonly pictureButton: Locator;
  readonly addressField: Locator;
  readonly stateDropdown: Locator;
  readonly cityDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.getByRole("textbox", { name: "First Name" });
    this.lastNameField = page.getByRole("textbox", { name: "Last Name" });
    this.emailField = page.getByRole("textbox", { name: "name@example.com" });
    this.genderRadio = page.getByText("MaleFemaleOther");
    this.mobileField = page.getByRole("textbox", { name: "Mobile Number" });
    this.dobField = page.locator("#dateOfBirthInput");
    this.subjectField = page.locator(
      ".subjects-auto-complete__value-container"
    );
    this.hobbyCheckboxes = page.getByText("SportsReadingMusic");
    this.pictureButton = page.getByRole("button", { name: "Select picture" });
    this.addressField = page.getByRole("textbox", { name: "Current Address" });
    this.stateDropdown = page.getByText("Select State");
    this.cityDropdown = page.getByText("Select City");
  }
}
