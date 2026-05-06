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

    test('TC01 - login with valid username and password for successful login', async ({ page }) => {
        // Initialize the LoginPage class and perform login
        const loginPage = new LoginPage(page);
        await loginPage.login(loginData.username, loginData.password);
        // Validate that the page title is correct after successful login
        await loginPage.validateTitleAfterSuccessfulLogin('SecureBank');
    });

});