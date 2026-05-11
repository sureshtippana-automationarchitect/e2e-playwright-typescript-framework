// LEARNING NOTE: Using custom fixtures for cleaner, more maintainable tests
// Fixtures automatically inject page objects - no need for 'new LoginPage(page)'
import { test, expect } from '../fixtures/baseFixtures';                         // Custom test with fixtures (page objects auto-injected)
import { EnvironmentManager, getBankURL } from '../config/environmentManager';  // Environment configuration utilities
import loginData from '../test-data/login.json';                                 // Login credentials test data

const envManager = EnvironmentManager.getInstance();                             // Environment manager instance (dev, uat, prod)

test.describe("Launch URL and verify the home page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(getBankURL());              // Navigate to the bank application URL
        await page.waitForLoadState('networkidle'); // Wait until all network requests complete
    });

    /**
     * TC01 - Admin Login Test with Fixtures
     * 
     * 🎯 NOTICE: Using 'loginPage' fixture instead of manually creating LoginPage
     * ✅ Old: const loginPage = new LoginPage(page);
     * ✅ New: loginPage is auto-injected via fixture parameter
     * 
     * This test uses the loginPage fixture (NOT adminPage) because we want to test the login flow
     */
    test('TC01 - admin login with "Full access" @smoke @regression @login', async ({ loginPage }) => {
        // ✅ loginPage is auto-injected via fixtures - no manual initialization needed!
        await loginPage.login(loginData.validUsers.admin.username, loginData.validUsers.admin.password);               // Login with admin credentials
        await loginPage.validateTitleAfterSuccessfulLogin(loginData.validUsers.admin.expectedTitle);                   // Validate page title after successful login
    });

    /**
     * TC02 - Viewer Login Test with Fixtures
     * 
     * Uses loginPage fixture to test viewer login flow
     */
    test('TC02 - viewer login with "Read-only access" @regression @login', async ({ loginPage }) => {
        // ✅ loginPage fixture provides clean, reusable page object
        await loginPage.login(loginData.validUsers.viewer.username, loginData.validUsers.viewer.password);             // Login with viewer credentials
        await loginPage.validateTitleAfterSuccessfulLogin(loginData.validUsers.viewer.expectedTitle);                  // Validate page title after successful login
    });

    /**
     * TC03 - Negative Test Case: Invalid Credentials (with Fixtures)
     * 
     * Purpose: Verify that the system properly handles invalid login attempts
     * and displays an appropriate error message to the user.
     * 
     * This test ensures:
     * - Invalid credentials are rejected by the system
     * - User-friendly error message is displayed
     * - Security measures are in place (no specific detail about what's wrong)
     * - User remains on the login page (not redirected)
     * 
     * 🎯 Uses loginPage fixture for cleaner code
     */
    test('TC03 - login with invalid credentials and verify error message @regression @login @negative', async ({ loginPage }) => {
        // ✅ loginPage fixture auto-injected - ready to use immediately
        
        // Attempt login with invalid credentials (test data from login.json for consistency)
        await loginPage.login(loginData.invalidUser.username, loginData.invalidUser.password);
        
        // Verify error message is displayed (Expected: "⚠️ Invalid username or password. Please try again.")
        await loginPage.validateLoginErrorMessage();
    });

    /**
     * TC04 - Mobile Safari Login Test (iPhone 14 Pro Max)
     * 
     * Purpose: Verify login functionality on mobile devices
     * Device: iPhone 14 Pro Max (430x932 viewport)
     * 
     * 🎯 This test sets viewport programmatically within the test
     * ensuring mobile responsive design works correctly without project configuration
     * 
     * 📱 Viewport is set directly using page.setViewportSize()
     */
    test('TC04 - admin login on iPhone 14 Pro Max @smoke @login @mobile', async ({ loginPage, page }, testInfo) => {
        // Set iPhone 14 Pro Max viewport dimensions
        await page.setViewportSize({ width: 430, height: 932 });
        
        // Reload page to apply viewport changes
        await page.reload();
        await page.waitForLoadState('networkidle');
        
        await loginPage.login(loginData.validUsers.admin.username, loginData.validUsers.admin.password);
        await loginPage.validateTitleAfterSuccessfulLogin(loginData.validUsers.admin.expectedTitle);
    });

});