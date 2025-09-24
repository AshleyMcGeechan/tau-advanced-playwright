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
  readonly submitButton: Locator;
  readonly submitSuccessMessage: string;

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
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.submitSuccessMessage = "Thanks for submitting the form";
  }

  async fillFirstName(name: string) {
    await this.firstNameField.fill(name);
  }

  async assertFirstNameValue(name: string) {
    await expect(this.firstNameField).toHaveValue(name);
  }

  async fillLastName(name: string) {
    await this.lastNameField.fill(name);
  }

  async fillEmail(email: string) {
    await this.emailField.fill(email);
  }

  async clickGender(gender: "Male" | "Female" | "Other") {
    await this.genderRadio.getByText(gender, { exact: true }).click();
  }

  async clickGenderMale() {
    await this.genderRadio.getByText("Male", { exact: true }).click();
  }

  async clickGenderFemale() {
    await this.genderRadio.getByText("Female", { exact: true }).click();
  }

  async clickGenderOther() {
    await this.genderRadio.getByText("Other", { exact: true }).click();
  }

  async fillMobile(mobileNumber: string) {
    await this.mobileField.fill(mobileNumber);
  }

  async assertMobileValue(mobileNumber: string) {
    await expect(this.mobileField).toHaveValue(mobileNumber);
  }

  async fillSubjects(subject: string) {
    await this.subjectField.fill(subject);
  }

  async hobbyClickSports() {
    await this.hobbyCheckboxes.getByText("Sports").click();
  }

  async hobbyClickReading() {
    await this.hobbyCheckboxes.getByText("Reading").click();
  }

  async hobbyClickMusic() {
    await this.hobbyCheckboxes.getByText("Music").click();
  }

  async fillMandatoryDetails(
    firstName: string,
    lastName: string,
    email: string,
    gender: "Male" | "Female" | "Other",
    mobileNumber: string
  ) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillEmail(email);
    await this.clickGender(gender);
    await this.fillMobile(mobileNumber);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async assertFormSubmitted() {
    await expect(this.page.getByText(this.submitSuccessMessage)).toBeVisible();
  }

  async assertFormNotSubmitted() {
    await expect(
      this.page.getByText(this.submitSuccessMessage)
    ).not.toBeVisible();
  }
}

export default FormPage;
