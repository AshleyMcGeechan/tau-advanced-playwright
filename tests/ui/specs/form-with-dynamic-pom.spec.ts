import fs from "fs";
import path from "path";
import { test } from "@playwright/test";
import pages from "../../utils/pages";
import FormPage from "../pages/form-page";
import hooks from "../../utils/hooks";
import formData from "../../data/form-data";
import { parse } from "csv-parse/sync";

let formPage: FormPage;

const records = parse(
  fs.readFileSync(path.join(__dirname, "../../data/form-data.csv")),
  {
    columns: true,
    skip_empty_lines: true,
  }
);

test.beforeEach(async ({ page }) => {
  formPage = await hooks.beforeEach(page, FormPage, pages.form);
});

test.describe("Form Page - Submit Form", () => {
  test(`Form Fill Invalid - Empty`, async () => {
    await formPage.clickSubmit();
    await formPage.assertFormNotSubmitted();
  });
  for (const record of records) {
    test(`Form Fill Valid - ${record.firstName} ${record.lastName}`, async () => {
      await formPage.fillMandatoryDetails(
        record.firstName,
        record.lastName,
        record.email,
        record.gender,
        record.mobileNumber
      );
      await formPage.clickSubmit();
      await formPage.assertFormSubmitted();
    });
  }
});
