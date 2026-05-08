import { test } from '@playwright/test';                                       // Playwright testing framework
import { EnvironmentManager, getBankURL } from '../config/environmentManager';  // Environment configuration utilities
import loginData from '../test-data/login.json';                                 // Login credentials test data
import LoginPage from '../pages/loginPage';                                      // Page Object Model - Login page

const envManager = EnvironmentManager.getInstance();                             // Environment manager instance (dev, uat, prod)

test.describe("Launch URL and verify the home page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(getBankURL());              // Navigate to the bank application URL
        await page.waitForLoadState('networkidle'); // Wait until all network requests complete
    });

    test('TC01 - admin login with "Full access" @smoke @regression @login', async ({ page }) => {
        const loginPage = new LoginPage(page);                                                                          // Initialize LoginPage
        await loginPage.login(loginData.validUsers.admin.username, loginData.validUsers.admin.password);               // Login with admin credentials
        await loginPage.validateTitleAfterSuccessfulLogin(loginData.validUsers.admin.expectedTitle);                   // Validate page title after successful login
    });

    test('TC02 - viewer login with "Read-only access" @regression @login', async ({ page }) => {
        const loginPage = new LoginPage(page);                                                                          // Initialize LoginPage
        await loginPage.login(loginData.validUsers.viewer.username, loginData.validUsers.viewer.password);             // Login with viewer credentials
        await loginPage.validateTitleAfterSuccessfulLogin(loginData.validUsers.viewer.expectedTitle);                  // Validate page title after successful login
    });

    /**
     * TC03 - Negative Test Case: Invalid Credentials
     * 
     * Purpose: Verify that the system properly handles invalid login attempts
     * and displays an appropriate error message to the user.
     * 
     * This test ensures:
     * - Invalid credentials are rejected by the system
     * - User-friendly error message is displayed
     * - Security measures are in place (no specific detail about what's wrong)
     * - User remains on the login page (not redirected)
     */
    test('TC03 - login with invalid credentials and verify error message @regression @login @negative', async ({ page }) => {
        const loginPage = new LoginPage(page);                                                                          // Initialize LoginPage
        
        // Attempt login with invalid credentials (test data from login.json for consistency)
        await loginPage.login(loginData.invalidUser.username, loginData.invalidUser.password);
        
        // Verify error message is displayed (Expected: "⚠️ Invalid username or password. Please try again.")
        await loginPage.validateLoginErrorMessage();
    });

});