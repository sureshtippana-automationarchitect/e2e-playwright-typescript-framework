import { Page, Request, Response } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * APILogger class provides utility methods for intercepting and logging API requests and responses
 * This helps with debugging API issues and validating API calls during test execution
 */
export class APILogger {
    private page: Page;
    private logDir: string;

    constructor(page: Page) {
        this.page = page;
        this.logDir = path.join(process.cwd(), 'apiLogs');
        this.ensureLogDirectory();
    }

    /**
     * Ensure the apiLogs directory exists
     */
    private ensureLogDirectory(): void {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    /**
     * Write error log to file
     * @param errorData - Error data to log
     */
    private writeErrorToFile(errorData: any): void {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `api-error-${timestamp}.json`;
        const filepath = path.join(this.logDir, filename);

        fs.writeFileSync(filepath, JSON.stringify(errorData, null, 2), 'utf-8');
    }

    /**
     * Check if URL is a static asset (favicon, images, css, js, etc.)
     * @param url - URL to check
     * @returns Boolean indicating if URL is a static asset
     */
    private isStaticAsset(url: string): boolean {
        const staticAssetPatterns = [
            'favicon',
            '.png',
            '.jpg',
            '.jpeg',
            '.gif',
            '.svg',
            '.ico',
            '.css',
            '.js',
            '.woff',
            '.woff2',
            '.ttf',
            '.eot',
            '/static/',
            '/_next/',
            '/chunks/'
        ];

        return staticAssetPatterns.some(pattern => url.toLowerCase().includes(pattern));
    }

    /**
     * Setup API request and response logging with detailed information
     * @param urlFilter - Optional URL filter to log specific APIs (default: logs all requests)
     */
    setupAPILogging(urlFilter: string = ''): void {
        // Intercept and log API requests
        this.page.on('request', (request: Request) => {
            if (this.shouldLog(request.url(), urlFilter)) {
                this.logRequest(request);
            }
        });

        // Intercept and log API responses
        this.page.on('response', async (response: Response) => {
            if (this.shouldLog(response.url(), urlFilter)) {
                await this.logResponse(response);
            }
        });
    }

    /**
     * Setup API logging specifically for error responses (4xx, 5xx)
     * @param urlFilter - Optional URL filter to log specific APIs
     */
    setupErrorLogging(urlFilter: string = ''): void {
        this.page.on('response', async (response: Response) => {
            const url = response.url();

            // Skip static assets
            if (this.isStaticAsset(url)) {
                return;
            }

            if (this.shouldLog(url, urlFilter) && response.status() >= 400) {
                await this.logErrorResponse(response);
            }
        });
    }

    /**
     * Wait for a specific API call and capture its response
     * @param urlPattern - URL pattern to match (can be partial URL or regex pattern)
     * @param timeout - Maximum wait time in milliseconds (default: 30000)
     * @returns Promise with response data
     */
    async waitForAPICall(urlPattern: string, timeout: number = 30000): Promise<any> {
        const response = await this.page.waitForResponse(
            (response) => response.url().includes(urlPattern),
            { timeout }
        );

        const responseBody = await this.getResponseBody(response);
        console.log('Captured API call for pattern:', {
            status: response.status(),
            url: response.url(),
            body: responseBody
        });

        return {
            status: response.status(),
            statusText: response.statusText(),
            url: response.url(),
            body: responseBody
        };
    }

    /**
     * Log request details
     * @param request - Playwright Request object
     */
    private logRequest(request: Request): void {
        const requestData: {
            method: string;
            url: string;
            headers: { [key: string]: string };
            postData?: any;
        } = {
            method: request.method(),
            url: request.url(),
            headers: request.headers(),
        };

        // Add POST data if available
        try {
            const postData = request.postDataJSON();
            if (postData) {
                requestData.postData = postData;
            }
        } catch (e) {
            // If postDataJSON fails, try getting as text
            const postDataText = request.postData();
            if (postDataText) {
                requestData.postData = postDataText;
            }
        }

        console.log('📤 API Request:', requestData);
    }

    /**
     * Log response details
     * @param response - Playwright Response object
     */
    private async logResponse(response: Response): Promise<void> {
        const responseBody = await this.getResponseBody(response);

        const responseData = {
            status: response.status(),
            statusText: response.statusText(),
            url: response.url(),
            headers: response.headers(),
            body: responseBody
        };

        console.log('📥 API Response:', responseData);
    }

    /**
     * Log error response with detailed information
     * @param response - Playwright Response object
     */
    private async logErrorResponse(response: Response): Promise<void> {
        const responseBody = await this.getResponseBody(response);

        const errorData = {
            status: response.status(),
            statusText: response.statusText(),
            url: response.url(),
            errorBody: responseBody,
            timestamp: new Date().toISOString()
        };

        console.error('❌ API ERROR:', errorData);

        // Write to file
        this.writeErrorToFile(errorData);
    }

    /**
     * Get response body as JSON or text
     * @param response - Playwright Response object
     * @returns Response body
     */
    private async getResponseBody(response: Response): Promise<any> {
        try {
            return await response.json();
        } catch (e) {
            try {
                return await response.text();
            } catch (err) {
                return 'Unable to parse response body';
            }
        }
    }

    /**
     * Check if URL should be logged based on filter
     * @param url - Request/Response URL
     * @param filter - URL filter string
     * @returns Boolean indicating if URL matches filter
     */
    private shouldLog(url: string, filter: string): boolean {
        if (!filter) {
            return url.includes('/api/') || url.includes('gotaguy');
        }
        return url.includes(filter);
    }

    /**
 * Wait for and validate onboarding error response
 * @param expectedStatus - Expected HTTP status code (default: 400)
 * @param expectedErrorMessage - Expected error message substring
 * @returns Promise with error response data
 */
    async validateOnboardingErrorResponse(
        expectedStatus: number = 400,
        expectedErrorMessage: string = 'Primary contact name must contain only letters and spaces'
    ): Promise<void> {
        try {
            const errorResponse = await this.page.waitForResponse(
                (response) => {
                    return response.url().includes('/api/v1/consumer') && response.status() === expectedStatus;
                },
                { timeout: 10000 }
            );

            const responseBody = await this.getResponseBody(errorResponse);

            const errorData = {
                status: errorResponse.status(),
                statusText: errorResponse.statusText(),
                url: errorResponse.url(),
                errorBody: responseBody,
                timestamp: new Date().toISOString()
            };

            console.log('📋 Validating API Error Response:', JSON.stringify(errorData, null, 2));

            // Validate status code
            if (errorResponse.status() !== expectedStatus) {
                throw new Error(`Expected status ${expectedStatus}, but got ${errorResponse.status()}`);
            }

            // Validate error message
            const errorMessages = responseBody.message || [];
            const hasExpectedMessage = errorMessages.some((msg: string) =>
                msg.includes(expectedErrorMessage)
            );

            if (!hasExpectedMessage) {
                throw new Error(
                    `Expected error message to contain "${expectedErrorMessage}", but got: ${JSON.stringify(errorMessages)}`
                );
            }

            console.log(`✅ API Error Response validated successfully: Status ${expectedStatus}, Message: "${expectedErrorMessage}"`);

            // Write validation result to file
            this.writeErrorToFile({
                ...errorData,
                validationResult: 'PASSED',
                expectedStatus,
                expectedMessage: expectedErrorMessage
            });

        } catch (error) {
            console.error('❌ API Error Response validation failed:', error);
            throw error;
        }
    }

    /**
     * Generic method to validate any API error response
     * @param urlPattern - URL pattern to match
     * @param expectedStatus - Expected HTTP status code
     * @param validationCallback - Optional callback for custom validation
     */
    async validateAPIErrorResponse(
        urlPattern: string,
        expectedStatus: number,
        validationCallback?: (responseBody: any) => boolean
    ): Promise<any> {
        try {
            const errorResponse = await this.page.waitForResponse(
                (response) => {
                    return response.url().includes(urlPattern) && response.status() === expectedStatus;
                },
                { timeout: 10000 }
            );

            const responseBody = await this.getResponseBody(errorResponse);

            const errorData = {
                status: errorResponse.status(),
                statusText: errorResponse.statusText(),
                url: errorResponse.url(),
                errorBody: responseBody,
                timestamp: new Date().toISOString()
            };

            console.log('📋 API Error Response:', JSON.stringify(errorData, null, 2));

            // Run custom validation if provided
            if (validationCallback && !validationCallback(responseBody)) {
                throw new Error('Custom validation failed for API error response');
            }

            console.log(`✅ API Error Response validated: Status ${expectedStatus}`);

            return errorData;

        } catch (error) {
            console.error('❌ API Error Response validation failed:', error);
            throw error;
        }
    }
}