/**
 * FIXTURES LEARNING GUIDE
 * 
 * This file demonstrates the difference between traditional approach and fixtures approach.
 * Compare the code side-by-side to understand the benefits of fixtures.
 */

import { test as traditionalTest } from '@playwright/test';
import { test, expect } from '../../fixtures/baseFixtures';
import { getBankURL } from '../../config/environmentManager';
import loginData from '../../test-data/login.json';
import dashboardData from '../../test-data/dashboard.json';
import LoginPage from '../../pages/loginPage';
import DashboardPage from '../../pages/dashboardPage';

// ============================================================================
// TRADITIONAL APPROACH (What you currently have)
// ============================================================================

traditionalTest.describe('Traditional Approach - WITHOUT Fixtures', () => {
    traditionalTest.beforeEach(async ({ page }) => {
        await page.goto(getBankURL());
        await page.waitForLoadState('networkidle');
    });

    traditionalTest('Example: Add account (traditional way)', async ({ page }) => {
        // ❌ Manual page object creation (repeated in every test)
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        // ❌ Manual login (repeated in every dashboard test)
        await loginPage.login(
            loginData.validUsers.admin.username,
            loginData.validUsers.admin.password
        );
        await dashboardPage.validateSecureBankTitleVisible();

        // ✅ Actual test logic (what you really care about)
        await dashboardPage.addNewAccount(
            'Savings Account',
            'Test Account',
            '1000.00'
        );
        await dashboardPage.verifyAccountDisplayedWithBalance('Test Account', '1000.00');
    });

    traditionalTest('Example: Verify dashboard title (traditional way)', async ({ page }) => {
        // ❌ Repeating the same initialization code AGAIN
        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        // ❌ Repeating the same login code AGAIN
        await loginPage.login(
            loginData.validUsers.admin.username,
            loginData.validUsers.admin.password
        );

        // ✅ Actual test logic
        await dashboardPage.validateSecureBankTitleVisible();
    });
});

// ============================================================================
// FIXTURES APPROACH (Modern, cleaner approach)
// ============================================================================

test.describe('Fixtures Approach - WITH Fixtures', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(getBankURL());
        await page.waitForLoadState('networkidle');
    });

    /**
     * APPROACH 1: Using Page Object Fixtures (Basic)
     * Page objects are automatically created, but you still handle login
     */
    test('Example 1: Using page object fixtures', async ({ loginPage, dashboardPage }) => {
        // ✅ Page objects auto-injected (no manual 'new LoginPage(page)')
        await loginPage.login(
            loginData.validUsers.admin.username,
            loginData.validUsers.admin.password
        );
        await dashboardPage.validateSecureBankTitleVisible();

        // ✅ Actual test logic
        await dashboardPage.addNewAccount(
            'Savings Account',
            'Test Account',
            '1000.00'
        );
    });

    /**
     * APPROACH 2: Using Authenticated Fixtures (Advanced)
     * Already logged in! Skip the login steps entirely
     */
    test('Example 2: Using authenticated fixture (loginWithAdmin)', async ({ loginWithAdmin, dashboardPage }) => {
        // ✅ Already logged in as admin! No login code needed!
        // ✅ Jump straight to test logic
        await dashboardPage.addNewAccount(
            'Savings Account',
            'Test Account',
            '1000.00'
        );
        await dashboardPage.verifyAccountDisplayedWithBalance('Test Account', '1000.00');
    });

    /**
     * APPROACH 3: Using Multiple Fixtures
     * Mix and match as needed
     */
    test('Example 3: Using helper methods fixture', async ({ loginWithAdmin, dashboardPage, helperMethods }) => {
        // ✅ Already logged in
        // ✅ All fixtures available
        await dashboardPage.addNewAccount('Checking Account', 'My Checking', '2500.00');
        
        // ✅ Can use helper methods directly
        await helperMethods.takeScreenshot('account-added', 'FixturesExample');
    });

    /**
     * APPROACH 4: Tests that only need page objects (no auth)
     * For login tests, you don't want pre-authentication
     */
    test('Example 4: Login test using fixtures', async ({ loginPage }) => {
        // ✅ Use loginPage fixture without authentication
        await loginPage.login(
            loginData.validUsers.admin.username,
            loginData.validUsers.admin.password
        );
        await loginPage.validateTitleAfterSuccessfulLogin('SecureBank');
    });
});

// ============================================================================
// COMPARISON SUMMARY
// ============================================================================

/**
 * CODE COMPARISON:
 * 
 * Traditional (11 lines of setup):
 * ─────────────────────────────────
 * test('My test', async ({ page }) => {
 *     const loginPage = new LoginPage(page);              // Line 1
 *     const dashboardPage = new DashboardPage(page);      // Line 2
 *     await loginPage.login(username, password);          // Lines 3-6
 *     await dashboardPage.validateSecureBankTitleVisible(); // Line 7
 *     
 *     // Actual test logic starts here (Line 8+)
 *     await dashboardPage.addNewAccount(...);
 * });
 * 
 * With Fixtures (2 lines of setup):
 * ──────────────────────────────────
 * test('My test', async ({ loginWithAdmin, dashboardPage }) => {
 *     // Already logged in!
 *     // Actual test logic starts immediately
 *     await dashboardPage.addNewAccount(...);
 * });
 * 
 * 
 * BENEFITS BREAKDOWN:
 * 
 * 1. LESS CODE:
 *    Traditional: 11 lines of setup per test
 *    Fixtures:    0-2 lines of setup per test
 *    Saved:       80-90% reduction in boilerplate
 * 
 * 2. BETTER READABILITY:
 *    Traditional: Scan through setup code to find test logic
 *    Fixtures:    Test logic is immediately visible
 * 
 * 3. MAINTAINABILITY:
 *    Traditional: Change login logic in 50 places
 *    Fixtures:    Change once in baseFixtures.ts
 * 
 * 4. TYPE SAFETY:
 *    Traditional: Easy to forget to import page objects
 *    Fixtures:    TypeScript auto-suggests available fixtures
 * 
 * 5. PERFORMANCE:
 *    Traditional: Login via UI every time (slow)
 *    Fixtures:    Can use storage state to cache auth (fast)
 * 
 * 6. FLEXIBILITY:
 *    Traditional: All tests run same beforeEach
 *    Fixtures:    Each test gets only what it needs
 * 
 * 
 * WHEN TO USE WHICH:
 * 
 * Use loginPage fixture:
 *   ✓ Login tests
 *   ✓ Tests that need to test login flow
 *   ✓ Negative login tests
 * 
 * Use loginWithAdmin fixture:
 *   ✓ Dashboard tests
 *   ✓ Transaction tests
 *   ✓ Any test needing admin access
 *   ✓ Tests that don't care about login
 * 
 * Use loginWithViewer fixture:
 *   ✓ Read-only permission tests
 *   ✓ Tests verifying viewer restrictions
 * 
 * Use page object fixtures only:
 *   ✓ When you want manual control
 *   ✓ Testing multiple user flows in one test
 */
