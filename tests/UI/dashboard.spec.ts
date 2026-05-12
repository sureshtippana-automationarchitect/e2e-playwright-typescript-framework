// LEARNING NOTE: Two ways to import test
// Option 1: Traditional Playwright test (what you had before)
// import { test } from '@playwright/test';

// Option 2: Custom fixtures test (new approach with auto-injected dependencies)
import { test, expect } from '../../fixtures/baseFixtures';                         // Custom test with fixtures (page objects auto-injected)

import { EnvironmentManager, getBankURL } from '../../config/environmentManager';  // Environment configuration utilities
import loginData from '../../test-data/login.json';                                 // User credentials test data
import dashboardData from '../../test-data/dashboard.json';                         // Dashboard accounts test data

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
     * TC01 - FIXTURES APPROACH (Cleaner & More Maintainable)
     * Test Case: Add New Savings Account and verify the account name displayed in the dashboard with correct balance
     * 
     * 🎯 NOTICE THE DIFFERENCE:
     * - No manual 'new LoginPage(page)' or 'new DashboardPage(page)' - they're auto-injected via fixtures!
     * - Already logged in as admin via 'loginWithAdmin' fixture - skips login steps entirely!
     * - Page objects (dashboardPage, helperMethods) are automatically available
     * - Test focuses ONLY on the actual test logic, not setup boilerplate
     * 
     * Compare with old approach:
     * ❌ Old: const loginPage = new LoginPage(page); await loginPage.login(...); (5+ lines of setup)
     * ✅ New: Already done by fixtures! Jump straight to test logic
     */
    test('TC01 - Add New Savings Account and verify the account name displayed in the dashboard with correct balance @smoke @regression @dashboard', async ({ loginWithAdmin, dashboardPage, helperMethods }) => {
        // 🎉 Already logged in as admin! The 'loginWithAdmin' fixture handled login for us
        // No need for: const loginPage = new LoginPage(page); await loginPage.login(...);
        
        // Step 1: Prepare test data for the new account
        const tc01Data = dashboardData.accounts[0];                                                                     // Get TC01 data from dashboard.json
        const randomNum = generateRandomNumber();                                                                       // Generate unique 4-digit number
        const accountName = `${tc01Data.accountPrefix}-${randomNum}`;                                                   // Create unique account name (e.g., "My Savings Account-8273")
        const initialBalance = tc01Data.initialBalance;                                                                 // Get initial balance from test data

        // Step 2: Add the new savings account through the UI (dashboardPage is auto-injected via fixtures)
        await dashboardPage.addNewAccount(tc01Data.accountType as 'Savings Account' | 'Checking Account' | 'Credit Card', accountName, initialBalance);

        // Step 3: Verify the newly added account is displayed with correct name and balance
        await dashboardPage.verifyAccountDisplayedWithBalance(accountName, initialBalance);

        // Step 4: Capture screenshot (helperMethods is auto-injected via fixtures)
        await helperMethods.takeScreenshot('account-created-successfully', 'TC01-Dashboard-SavingsAccount');           // Take full page screenshot with descriptive name
    });

    /**
     * DATA-DRIVEN TESTING WITH FIXTURES (Best of Both Worlds!)
     * 
     * This approach combines:
     * ✅ Data-driven testing (iterate through test data)
     * ✅ Fixtures (auto-injected page objects and authentication)
     * 
     * Result: Clean, maintainable, and scalable tests
     * 
     * Benefits:
     * - No code duplication
     * - Easy to add new test cases (just update dashboard.json)
     * - Centralized test data management
     * - Automatic page object injection via fixtures
     * - Pre-authenticated state (adminPage fixture)
     */

    const accountTestData = dashboardData.accounts.slice(1);                     // Get TC02 and TC03 data (skip TC01)

    /**
     * Dynamic Test Generation using forEach + Fixtures
     * 
     * Each iteration creates a separate test case with:
     * - Auto-injected page objects (dashboardPage via fixture)
     * - Pre-authenticated admin user (loginWithAdmin fixture)
     * - Unique test data from dashboard.json
     */
    accountTestData.forEach(({ testId, accountType, accountPrefix, initialBalance }) => {
        test(`${testId} - Add New ${accountType} and verify the account name displayed in the dashboard with correct balance @regression @dashboard`, async ({ loginWithAdmin, dashboardPage }) => {
            // 🎉 Already logged in as admin! No setup code needed!
            
            // Step 1: Prepare test data with unique random number
            const randomNum = generateRandomNumber();                                                                   // Generate unique 4-digit number
            const accountName = `${accountPrefix}-${randomNum}`;                                                        // Build account name with prefix and random number

            // Step 2: Add the new account using data from test data array (dashboardPage auto-injected via fixture)
            await dashboardPage.addNewAccount(accountType as 'Savings Account' | 'Checking Account' | 'Credit Card', accountName, initialBalance);

            // Step 3: Verify the account appears in dashboard with correct balance
            await dashboardPage.verifyAccountDisplayedWithBalance(accountName, initialBalance);
        });
    });

    /**
     * TC04 - Mobile Dashboard Test (iPhone 14 Pro Max)
     * 
     * Purpose: Verify account creation and display functionality on mobile devices
     * Device: iPhone 14 Pro Max (430x932 viewport)
     * 
     * 🎯 This test sets viewport programmatically within the test
     * ensuring mobile responsive design works correctly
     * 
     * 📱 Viewport is set directly using page.setViewportSize()
     */
    test('TC04 - Add Savings Account on iPhone 14 Pro Max @smoke @dashboard @mobile', async ({ loginWithAdmin, dashboardPage, helperMethods, page }, testInfo) => {
        // Set iPhone 14 Pro Max viewport dimensions
        await page.setViewportSize({ width: 430, height: 932 });
        
        // Reload page to apply viewport changes
        await page.reload();
        await page.waitForLoadState('networkidle');
        
        // 🎉 Already logged in as admin via loginWithAdmin fixture!
        
        const randomNum = generateRandomNumber();
        const accountName = `Mobile-Savings-${randomNum}`;
        
        await dashboardPage.addNewAccount('Savings Account', accountName, '2500.00');
        await dashboardPage.verifyAccountDisplayedWithBalance(accountName, '2500.00');
        
        // Capture mobile screenshot
        await helperMethods.takeScreenshot('mobile-account-created', 'TC04-Dashboard-Mobile');
    });

});
