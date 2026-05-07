import { test } from '@playwright/test';
import { EnvironmentManager, getBankURL } from '../config/environmentManager';
import loginData from '../test-data/login.json';
import LoginPage from '../pages/loginPage';

const envManager = EnvironmentManager.getInstance();

test.describe("Launch URL and verify the home page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(getBankURL());
        await page.waitForLoadState('networkidle');
    });

    test('TC01 - admin login with "Full access"', async ({ page }) => {
        // Initialize the LoginPage class and perform login
        const loginPage = new LoginPage(page);
        await loginPage.login(loginData.username, loginData.password);
        // Validate that the page title is correct after successful login
        await loginPage.validateTitleAfterSuccessfulLogin('SecureBank');
    });

    test('TC02 - viewer login with "Read-only access"', async ({ page }) => {
        // Initialize the LoginPage class and perform login with viewer credentials
        const loginPage = new LoginPage(page);
        await loginPage.login('viewer', 'viewer123');
        // Validate that the page title is correct after successful login
        await loginPage.validateTitleAfterSuccessfulLogin('SecureBank');
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
    test('TC03 - login with invalid credentials and verify error message', async ({ page }) => {
        // Initialize the LoginPage class
        const loginPage = new LoginPage(page);
        
        // Attempt to login with invalid credentials (both username and password are incorrect)
        await loginPage.login('invaliduser', 'invalidpassword');
        
        // Verify that the error message is displayed
        // Expected message: "⚠️ Invalid username or password. Please try again."
        await loginPage.validateLoginErrorMessage();
    });

});