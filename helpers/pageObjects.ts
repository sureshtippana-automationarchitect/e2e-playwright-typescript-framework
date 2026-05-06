import { test as baseTest } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import { HelperMethods } from "./helperMethodsUI";

const test = baseTest.extend<{
  loginPage: LoginPage;
  helperMethods: HelperMethods;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  helperMethods: async ({ page }, use) => {
    const { HelperMethods } = await import("./helperMethodsUI");
    await use(new HelperMethods(page));
  },

});

export default test;
export { expect } from "@playwright/test";