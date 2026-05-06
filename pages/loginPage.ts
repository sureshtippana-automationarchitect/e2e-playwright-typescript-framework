import { Page } from '@playwright/test';
import { HelperMethods } from '../helpers/helperMethodsUI';

export default class LoginPage {
  private helper: HelperMethods;

  constructor(public page: Page) {
    this.helper = new HelperMethods(page);
  }
  public get loginPageElements() {
    return {
      // Initialize locators
      userNameInput: this.page.getByTestId('username-input'),
      passwordInput: this.page.getByTestId('password-input'),
      loginButton: this.page.getByTestId('login-button'),
      bankHomePageTitle: this.page.locator("span#brand-name"),
    };

  }

  async fillUserName(userName: string): Promise<void> {
    await this.helper.fillInput(this.loginPageElements.userNameInput, userName, 'Filled username field');
  }

  async fillPassword(password: string): Promise<void> {
    await this.helper.fillInput(this.loginPageElements.passwordInput, password, 'Filled password field');
  }

  async clickLogin(): Promise<void> {
    await this.helper.clickElement(this.loginPageElements.loginButton, 'Clicked Login button');
  }

  async validateUserNameFieldVisible(): Promise<void> {
    await this.helper.validate(this.loginPageElements.userNameInput, '✓ Username field is visible');
  }

  async validatePasswordFieldVisible(): Promise<void> {
    await this.helper.validate(this.loginPageElements.passwordInput, '✓ Password field is visible');
  }

  async validateUserNameFieldEmpty(): Promise<void> {
    await this.helper.validateValue(this.loginPageElements.userNameInput, '', '✓ Username field is empty');
  }

  async validatePasswordFieldEmpty(): Promise<void> {
    await this.helper.validateValue(this.loginPageElements.passwordInput, '', '✓ Password field is empty');
  }

  async validatePageURL(expectedUrl: string | RegExp): Promise<void> {
    await this.helper.validateUrl(this.page, expectedUrl, `✓ Page URL is: ${expectedUrl}`);
  }

  async validatePageTitle(expectedTitle: string): Promise<void> {
    await this.helper.validateTitle(this.page, expectedTitle, `✓ Page title is: ${expectedTitle}`);
  }

  async pressTab(): Promise<void> {
    await this.page.keyboard.press('Tab');
  }

  async pressShiftTab(): Promise<void> {
    await this.page.keyboard.press('Shift+Tab');
  }

  async focusUserNameField(): Promise<void> {
    await this.loginPageElements.userNameInput.focus();
  }

  async focusPasswordField(): Promise<void> {
    await this.loginPageElements.passwordInput.focus();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async setViewportSize(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
  }

  async getUserNameFieldValue(): Promise<string> {
    return await this.loginPageElements.userNameInput.inputValue();
  }

  async getPasswordFieldValue(): Promise<string> {
    return await this.loginPageElements.passwordInput.inputValue();
  }

  async getPasswordFieldType(): Promise<string | null> {
    return await this.loginPageElements.passwordInput.getAttribute('type');
  }

  /**
   * Clears the email field.
   */
  async clearUserName(): Promise<void> {
    await this.loginPageElements.userNameInput.fill('');
  }

  /**
   * Clears the password field.
   */
  async clearPassword(): Promise<void> {
    await this.loginPageElements.passwordInput.fill('');
  }

  async login(userName: string, password: string): Promise<void> {
    await this.fillUserName(userName);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  async validateTitleAfterSuccessfulLogin(expectedTitle: string): Promise<void> {
    const actualTitle = await this.loginPageElements.bankHomePageTitle.textContent();
    console.log(`Actual title after login: ${actualTitle}`);
    if (actualTitle?.trim() === expectedTitle) {
      console.log(`✓ Successfully logged in and landed on the home page with title: ${expectedTitle}`);
    } else {
      throw new Error(`✗ Login failed or incorrect landing page. Expected title: ${expectedTitle}, but got: ${actualTitle}`);
    }
  }
}