// Import necessary Playwright testing framework
import { test } from '@playwright/test';
// Import environment configuration utilities to get the application URL
import { EnvironmentManager, getBankURL } from '../config/environmentManager';
// Import test data containing user credentials from JSON file
import loginData from '../test-data/login.json';
// Import Page Object Model classes for Login and Dashboard pages
import LoginPage from '../pages/loginPage';
import DashboardPage from '../pages/dashboardPage';

// Initialize environment manager instance for managing test environments (dev, uat, prod)
const envManager = EnvironmentManager.getInstance();

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
        // Navigate to the bank application URL based on the current environment
        await page.goto(getBankURL());
        // Wait until all network requests are complete before proceeding
        await page.waitForLoadState('networkidle');
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
    test('TC01 - Add New Savings Account and verify the account name displayed in the dashboard with correct balance', async ({ page }) => {
        // Step 1: Login to the application
        // Create an instance of LoginPage class (Page Object Model pattern)
        const loginPage = new LoginPage(page);
        // Perform login using admin credentials from test data file (login.json)
        await loginPage.login(loginData.username, loginData.password);

        // Step 2: Verify successful login and initialize Dashboard page
        // Create an instance of DashboardPage class
        const dashboardPage = new DashboardPage(page);
        // Validate that the "SecureBank" title is visible, confirming successful login
        await dashboardPage.validateSecureBankTitleVisible();

        // Step 3: Prepare test data for the new account
        // Generate a unique 4-digit random number to ensure account name uniqueness
        const randomNum = generateRandomNumber();
        // Create account name with the random number suffix (e.g., "My Savings Account-8273")
        const accountName = `My Savings Account-${randomNum}`;
        // Set the initial balance amount for the savings account
        const initialBalance = '4999.99';
        
        // Step 4: Add the new savings account through the UI
        // This method handles all the steps: clicking add account, filling form, selecting type, saving
        await dashboardPage.addNewAccount('Savings Account', accountName, initialBalance);

        // Step 5: Verify the newly added account is displayed in the dashboard
        // This method searches for the account name in the dashboard table and validates:
        // - The account name is displayed correctly
        // - The balance matches the initial balance entered
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
     * - Makes it easy to add new test cases (just add to the array)
     * - Centralizes test data management
     * - Maintains test isolation (each test still runs independently)
     */
    
    // Define test data array with configuration for each account type
    const accountTestData = [
        { 
            testId: 'TC02',                              // Test case identifier
            accountType: 'Checking Account' as const,    // Type of account to create
            accountPrefix: 'My Checking Account',        // Base name for the account
            initialBalance: '3500.00'                    // Initial balance amount
        },
        { 
            testId: 'TC03',                              // Test case identifier
            accountType: 'Credit Card' as const,         // Type of account to create
            accountPrefix: 'My Credit Card',             // Base name for the account
            initialBalance: '5000.00'                    // Initial balance amount
        }
    ];

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
        // Create a dynamic test case with a descriptive name based on the data
        test(`${testId} - Add New ${accountType} and verify the account name displayed in the dashboard with correct balance`, async ({ page }) => {
            // Step 1: Login to the application
            const loginPage = new LoginPage(page);
            await loginPage.login(loginData.username, loginData.password);

            // Step 2: Verify successful login and initialize Dashboard page
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.validateSecureBankTitleVisible();

            // Step 3: Prepare test data with unique random number
            // Each test execution generates a new random number for uniqueness
            const randomNum = generateRandomNumber();
            // Build account name using the prefix from test data and random number
            const accountName = `${accountPrefix}-${randomNum}`;
            
            // Step 4: Add the new account using data from the test data array
            await dashboardPage.addNewAccount(accountType, accountName, initialBalance);

            // Step 5: Verify the account appears in dashboard with correct balance
            await dashboardPage.verifyAccountDisplayedWithBalance(accountName, initialBalance);
        });
    });

});
