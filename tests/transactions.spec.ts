import { test } from '@playwright/test';                                       // Playwright testing framework
import { EnvironmentManager, getBankURL } from '../config/environmentManager';  // Environment configuration utilities
import loginData from '../test-data/login.json';                                 // Login credentials test data
import transactionsData from '../test-data/transactions.json';                   // Transactions test data
import LoginPage from '../pages/loginPage';                                      // Page Object Model - Login page
import TransactionsPage from '../pages/transactionsPage';                        // Page Object Model - Transactions page

const envManager = EnvironmentManager.getInstance();                             // Environment manager instance (dev, uat, prod)

/**
 * Test Suite: Transactions - Create and Validate Transactions
 * Purpose: Verify that users can successfully create different types of transactions (Deposit, Withdrawal, Transfer)
 *          and validate that transactions appear correctly in the transactions table
 * Covers: Deposit, Withdrawal transactions with positive and negative test scenarios
 */
test.describe("Transactions - Create and Validate Transactions", () => {
    /**
     * Before Each Test Hook
     * Runs before every test case in this suite
     * Purpose: Navigate to the application URL, login, and navigate to Transactions page
     */
    test.beforeEach(async ({ page }) => {
        await page.goto(getBankURL());                                           // Navigate to the bank application URL
        await page.waitForLoadState('networkidle');                              // Wait until all network requests complete
        
        // Login to the application with admin credentials
        const loginPage = new LoginPage(page);                                   // Initialize LoginPage
        await loginPage.login(loginData.validUsers.admin.username, loginData.validUsers.admin.password);
        
        // Navigate to Transactions page
        const transactionsPage = new TransactionsPage(page);                     // Initialize TransactionsPage
        // await transactionsPage.navigateToTransactions();                         // Click Transactions nav link
    });

    /**
     * TC01 - Traditional Approach (For Learning Purpose)
     * Test Case: Create a Deposit transaction and verify it appears in the transactions table
     * 
     * This test demonstrates the standard, step-by-step approach to writing transaction tests.
     * It's kept separate to help new team members understand the complete flow of:
     * 1. Opening the transaction modal
     * 2. Filling out the transaction form
     * 3. Submitting the transaction
     * 4. Verifying the transaction details in the table
     */
    test('TC01 - Create Deposit transaction and verify it appears in transactions table @smoke @regression @transactions', async ({ page }) => {
        // Step 1: Initialize TransactionsPage
        const transactionsPage = new TransactionsPage(page);                     // Initialize TransactionsPage
        await transactionsPage.validateSecureBankTitleVisible();                 // Validate "SecureBank" title visible

        // Step 2: Prepare test data from transactions.json
        const tc01Data = transactionsData.transactions[0];                       // Get TC01 data (Deposit transaction)

        // Step 3: Create new transaction using the orchestration method
        await transactionsPage.createNewTransaction(
            tc01Data.transactionType as 'Deposit' | 'Withdrawal' | 'Transfer',   // Transaction type with type assertion
            tc01Data.fromAccount,                                                 // From account
            tc01Data.amount,                                                      // Transaction amount
            tc01Data.description,                                                 // Transaction description
            tc01Data.sendEmailNotification                                        // Email notification flag
        );
        // Step 4: Verify the transaction appears in the transactions table with correct details
        await transactionsPage.verifyTransactionInTable(
            tc01Data.transactionType,                                             // Verify transaction type
            tc01Data.expectedBalanceAfter,                                        // Verify balance after transaction
            tc01Data.description                                                  // Verify transaction description
        );
    });

    /**
     * DATA-DRIVEN TESTING APPROACH (Optimized for TC02 and TC03)
     * 
     * This approach demonstrates how to reduce code duplication by using a data array
     * and iterating through it to create multiple test cases with the same logic.
     * 
     * Benefits:
     * - Eliminates duplicate code
     * - Makes it easy to add new test cases (just add to transactions.json)
     * - Centralizes test data management
     * - Maintains test isolation (each test still runs independently)
     */
    
    const transactionTestData = transactionsData.transactions.slice(1);          // Get TC02 and TC03 data (skip TC01 traditional approach)

    /**
     * Dynamic Test Generation using forEach
     * 
     * This forEach loop creates a separate test case for each object in the transactionTestData array.
     * It destructures the object properties and uses them to create parameterized test cases.
     * 
     * The result: Two test cases (TC02 and TC03) with identical logic but different data.
     */
    transactionTestData.forEach(({ testId, transactionType, fromAccount, amount, description, expectedBalanceAfter, sendEmailNotification }) => {
        test(`${testId} - Create ${transactionType} transaction and verify it appears in transactions table @regression @transactions`, async ({ page }) => {
            // Step 1: Initialize TransactionsPage
            const transactionsPage = new TransactionsPage(page);                 // Initialize TransactionsPage
            await transactionsPage.validateSecureBankTitleVisible();             // Validate "SecureBank" title visible

            // Step 2: Create new transaction using data from test data array
            await transactionsPage.createNewTransaction(
                transactionType as 'Deposit' | 'Withdrawal' | 'Transfer',        // Transaction type with type assertion
                fromAccount,                                                      // From account from test data
                amount,                                                           // Transaction amount from test data
                description,                                                      // Transaction description from test data
                sendEmailNotification                                             // Email notification flag from test data
            );

            // Step 3: Verify the transaction appears in the transactions table with correct details
            await transactionsPage.verifyTransactionInTable(
                transactionType,                                                  // Verify transaction type
                expectedBalanceAfter,                                             // Verify balance after transaction
                description                                                       // Verify transaction description
            );
        });
    });

});
