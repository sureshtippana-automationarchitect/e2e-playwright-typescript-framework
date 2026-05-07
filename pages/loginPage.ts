import { Page } from '@playwright/test';
import { HelperMethods } from '../helpers/helperMethodsUI';

/**
 * LoginPage Class - Page Object Model for Login Page
 * 
 * This class encapsulates all the elements and actions related to the Login page.
 * Following the Page Object Model (POM) design pattern for better maintainability.
 * 
 * Benefits of using POM:
 * - Separates test logic from page-specific code
 * - Reusable methods across multiple test cases
 * - Easy maintenance when UI changes
 * - Improves test readability
 */
export default class LoginPage {
  private helper: HelperMethods;

  /**
   * Constructor - Initializes the LoginPage with a Playwright Page instance
   * @param page - Playwright Page object for browser interaction
   */
  constructor(public page: Page) {
    this.helper = new HelperMethods(page);
  }

  /**
   * Page Elements Getter - Returns all locators for the Login page
   * Uses getter pattern to ensure locators are always fresh (not stale)
   * 
   * @returns Object containing all login page element locators
   */
  public get loginPageElements() {
    return {
      // Login form input fields
      userNameInput: this.page.getByTestId('username-input'),
      passwordInput: this.page.getByTestId('password-input'),
      loginButton: this.page.getByTestId('login-button'),
      // Post-login dashboard element
      bankHomePageTitle: this.page.locator("span#brand-name"),
      // Error message element
      loginErrorMessage: this.page.getByText('⚠️ Invalid username or password. Please try again.'),
    };

  }

  /**
   * Fills the username input field
   * Uses helper method to wait for element visibility, clear, and fill
   * 
   * @param userName - Username value to enter
   */
  async fillUserName(userName: string): Promise<void> {
    await this.helper.fillInput(this.loginPageElements.userNameInput, userName, 'Filled username field');
  }

  /**
   * Fills the password input field
   * Uses helper method to wait for element visibility, clear, and fill
   * 
   * @param password - Password value to enter
   */
  async fillPassword(password: string): Promise<void> {
    await this.helper.fillInput(this.loginPageElements.passwordInput, password, 'Filled password field');
  }

  /**
   * Clicks the login button
   * Uses helper method to wait for element visibility before clicking
   */
  async clickLogin(): Promise<void> {
    await this.helper.clickElement(this.loginPageElements.loginButton, 'Clicked Login button');
  }

  /**
   * Validates that the username field is visible on the page
   * Useful for checking if login page is loaded correctly
   */
  async validateUserNameFieldVisible(): Promise<void> {
    await this.helper.validate(this.loginPageElements.userNameInput, '✓ Username field is visible');
  }

  /**
   * Validates that the password field is visible on the page
   * Useful for checking if login page is loaded correctly
   */
  async validatePasswordFieldVisible(): Promise<void> {
    await this.helper.validate(this.loginPageElements.passwordInput, '✓ Password field is visible');
  }

  /**
   * Validates that the username field is empty
   * Useful for testing field validation and initial state
   */
  async validateUserNameFieldEmpty(): Promise<void> {
    await this.helper.validateValue(this.loginPageElements.userNameInput, '', '✓ Username field is empty');
  }

  /**
   * Validates that the password field is empty
   * Useful for testing field validation and initial state
   */
  async validatePasswordFieldEmpty(): Promise<void> {
    await this.helper.validateValue(this.loginPageElements.passwordInput, '', '✓ Password field is empty');
  }

  /**
   * Validates the current page URL
   * Can accept string for exact match or RegExp for pattern matching
   * 
   * @param expectedUrl - Expected URL string or regular expression
   */
  async validatePageURL(expectedUrl: string | RegExp): Promise<void> {
    await this.helper.validateUrl(this.page, expectedUrl, `✓ Page URL is: ${expectedUrl}`);
  }

  /**
   * Validates the page title
   * 
   * @param expectedTitle - Expected page title text
   */
  async validatePageTitle(expectedTitle: string): Promise<void> {
    await this.helper.validateTitle(this.page, expectedTitle, `✓ Page title is: ${expectedTitle}`);
  }

  /**
   * Simulates pressing the Tab key
   * Useful for testing keyboard navigation and tab order
   */
  async pressTab(): Promise<void> {
    await this.page.keyboard.press('Tab');
  }

  /**
   * Simulates pressing Shift+Tab keys
   * Useful for testing reverse keyboard navigation
   */
  async pressShiftTab(): Promise<void> {
    await this.page.keyboard.press('Shift+Tab');
  }

  /**
   * Sets focus on the username input field
   * Useful for testing focus states and keyboard interactions
   */
  async focusUserNameField(): Promise<void> {
    await this.loginPageElements.userNameInput.focus();
  }

  /**
   * Sets focus on the password input field
   * Useful for testing focus states and keyboard interactions
   */
  async focusPasswordField(): Promise<void> {
    await this.loginPageElements.passwordInput.focus();
  }

  /**
   * Waits for the page to fully load (no active network requests)
   * Uses 'networkidle' state to ensure all resources are loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Sets the browser viewport size
   * Useful for testing responsive design and mobile views
   * 
   * @param width - Viewport width in pixels
   * @param height - Viewport height in pixels
   */
  async setViewportSize(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
  }

  /**
   * Gets the current value from the username input field
   * 
   * @returns Current username field value
   */
  async getUserNameFieldValue(): Promise<string> {
    return await this.loginPageElements.userNameInput.inputValue();
  }

  /**
   * Gets the current value from the password input field
   * 
   * @returns Current password field value
   */
  async getPasswordFieldValue(): Promise<string> {
    return await this.loginPageElements.passwordInput.inputValue();
  }

  /**
   * Gets the 'type' attribute of the password field
   * Useful for verifying password masking (type="password")
   * 
   * @returns Type attribute value (e.g., "password" or "text")
   */
  async getPasswordFieldType(): Promise<string | null> {
    return await this.loginPageElements.passwordInput.getAttribute('type');
  }

  /**
   * Clears the username field by filling it with empty string
   * Useful for resetting form state in tests
   */
  async clearUserName(): Promise<void> {
    await this.loginPageElements.userNameInput.fill('');
  }

  /**
   * Clears the password field by filling it with empty string
   * Useful for resetting form state in tests
   */
  async clearPassword(): Promise<void> {
    await this.loginPageElements.passwordInput.fill('');
  }

  /**
   * Complete Login Flow - High-level method for logging in
   * Combines filling username, password, and clicking login button
   * This is the most commonly used method in test cases
   * 
   * @param userName - Username to login with
   * @param password - Password to login with
   */
  async login(userName: string, password: string): Promise<void> {
    await this.fillUserName(userName);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Validates successful login by checking the dashboard title
   * After login, user should be redirected to dashboard with "SecureBank" title
   * 
   * @param expectedTitle - Expected title text on the home page (e.g., "SecureBank")
   * @throws Error if the actual title doesn't match expected title
   */
  async validateTitleAfterSuccessfulLogin(expectedTitle: string): Promise<void> {
    const actualTitle = await this.loginPageElements.bankHomePageTitle.textContent();
    console.log(`Actual title after login: ${actualTitle}`);
    if (actualTitle?.trim() === expectedTitle) {
      console.log(`✓ Successfully logged in and landed on the home page with title: ${expectedTitle}`);
    } else {
      throw new Error(`✗ Login failed or incorrect landing page. Expected title: ${expectedTitle}, but got: ${actualTitle}`);
    }
  }

  /**
   * Validates that the login error message is displayed
   * This method is used for negative testing scenarios where login should fail
   * 
   * Expected error message: "⚠️ Invalid username or password. Please try again."
   * 
   * Use cases:
   * - Invalid username and password combinations
   * - Empty credentials
   * - Non-existent user accounts
   * - Security testing scenarios
   */
  async validateLoginErrorMessage(): Promise<void> {
    await this.helper.validate(this.loginPageElements.loginErrorMessage, '✓ Login error message is displayed: "⚠️ Invalid username or password. Please try again."');
  }
}