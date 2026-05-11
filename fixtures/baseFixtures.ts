import { test as base, Page } from '@playwright/test';
import { HelperMethods } from '../helpers/helperMethodsUI';
import LoginPage from '../pages/loginPage';
import DashboardPage from '../pages/dashboardPage';
import TransactionsPage from '../pages/transactionsPage';
import { getBankURL } from '../config/environmentManager';
import loginData from '../test-data/login.json';

/**
 * Custom Fixtures Type Definition
 * 
 * Fixtures are Playwright's way of providing reusable setup and teardown logic.
 * Think of them as dependency injection for your tests.
 * 
 * Benefits:
 * 1. Automatic initialization - No need to create page objects manually
 * 2. Reusable authentication - Login once, use in multiple tests
 * 3. Cleaner test code - Focus on test logic, not setup
 * 4. Better maintainability - Centralized configuration
 * 5. Type safety - Full TypeScript support
 */
type CustomFixtures = {
    // Helper Methods - Reusable UI interaction utilities
    helperMethods: HelperMethods;

    // Page Objects - Automatically initialized with page instance
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    transactionsPage: TransactionsPage;

    // Authenticated Pages - Pre-logged-in states for faster test execution
    loginWithAdmin: Page;                     // Page with admin user already logged in
    loginWithViewer: Page;                    // Page with viewer user already logged in
};

/**
 * Extended Playwright Test with Custom Fixtures
 * 
 * This exports a new 'test' object that includes all standard Playwright fixtures
 * PLUS your custom fixtures defined above.
 * 
 * Usage in tests:
 * import { test } from '../fixtures/baseFixtures';
 * test('My test', async ({ loginPage, dashboardPage }) => { ... });
 */
export const test = base.extend<CustomFixtures>({
    /**
     * Helper Methods Fixture
     * Provides access to all reusable UI interaction methods
     * 
     * Scope: test - Created fresh for each test
     * Auto: false - Only created when explicitly used in test
     */
    helperMethods: async ({ page }, use) => {
        const helper = new HelperMethods(page);
        await use(helper);
    },

    /**
     * Login Page Fixture
     * Automatically creates and provides LoginPage instance
     * 
     * Example:
     * test('Login test', async ({ loginPage }) => {
     *     await loginPage.login('admin', 'password');
     * });
     */
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    /**
     * Dashboard Page Fixture
     * Automatically creates and provides DashboardPage instance
     * 
     * Example:
     * test('Dashboard test', async ({ dashboardPage }) => {
     *     await dashboardPage.addNewAccount(...);
     * });
     */
    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },

    /**
     * Transactions Page Fixture
     * Automatically creates and provides TransactionsPage instance
     */
    transactionsPage: async ({ page }, use) => {
        const transactionsPage = new TransactionsPage(page);
        await use(transactionsPage);
    },

    /**
     * Login With Admin Fixture - Pre-authenticated Admin User
     * 
     * This fixture provides a page that is already logged in as an admin user.
     * Perfect for tests that don't need to test login but need admin access.
     * 
     * Benefits:
     * - Faster test execution (skip login UI interaction)
     * - Reusable authentication state
     * - Can use Playwright's storage state for even faster execution
     * 
     * Usage:
     * test('Admin dashboard test', async ({ loginWithAdmin, dashboardPage }) => {
     *     // Already logged in as admin!
     *     await dashboardPage.addNewAccount(...);
     * });
     */
    loginWithAdmin: async ({ page }, use) => {
        // Navigate to application
        await page.goto(getBankURL());
        await page.waitForLoadState('networkidle');

        // Perform admin login
        const loginPage = new LoginPage(page);
        await loginPage.login(
            loginData.validUsers.admin.username,
            loginData.validUsers.admin.password
        );

        // Wait for successful login (dashboard should be visible)
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.validateSecureBankTitleVisible();

        // Provide the authenticated page to the test
        await use(page);

        // Cleanup happens automatically after test
    },

    /**
     * Login With Viewer Fixture - Pre-authenticated Viewer User
     * 
     * Similar to loginWithAdmin but with viewer (read-only) credentials.
     * Use for tests that need viewer-level access.
     * 
     * Usage:
     * test('Viewer dashboard test', async ({ loginWithViewer, dashboardPage }) => {
     *     // Already logged in as viewer!
     *     await dashboardPage.validateSecureBankTitleVisible();
     * });
     */
    loginWithViewer: async ({ page }, use) => {
        // Navigate to application
        await page.goto(getBankURL());
        await page.waitForLoadState('networkidle');

        // Perform viewer login
        const loginPage = new LoginPage(page);
        await loginPage.login(
            loginData.validUsers.viewer.username,
            loginData.validUsers.viewer.password
        );

        // Wait for successful login
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.validateSecureBankTitleVisible();

        // Provide the authenticated page to the test
        await use(page);

        // Cleanup happens automatically after test
    }
});

/**
 * Re-export 'expect' from Playwright
 * This allows tests to import both 'test' and 'expect' from the same file
 * 
 * Usage:
 * import { test, expect } from '../fixtures/baseFixtures';
 */
export { expect } from '@playwright/test';

/**
 * FIXTURE PATTERNS EXPLAINED
 * 
 * 1. Basic Fixture:
 *    Automatically initializes page objects
 *    test('My test', async ({ loginPage }) => { ... });
 * 
 * 2. Authenticated Fixture:
 *    Provides pre-logged-in state
 *    test('My test', async ({ adminPage, dashboardPage }) => { ... });
 * 
 * 3. Multiple Fixtures:
 *    Use as many as you need
 *    test('My test', async ({ loginPage, dashboardPage, helperMethods }) => { ... });
 * 
 * 4. Standard + Custom:
 *    Mix with Playwright's built-in fixtures
 *    test('My test', async ({ page, loginPage, context }) => { ... });
 * 
 * WHY FIXTURES ARE BETTER THAN BEFOREEACH:
 * 
 * ❌ beforeEach approach:
 *    - Runs for EVERY test (even if not needed)
 *    - Can't be selectively applied
 *    - Hard to compose multiple setups
 *    - No dependency injection
 * 
 * ✅ Fixtures approach:
 *    - Only runs when test uses it
 *    - Composable (mix and match)
 *    - Type-safe
 *    - Automatic cleanup
 *    - Can be shared across test files
 */
