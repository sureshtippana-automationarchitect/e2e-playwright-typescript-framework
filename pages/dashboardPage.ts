import { Page } from '@playwright/test';
import { HelperMethods } from '../helpers/helperMethodsUI';

/**
 * DashboardPage Class - Page Object Model for Dashboard Page
 * 
 * This class encapsulates all the elements and actions related to the Dashboard page.
 * Handles account management operations including:
 * - Adding new accounts (Savings, Checking, Credit Card)
 * - Verifying account display with balances
 * - Validating dashboard elements
 * 
 * Following the Page Object Model (POM) design pattern for better maintainability.
 */
export default class DashboardPage {
  private helper: HelperMethods;

  /**
   * Constructor - Initializes the DashboardPage with a Playwright Page instance
   * @param page - Playwright Page object for browser interaction
   */
  constructor(public page: Page) {
    this.helper = new HelperMethods(page);
  }

  /**
   * Page Elements Getter - Returns all locators for the Dashboard page
   * Uses getter pattern to ensure locators are always fresh (not stale)
   * 
   * Organized into logical groups:
   * - Navbar elements (navigation bar components)
   * - Account management elements (form inputs and buttons)
   * - Account type options (dropdown selections)
   * - Account form elements (status and settings)
   * - Account list elements (table data cells)
   * 
   * @returns Object containing all dashboard page element locators
   */
  public get dashboardPageElements() {
    return {
      // Navbar elements - Top navigation components
      mainNavbar: this.page.getByTestId('main-navbar'),
      secureBankTitle: this.page.getByTestId('main-navbar').getByText('SecureBank'),
      
      // Account management elements - Form controls for adding accounts
      quickAddAccountButton: this.page.getByTestId('quick-add-account'),
      accountNameInput: this.page.getByTestId('account-name-input'),
      accountTypeSelect: this.page.getByTestId('account-type-select'),
      initialBalanceInput: this.page.getByTestId('initial-balance-input'),
      saveAccountButton: this.page.getByTestId('save-account-button'),
      
      // Account type options - Dropdown menu selections
      savingsAccountOption: this.page.getByRole('option', { name: 'Savings Account' }),
      checkingAccountOption: this.page.getByRole('option', { name: 'Checking Account' }),
      creditCardOption: this.page.getByRole('option', { name: 'Credit Card' }),
      savingsAccountLabel: this.page.getByLabel('Savings Account').getByText('Savings Account'),
      checkingAccountLabel: this.page.getByLabel('Checking Account').getByText('Checking Account'),
      creditCardLabel: this.page.getByLabel('Credit Card').getByText('Credit Card'),
      
      // Account form elements - Status and configuration options
      accountForm: this.page.getByTestId('account-form'),
      activeStatus: this.page.getByTestId('account-form').getByText('Active', { exact: true }),
      inactiveStatus: this.page.getByText('Inactive'),
      overdraftProtection: this.page.getByText('Enable Overdraft Protection'),
      
      // Account list elements - Table cells for displaying accounts
      accountNameCells: this.page.locator("//td[@data-testid='account-name']//a"),
      accountBalanceCells: this.page.locator("//td[@data-testid='account-balance']"),
    };
  }

  /**
   * Validates that the SecureBank title is visible on the dashboard
   * This confirms successful navigation to the dashboard after login
   */
  async validateSecureBankTitleVisible(): Promise<void> {
    await this.helper.validate(this.dashboardPageElements.secureBankTitle, '✓ SecureBank title is visible on dashboard');
  }

  /**
   * Clicks the "Add Account" button to open the account creation form
   * This initiates the account creation workflow
   */
  async clickAddAccount(): Promise<void> {
    await this.helper.clickElement(this.dashboardPageElements.quickAddAccountButton, 'Clicked Add Account button');
  }

  /**
   * Fills the account name input field
   * 
   * @param accountName - Name for the new account (e.g., "My Savings Account-8273")
   */
  async fillAccountName(accountName: string): Promise<void> {
    await this.helper.fillInput(this.dashboardPageElements.accountNameInput, accountName, `Filled account name: ${accountName}`);
  }

  /**
   * Clicks the account type dropdown to reveal available account types
   * Opens the dropdown menu with Savings, Checking, and Credit Card options
   */
  async clickAccountTypeSelect(): Promise<void> {
    await this.helper.clickElement(this.dashboardPageElements.accountTypeSelect, 'Clicked Account Type dropdown');
  }

  /**
   * Validates that all three account type options are visible in the dropdown
   * Verifies presence of: Savings Account, Checking Account, Credit Card
   * This ensures the dropdown is working correctly and all options are available
   */
  async validateAccountTypeOptionsVisible(): Promise<void> {
    await this.helper.validate(this.dashboardPageElements.savingsAccountOption, '✓ Savings Account option is visible');
    await this.helper.validate(this.dashboardPageElements.checkingAccountOption, '✓ Checking Account option is visible');
    await this.helper.validate(this.dashboardPageElements.creditCardOption, '✓ Credit Card option is visible');
  }

  /**
   * Selects "Savings Account" from the account type dropdown
   */
  async selectSavingsAccount(): Promise<void> {
    await this.helper.clickElement(this.dashboardPageElements.savingsAccountLabel, 'Selected Savings Account from dropdown');
  }

  /**
   * Selects "Checking Account" from the account type dropdown
   */
  async selectCheckingAccount(): Promise<void> {
    await this.helper.clickElement(this.dashboardPageElements.checkingAccountLabel, 'Selected Checking Account from dropdown');
  }

  /**
   * Selects "Credit Card" from the account type dropdown
   */
  async selectCreditCard(): Promise<void> {
    await this.helper.clickElement(this.dashboardPageElements.creditCardLabel, 'Selected Credit Card from dropdown');
  }

  /**
   * Generic method to select any account type based on parameter
   * Uses a switch statement to delegate to the appropriate selection method
   * 
   * @param accountType - Type of account to select ('Savings Account' | 'Checking Account' | 'Credit Card')
   */
  async selectAccountType(accountType: 'Savings Account' | 'Checking Account' | 'Credit Card'): Promise<void> {
    switch (accountType) {
      case 'Savings Account':
        await this.selectSavingsAccount();
        break;
      case 'Checking Account':
        await this.selectCheckingAccount();
        break;
      case 'Credit Card':
        await this.selectCreditCard();
        break;
    }
  }

  /**
   * Fills the initial balance input field
   * 
   * @param amount - Initial balance amount (e.g., "4999.99")
   */
  async fillInitialBalance(amount: string): Promise<void> {
    await this.helper.fillInput(this.dashboardPageElements.initialBalanceInput, amount, `Filled initial balance: ${amount}`);
  }

  /**
   * Validates that all account status and protection options are visible
   * Verifies presence of: Active status, Inactive status, Overdraft Protection
   * Ensures the account configuration options are displayed correctly
   */
  async validateAccountStatusOptionsVisible(): Promise<void> {
    await this.helper.validate(this.dashboardPageElements.activeStatus, '✓ Active status option is visible');
    await this.helper.validate(this.dashboardPageElements.inactiveStatus, '✓ Inactive status option is visible');
    await this.helper.validate(this.dashboardPageElements.overdraftProtection, '✓ Overdraft Protection option is visible');
  }

  /**
   * Selects "Active" status for the account
   * Active status means the account is operational and can be used
   */
  async selectActiveStatus(): Promise<void> {
    await this.helper.clickElement(this.dashboardPageElements.activeStatus, 'Selected Active status');
  }

  /**
   * Clicks the "Save Account" button to submit the account creation form
   * This finalizes the account creation process
   */
  async clickSaveAccount(): Promise<void> {
    await this.helper.clickElement(this.dashboardPageElements.saveAccountButton, 'Clicked Save Account button');
  }

  /**
   * Complete Account Creation Flow - High-level method for adding a new account
   * 
   * This method orchestrates the entire account creation process:
   * 1. Click "Add Account" button
   * 2. Fill account name
   * 3. Open account type dropdown
   * 4. Validate all account type options are visible
   * 5. Select the specified account type
   * 6. Fill initial balance
   * 7. Validate account status options are visible
   * 8. Select Active status
   * 9. Click Save to create the account
   * 
   * This is the most commonly used method for account creation in tests
   * 
   * @param accountType - Type of account ('Savings Account' | 'Checking Account' | 'Credit Card')
   * @param accountName - Name for the new account
   * @param initialBalance - Initial balance amount
   */
  async addNewAccount(accountType: 'Savings Account' | 'Checking Account' | 'Credit Card', accountName: string, initialBalance: string): Promise<void> {
    await this.clickAddAccount();
    await this.fillAccountName(accountName);
    await this.clickAccountTypeSelect();
    await this.validateAccountTypeOptionsVisible();
    await this.selectAccountType(accountType);
    await this.fillInitialBalance(initialBalance);
    await this.validateAccountStatusOptionsVisible();
    await this.selectActiveStatus();
    await this.clickSaveAccount();
  }

  /**
   * Convenience method specifically for adding Savings Accounts
   * Delegates to the generic addNewAccount method with 'Savings Account' type
   * 
   * @param accountName - Name for the new savings account
   * @param initialBalance - Initial balance amount
   */
  async addNewSavingsAccount(accountName: string, initialBalance: string): Promise<void> {
    await this.addNewAccount('Savings Account', accountName, initialBalance);
  }

  /**
   * Verifies that a newly created account appears in the dashboard with the correct balance
   * 
   * This method:
   * 1. Waits for the account list to be visible
   * 2. Retrieves all account names and balances from the dashboard table
   * 3. Iterates through each row to find the matching account name
   * 4. When found, validates that the balance in the same row matches the expected balance
   * 5. Handles different balance formats (e.g., "$4,999.99" or "$4999.99")
   * 
   * Important: The account name and balance are in the same row (same index)
   * 
   * @param accountName - Name of the account to find (e.g., "My Savings Account-8273")
   * @param expectedBalance - Expected balance amount (e.g., "4999.99")
   * @throws Error if account is not found or if balance doesn't match
   */
  async verifyAccountDisplayedWithBalance(accountName: string, expectedBalance: string): Promise<void> {
    // Get all account name and balance elements from the dashboard table
    const accountNames = this.dashboardPageElements.accountNameCells;
    const accountBalances = this.dashboardPageElements.accountBalanceCells;
    
    // Wait for the account list to be rendered after saving
    await this.page.waitForTimeout(1000);
    
    // Get the total number of accounts displayed in the table
    const accountCount = await accountNames.count();
    let accountFound = false;
    
    // Loop through each row to find the matching account
    for (let i = 0; i < accountCount; i++) {
      // Get the account name text from the current row
      const accountNameText = await accountNames.nth(i).textContent();
      
      // Check if this row contains the account we're looking for
      if (accountNameText?.trim() === accountName) {
        accountFound = true;
        
        // Get the balance from the same row (same index i)
        const balanceText = await accountBalances.nth(i).textContent();
        const actualBalance = balanceText?.trim() || '';
        
        // Format expected balance to match display format (e.g., "$4,999.99")
        // Uses US locale for formatting with comma separators and 2 decimal places
        const formattedExpectedBalance = `$${parseFloat(expectedBalance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        // Compare actual balance with expected (handles both formatted and unformatted versions)
        if (actualBalance === formattedExpectedBalance || actualBalance === `$${expectedBalance}`) {
          console.log(`✓ Account "${accountName}" is displayed with correct balance: ${actualBalance}`);
        } else {
          throw new Error(`✗ Account "${accountName}" found but balance mismatch. Expected: ${formattedExpectedBalance}, but got: ${actualBalance}`);
        }
        break; // Exit loop once account is found and verified
      }
    }
    
    // If we've checked all rows and didn't find the account, throw an error
    if (!accountFound) {
      throw new Error(`✗ Account "${accountName}" not found in the account list`);
    }
  }
}
