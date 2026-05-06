import { Locator, Page, expect } from '@playwright/test';

/**
 * HelperMethods class provides reusable utility methods for common Playwright operations
 * including element interactions, waiting strategies, and logging actions.
 */
export class HelperMethods {
    private page: Page;
    private readonly defaultTimeout: number = 60000;

    /**
     * Constructor to initialize the HelperMethods class
     * @param page - Playwright Page instance
     */
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Waits for an element to be hidden
     * @param locator - Playwright Locator
     * @param timeout - Maximum wait time in milliseconds (default: 60000)
     */
    async waitForElementToBeHidden(locator: Locator, timeout: number = 60000): Promise<void> {
        await locator.waitFor({ state: 'hidden', timeout });
    }

    /**
     * Waits until a locator is visible, validates it, and returns it
     * @param locator - Playwright Locator
     * @param timeout - Maximum wait time in milliseconds (default: 60000)
     * @returns The visible locator
     */
    async waitForElementToBeVisible(locator: Locator, timeout: number = 60000): Promise<Locator> {
        await locator.waitFor({ state: 'visible', timeout });
        await expect(locator).toBeVisible();
        return locator;
    }

    /**
     * Waits until a locator is hidden, validates it, and returns it
     * @param locator - Playwright Locator
     * @param timeout - Maximum wait time in milliseconds (default: 40000)
     * @returns The hidden locator
     */
    async waitForElementNotToBeVisible(locator: Locator, timeout: number = 40000): Promise<Locator> {
        await locator.waitFor({ state: 'hidden', timeout });
        await expect(locator).not.toBeVisible();
        return locator;
    }

    /**
     * Validates that an element is visible and logs a message
     * @param locator - Playwright Locator
     * @param logMessage - Message to log after validation
     */
    async validate(locator: Locator, logMessage: string): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        console.log(logMessage);
    }

    /**
     * Validates that an element has a specific value and logs a message
     * @param locator - Playwright Locator
     * @param expectedValue - Expected value
     * @param logMessage - Message to log after validation
     */
    async validateValue(locator: Locator, expectedValue: string, logMessage: string): Promise<void> {
        await expect(locator).toHaveValue(expectedValue);
        console.log(logMessage);
    }

    /**
     * Validates that an element has a specific value and logs a message
     * @param locator - Playwright Locator
     * @param expectedValue - Expected value
     * @param logMessage - Message to log after validation
     */
    async validateTextContains(locator: Locator, expectedValue: string, logMessage: string): Promise<void> {
        await expect(locator).toContainText(expectedValue);
        console.log(logMessage);
    }

    /**
     * Validates that page has a specific URL and logs a message
     * @param page - Playwright Page
     * @param expectedUrl - Expected URL (string or RegExp)
     * @param logMessage - Message to log after validation
     */
    async validateUrl(page: Page, expectedUrl: string | RegExp, logMessage: string): Promise<void> {
        await expect(page).toHaveURL(expectedUrl);
        console.log(logMessage);
    }

    /**
     * Validates that page has a specific title and logs a message
     * @param page - Playwright Page
     * @param expectedTitle - Expected title
     * @param logMessage - Message to log after validation
     */
    async validateTitle(page: Page, expectedTitle: string, logMessage: string): Promise<void> {
        await expect(page).toHaveTitle(expectedTitle);
        console.log(logMessage);
    }

    /**
     * Validates that an element has a specific attribute value and logs a message
     * @param locator - Playwright Locator
     * @param attributeName - Attribute name
     * @param expectedValue - Expected attribute value
     * @param logMessage - Message to log after validation
     */
    async validateAttribute(locator: Locator, attributeName: string, expectedValue: string, logMessage: string): Promise<void> {
        await expect(locator).toHaveAttribute(attributeName, expectedValue);
        console.log(logMessage);
    }

    /**
     * Clicks an element after waiting for it to be visible and logs the action
     * @param locator - Playwright Locator
     * @param logMessage - Message to log after clicking
     */
    async clickElement(locator: Locator, logMessage: string): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        await locator.click();
        console.log(logMessage);
    }

    /**
     * Fills an input field after clearing it and logs the action
     * @param locator - Playwright Locator
     * @param value - Value to fill in the input
     * @param logMessage - Message to log after filling
     */
    async fillInput(locator: Locator, value: string, logMessage: string): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        await locator.clear();
        await locator.fill(value);
        console.log(logMessage);
    }

    /**
     * Types input character by character to trigger auto-complete/auto-suggest functionality.
     * Use this for fields with auto-suggestions instead of fillInput().
     * @param locator - Playwright Locator
     * @param value - Value to type
     * @param logMessage - Message to log after typing
     * @param delay - Delay between keystrokes in milliseconds (default: 50ms)
     */
    async typeInput(locator: Locator, value: string, logMessage: string, delay: number = 50): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        await locator.clear();
        await locator.pressSequentially(value, { delay });
        console.log(logMessage);
    }

    /**
     * Gets the text content of an element
     * @param locator - Playwright Locator
     * @returns Text content of the element
     */
    async getText(locator: Locator): Promise<string> {
        await this.waitForElementToBeVisible(locator);
        return await locator.textContent() || '';
    }

    /**
     * Checks if an element is visible
     * @param locator - Playwright Locator
     * @returns Boolean indicating visibility
     */
    async isVisible(locator: Locator): Promise<boolean> {
        try {
            return await locator.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Checks if an element is enabled
     * @param locator - Playwright Locator
     * @returns Boolean indicating if element is enabled
     */
    async isEnabled(locator: Locator): Promise<boolean> {
        return await locator.isEnabled();
    }

    /**
     * Hovers over an element
     * @param locator - Playwright Locator
     */
    async hover(locator: Locator): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        await locator.hover();
    }

    /**
     * Selects an option from a dropdown
     * @param locator - Playwright Locator
     * @param value - Value to select
     */
    async selectOption(locator: Locator, value: string): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        await locator.selectOption(value);
    }

    // Get current date and time in MMDDHHmmss format
    async getCurrentDateTime(): Promise<string> {
        const now = new Date();
        console.log("date is:", now);
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        return `${month}${day}${hours}${minutes}${seconds}`;
    }

    /**
     * Check an element after waiting for it to be visible and logs the action
     * @param locator - Playwright Locator
     * @param logMessage - Message to log after clicking
     */
    async checkElement(locator: Locator, logMessage: string): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        await locator.check();
        console.log(logMessage);
    }

    /**
     * Double clicks an element after waiting for it to be visible and logs the action
     * @param locator - Playwright Locator
     * @param logMessage - Message to log after double clicking
     */
    async doubleclickElement(locator: Locator, logMessage: string): Promise<void> {
        await this.waitForElementToBeVisible(locator);
        await locator.dblclick();
        console.log(logMessage);
    }

}

/**
 * Display step indicator banner on screen for video recording
 * Injects a styled banner showing current step progress and description
 * @param page - Playwright Page instance
 * @param stepNumber - Current step number
 * @param totalSteps - Total number of steps in the test
 * @param stepDescription - Description of the current step
 * @param status - Status of the step: 'in-progress' (default) or 'completed'
 */
export async function showStepIndicator(
    page: Page,
    stepNumber: number,
    totalSteps: number,
    stepDescription: string,
    status: 'in-progress' | 'completed' = 'in-progress'
): Promise<void> {
    const statusIcon = status === 'completed' ? '✅' : '🔄';
    const bgColor = status === 'completed' ? '#10b981' : '#3b82f6';

    await page.evaluate(
        ({ step, total, description, icon, color }: { step: number; total: number; description: string; icon: string; color: string }) => {
            // Remove existing banner if present
            const existingBanner = document.getElementById('playwright-step-banner');
            if (existingBanner) {
                existingBanner.remove();
            }

            // Create banner element
            const banner = document.createElement('div');
            banner.id = 'playwright-step-banner';
            banner.innerHTML = `
                <div style="
                    position: fixed;
                    top: 70px;
                    left: 0;
                    right: 0;
                    background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);
                    color: white;
                    padding: 16px 24px;
                    font-family: 'Segoe UI', Arial, sans-serif;
                    font-size: 16px;
                    font-weight: 600;
                    z-index: 999999;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    animation: slideDown 0.3s ease-out;
                ">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 20px;">${icon}</span>
                        <span style="background: rgba(255, 255, 255, 0.2); padding: 4px 12px; border-radius: 12px; font-size: 14px;">
                            Step ${step}/${total}
                        </span>
                        <span style="font-size: 16px;">${description}</span>
                    </div>
                </div>
            `;

            // Add animation style
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideDown {
                    from {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(banner);
        },
        { step: stepNumber, total: totalSteps, description: stepDescription, icon: statusIcon, color: bgColor }
    );

    // Keep banner visible for a short moment
    await page.waitForTimeout(1000);
}