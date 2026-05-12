/**
 * API Test Helpers
 * 
 * Common utility functions for API testing
 */

/**
 * Generate a random pet ID for testing
 * @returns Random pet ID
 */
export function generateRandomPetId(): number {
    return Math.floor(Math.random() * 100000) + 1000;
}

/**
 * Create a test image buffer (1x1 pixel PNG)
 * @returns Buffer containing a minimal PNG image
 */
export function createTestImageBuffer(): Buffer {
    return Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        'base64'
    );
}

/**
 * Generate pet data with random ID
 * @param basePayload - Base payload object
 * @returns Pet data with random ID
 */
export function generatePetData(basePayload: any): any {
    return {
        ...basePayload,
        id: generateRandomPetId()
    };
}

/**
 * Wait for a specified duration
 * @param ms - Milliseconds to wait
 */
export async function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Log API response details
 * @param testName - Name of the test
 * @param response - API response object
 */
export async function logApiResponse(testName: string, response: any): Promise<void> {
    console.log(`\n=== ${testName} ===`);
    console.log(`Status: ${response.status()}`);
    console.log(`Status Text: ${response.statusText()}`);
    
    try {
        const body = await response.json();
        console.log('Response Body:', JSON.stringify(body, null, 2));
    } catch (error) {
        console.log('Response Body: (not JSON)');
    }
}

/**
 * Validate response schema
 * @param responseBody - Response body object
 * @param requiredFields - Array of required field names
 * @returns true if all required fields exist
 */
export function validateResponseSchema(responseBody: any, requiredFields: string[]): boolean {
    for (const field of requiredFields) {
        if (!responseBody.hasOwnProperty(field)) {
            console.error(`Missing required field: ${field}`);
            return false;
        }
    }
    return true;
}
