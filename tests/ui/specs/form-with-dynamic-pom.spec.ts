import { test } from "@playwright/test";
import pages from "../../utils/pages";
import FormPage from "../pages/form-page";
import hooks from "../../utils/hooks";

let formPage: FormPage;

test.beforeEach(async ({ page }) => {
  formPage = await hooks.beforeEach(page, FormPage, pages.form);
});

test.describe("Form Page - Submit Form", () => {
  test(`Form Fill Invalid - Empty`, async () => {
    await formPage.clickSubmit();
    await formPage.assertFormNotSubmitted();
  });
  test(`Form Fill Valid`, async () => {
    const firstName = "Example";
    const lastName = "Example";
    const email = "abc@xyz.com";
    const gender = "Male";
    const mobileNumber = "0123456789";

    await formPage.fillMandatoryDetails(
      firstName,
      lastName,
      email,
      gender,
      mobileNumber
    );
    await formPage.clickSubmit();
    await formPage.assertFormSubmitted();
  });
});
