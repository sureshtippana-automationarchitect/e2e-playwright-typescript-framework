import { test } from '@playwright/test';                                       // Playwright testing framework
import { EnvironmentManager, getBankURL } from '../config/environmentManager';  // Environment configuration utilities
import loginData from '../test-data/login.json';                                 // User credentials test data
import dashboardData from '../test-data/dashboard.json';                         // Dashboard accounts test data
import LoginPage from '../pages/loginPage';                                      // Page Object Model - Login page
import DashboardPage from '../pages/dashboardPage';                              // Page Object Model - Dashboard page

const envManager = EnvironmentManager.getInstance();                             // Environment manager instance (dev, uat, prod)

/**
 * Helper function to generate a unique 4-digit random number (1000-9999)
 * Purpose: Ensures each test run creates accounts with unique names to avoid conflicts
 * Example output: "8273", "4521", "9182"
 * @returns {string} A 4-digit random number as a string
 */
const generateRandomNumber = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

/**
 * Test Suite: Dashboard - Account Management
 * Purpose: Verify that users can successfully add different types of accounts and see them displayed
 * Covers: Savings Account, Checking Account, and Credit Card account types
 */
test.describe("Dashboard - Account Management", () => {
    /**
     * Before Each Test Hook
     * Runs before every test case in this suite
     * Purpose: Navigate to the application URL and wait for the page to fully load
     */
    test.beforeEach(async ({ page }) => {
        await page.goto(getBankURL());              // Navigate to the bank application URL
        await page.waitForLoadState('networkidle'); // Wait until all network requests complete
    });

    /**
     * TC01 - Traditional Approach (For Learning Purpose)
     * Test Case: Add New Savings Account and verify the account name displayed in the dashboard with correct balance
     * 
     * This test demonstrates the standard, step-by-step approach to writing tests.
     * It's kept separate to help new team members understand the complete flow of:
     * 1. User login
     * 2. Adding a new account
     * 3. Verifying the account appears with correct details
     */
    test('TC01 - Add New Savings Account and verify the account name displayed in the dashboard with correct balance @smoke @regression @dashboard', async ({ page }) => {
        // Step 1: Login to the application
        const loginPage = new LoginPage(page);                                                                          // Initialize LoginPage (POM pattern)
        await loginPage.login(loginData.validUsers.admin.username, loginData.validUsers.admin.password);               // Login with admin credentials

        // Step 2: Verify successful login and initialize Dashboard page
        const dashboardPage = new DashboardPage(page);                                                                  // Initialize DashboardPage
        await dashboardPage.validateSecureBankTitleVisible();                                                           // Validate "SecureBank" title visible

        // Step 3: Prepare test data for the new account
        const tc01Data = dashboardData.accounts[0];                                                                     // Get TC01 data from dashboard.json
        const randomNum = generateRandomNumber();                                                                       // Generate unique 4-digit number
        const accountName = `${tc01Data.accountPrefix}-${randomNum}`;                                                   // Create unique account name (e.g., "My Savings Account-8273")
        const initialBalance = tc01Data.initialBalance;                                                                 // Get initial balance from test data

        // Step 4: Add the new savings account through the UI (handles: click add, fill form, select type, save)
        await dashboardPage.addNewAccount(tc01Data.accountType as 'Savings Account' | 'Checking Account' | 'Credit Card', accountName, initialBalance);

        // Step 5: Verify the newly added account is displayed with correct name and balance
        await dashboardPage.verifyAccountDisplayedWithBalance(accountName, initialBalance);
    });

    /**
     * DATA-DRIVEN TESTING APPROACH (Optimized for TC02 and TC03)
     * 
     * This approach demonstrates how to reduce code duplication by using a data array
     * and iterating through it to create multiple test cases with the same logic.
     * 
     * Benefits:
     * - Eliminates duplicate code
     * - Makes it easy to add new test cases (just add to dashboard.json)
     * - Centralizes test data management
     * - Maintains test isolation (each test still runs independently)
     */

    const accountTestData = dashboardData.accounts.slice(1);                     // Get TC02 and TC03 data (skip TC01 traditional approach)

    /**
     * Dynamic Test Generation using forEach
     * 
     * This forEach loop creates a separate test case for each object in the accountTestData array.
     * It destructures the object properties (testId, accountType, accountPrefix, initialBalance)
     * and uses them to create parameterized test cases.
     * 
     * The result: Two test cases (TC02 and TC03) with identical logic but different data.
     */
    accountTestData.forEach(({ testId, accountType, accountPrefix, initialBalance }) => {
        test(`${testId} - Add New ${accountType} and verify the account name displayed in the dashboard with correct balance @regression @dashboard`, async ({ page }) => {
            // Step 1: Login to the application
            const loginPage = new LoginPage(page);                                                                      // Initialize LoginPage
            await loginPage.login(loginData.validUsers.admin.username, loginData.validUsers.admin.password);           // Login with admin credentials

            // Step 2: Verify successful login and initialize Dashboard page
            const dashboardPage = new DashboardPage(page);                                                              // Initialize DashboardPage
            await dashboardPage.validateSecureBankTitleVisible();                                                       // Validate "SecureBank" title visible

            // Step 3: Prepare test data with unique random number
            const randomNum = generateRandomNumber();                                                                   // Generate unique 4-digit number
            const accountName = `${accountPrefix}-${randomNum}`;                                                        // Build account name with prefix and random number

            // Step 4: Add the new account using data from test data array
            await dashboardPage.addNewAccount(accountType as 'Savings Account' | 'Checking Account' | 'Credit Card', accountName, initialBalance);

            // Step 5: Verify the account appears in dashboard with correct balance
            await dashboardPage.verifyAccountDisplayedWithBalance(accountName, initialBalance);
        });
    });

});
