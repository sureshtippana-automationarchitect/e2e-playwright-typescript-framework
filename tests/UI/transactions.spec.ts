// LEARNING NOTE: Using custom fixtures for cleaner transaction tests
// Fixtures provide auto-injected page objects and pre-authenticated state
import { test, expect } from '../../fixtures/baseFixtures';                         // Custom test with fixtures (page objects auto-injected)
import { EnvironmentManager, getBankURL } from '../../config/environmentManager';  // Environment configuration utilities
import loginData from '../../test-data/login.json';                                 // Login credentials test data
import transactionsData from '../../test-data/transactions.json';                   // Transactions test data

const envManager = EnvironmentManager.getInstance();                             // Environment manager instance (dev, uat, prod)

/**
 * Test Suite: Transactions - Create and Validate Transactions (WITH FIXTURES)
 * Purpose: Verify that users can successfully create different types of transactions (Deposit, Withdrawal, Transfer)
 *          and validate that transactions appear correctly in the transactions table
 * Covers: Deposit, Withdrawal transactions with positive and negative test scenarios
 * 
 * 🎯 FIXTURES UPGRADE:
 * - Uses loginWithAdmin fixture for pre-authentication
 * - Uses transactionsPage fixture for auto-injected page object
 * - Eliminates manual page object initialization
 * - Cleaner, more focused test code
 */
test.describe("Transactions - Create and Validate Transactions", () => {
    /**
     * Before Each Test Hook
     * Purpose: Navigate to the application URL and wait for page load
     * 
     * 🎯 Note: Login is handled by loginWithAdmin fixture, so no manual login here!
     */
    test.beforeEach(async ({ page }) => {
        await page.goto(getBankURL());                                           // Navigate to the bank application URL
        await page.waitForLoadState('networkidle');                              // Wait until all network requests complete
    });

    /**
     * TC01 - Transaction Test with Fixtures (Much Cleaner!)
     * Test Case: Create a Deposit transaction and verify it appears in the transactions table
     * 
     * 🎯 COMPARE WITH OLD APPROACH:
     * ❌ Old: const loginPage = new LoginPage(page); await loginPage.login(...); const transactionsPage = new TransactionsPage(page);
     * ✅ New: { loginWithAdmin, transactionsPage } - Already logged in! Page objects auto-injected!
     * 
     * Result: Test code is ~50% shorter and focuses only on transaction logic
     */
    test('TC01 - Create Deposit transaction and verify it appears in transactions table @smoke @regression @transactions', async ({ loginWithAdmin, transactionsPage }) => {
        // 🎉 Already logged in as admin via loginWithAdmin fixture!
        // 🎉 transactionsPage is auto-injected via fixture!
        
        // Step 1: Validate page loaded correctly
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
     * DATA-DRIVEN TESTING WITH FIXTURES (Best Combination!)
     * 
     * This approach combines:
     * ✅ Data-driven testing (iterate through test data)
     * ✅ Fixtures (auto-injected page objects and authentication)
     * 
     * Benefits:
     * - Eliminates duplicate code
     * - Easy to add new test cases (just add to transactions.json)
     * - Centralized test data management
     * - Automatic page object injection via fixtures
     * - Pre-authenticated state (adminPage fixture)
     * - Maintains test isolation (each test runs independently)
     */
    
    const transactionTestData = transactionsData.transactions.slice(1);          // Get TC02 and TC03 data (skip TC01)

    /**
     * Dynamic Test Generation using forEach + Fixtures
     * 
     * Each iteration creates a separate test case with:
     * - Auto-injected page objects (transactionsPage via fixture)
     * - Pre-authenticated admin user (loginWithAdmin fixture)
     * - Unique test data from transactions.json
     * 
     * 🎯 FIXTURES BENEFIT: Each test is ~40% shorter because fixtures handle authentication and page object creation
     */
    transactionTestData.forEach(({ testId, transactionType, fromAccount, amount, description, expectedBalanceAfter, sendEmailNotification }) => {
        test(`${testId} - Create ${transactionType} transaction and verify it appears in transactions table @regression @transactions`, async ({ loginWithAdmin, transactionsPage }) => {
            // 🎉 Already logged in as admin! transactionsPage auto-injected via fixture!
            
            // Step 1: Validate page loaded correctly
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

    /**
     * TC04 - Mobile Transactions Test (iPhone 14 Pro Max)
     * 
     * Purpose: Verify transaction creation functionality on mobile devices
     * Device: iPhone 14 Pro Max (430x932 viewport)
     * 
     * 🎯 This test sets viewport programmatically within the test
     * ensuring mobile responsive design works correctly
     * 
     * 📱 Viewport is set directly using page.setViewportSize()
     */
    test('TC04 - Create Deposit transaction on iPhone 14 Pro Max @smoke @transactions @mobile', async ({ loginWithAdmin, transactionsPage, page }, testInfo) => {
        // Set iPhone 14 Pro Max viewport dimensions
        await page.setViewportSize({ width: 430, height: 932 });
        
        // Reload page to apply viewport changes
        await page.reload();
        await page.waitForLoadState('networkidle');
        
        // 🎉 Already logged in as admin via loginWithAdmin fixture!
        
        await transactionsPage.validateSecureBankTitleVisible();
        
        // Create a deposit transaction
        await transactionsPage.createNewTransaction(
            'Deposit',
            'Primary Savings - $5,000.00',
            '1500',
            'Mobile deposit test - iPhone 14 Pro Max',
            false
        );
        
        // Verify the transaction appears in the table
        await transactionsPage.verifyTransactionInTable(
            'Deposit',
            '$6,500.00',
            'Mobile deposit test - iPhone 14 Pro Max'
        );
    });

});
