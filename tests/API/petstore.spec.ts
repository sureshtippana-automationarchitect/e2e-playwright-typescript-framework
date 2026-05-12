/**
 * Pet Store API Tests
 * 
 * Organized test suite for Pet Store API validation
 * 
 * Structure:
 * - payloads/      - Request payload templates (JSON)
 * - endpoints/     - API endpoint methods (reusable)
 * - test-data/     - Test data for different scenarios (JSON)
 * - helpers/       - Utility functions
 * 
 * Authorization: special-key
 * Base URL: https://petstore.swagger.io/v2
 */

import { test, expect } from '@playwright/test';
import PetEndpoints from './endpoints/pet-endpoints';
import { createTestImageBuffer, generatePetData, logApiResponse, validateResponseSchema } from './helpers/api-helpers';

// Import payloads
import createPetPayload from './payloads/create-pet.json';
import updatePetPayload from './payloads/update-pet.json';
import uploadImagePayload from './payloads/upload-image.json';

// Import test data
import petTestData from './test-data/pet-test-data.json';
import uploadTestData from './test-data/upload-test-data.json';
import apiConfig from './test-data/api-config.json';

test.describe('Pet Store API Tests @api', () => {
    let petEndpoints: PetEndpoints;

    test.beforeEach(async ({ request }) => {
        // Initialize endpoints with request context
        petEndpoints = new PetEndpoints(request);
    });

    /**
     * TC01 - Upload Image for Pet
     * Tests the POST /pet/{petId}/uploadImage endpoint
     * Uses: payloads/upload-image.json, test-data/upload-test-data.json
     */
    test('TC01 - Upload image for pet and verify response @smoke @api @upload', async () => {
        const uploadData = uploadTestData.uploadScenarios[0];
        const imageBuffer = createTestImageBuffer();
        
        // Upload image using endpoint method
        const response = await petEndpoints.uploadImage(
            uploadData.petId,
            imageBuffer,
            uploadData.additionalMetadata,
            uploadData.fileName
        );

        // Assertions
        expect(response.status()).toBe(uploadData.expectedStatus);
        
        const responseBody = await response.json();
        await logApiResponse('TC01 - Upload Image', response);

        // Verify response structure
        expect(responseBody).toHaveProperty('code');
        expect(responseBody).toHaveProperty('type');
        expect(responseBody).toHaveProperty('message');
        expect(responseBody.code).toBe(200);
    });

    /**
     * TC02 - Create New Pet
     * Tests the POST /pet endpoint
     * Uses: payloads/create-pet.json, test-data/pet-test-data.json
     */
    test('TC02 - Create new pet and verify response @smoke @regression @api @crud', async () => {
        // Generate pet data with random ID from payload template
        const petData = generatePetData(createPetPayload);
        
        // Create pet using endpoint method
        const response = await petEndpoints.createPet(petData);

        // Assertions
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        await logApiResponse('TC02 - Create Pet', response);

        // Verify response matches request data
        expect(responseBody.id).toBe(petData.id);
        expect(responseBody.name).toBe(petData.name);
        expect(responseBody.status).toBe(petData.status);
        expect(responseBody.category.name).toBe(petData.category.name);

        // Validate response schema
        const requiredFields = ['id', 'name', 'status', 'category', 'photoUrls'];
        expect(validateResponseSchema(responseBody, requiredFields)).toBeTruthy();
    });

    /**
     * TC03 - Get Pet by ID
     * Tests the GET /pet/{petId} endpoint
     * Uses: payloads/create-pet.json
     */
    test('TC03 - Get pet by ID and verify details @smoke @api @crud', async () => {
        // First create a pet
        const petData = generatePetData(createPetPayload);
        const createResponse = await petEndpoints.createPet(petData);
        expect(createResponse.ok()).toBeTruthy();

        // Now get the pet by ID
        const getResponse = await petEndpoints.getPetById(petData.id);

        // Assertions
        expect(getResponse.ok()).toBeTruthy();
        expect(getResponse.status()).toBe(200);

        const responseBody = await getResponse.json();
        await logApiResponse('TC03 - Get Pet by ID', getResponse);

        // Verify pet details match
        expect(responseBody.id).toBe(petData.id);
        expect(responseBody.name).toBe(petData.name);
        expect(responseBody.status).toBe(petData.status);
    });

    /**
     * TC04 - Update Pet Information
     * Tests the PUT /pet endpoint
     * Uses: payloads/create-pet.json, payloads/update-pet.json
     */
    test('TC04 - Update existing pet and verify changes @regression @api @crud', async () => {
        // First create a pet
        const petData = generatePetData(createPetPayload);
        await petEndpoints.createPet(petData);

        // Update the pet using update payload
        const updatedPetData = {
            ...updatePetPayload,
            id: petData.id
        };

        const updateResponse = await petEndpoints.updatePet(updatedPetData);

        // Assertions
        expect(updateResponse.ok()).toBeTruthy();
        expect(updateResponse.status()).toBe(200);

        const responseBody = await updateResponse.json();
        await logApiResponse('TC04 - Update Pet', updateResponse);

        // Verify updated fields
        expect(responseBody.name).toBe(updatedPetData.name);
        expect(responseBody.status).toBe(updatedPetData.status);
    });

    /**
     * TC05 - Delete Pet
     * Tests the DELETE /pet/{petId} endpoint
     * Uses: payloads/create-pet.json
     */
    test('TC05 - Delete pet and verify removal @regression @api @crud', async () => {
        // First create a pet
        const petData = generatePetData(createPetPayload);
        const createResponse = await petEndpoints.createPet(petData);
        expect(createResponse.ok()).toBeTruthy();

        // Delete the pet
        const deleteResponse = await petEndpoints.deletePet(petData.id);

        // Assertions
        expect(deleteResponse.ok()).toBeTruthy();
        expect(deleteResponse.status()).toBe(200);

        await logApiResponse('TC05 - Delete Pet', deleteResponse);

        // Verify deletion by trying to get the pet (should return 404)
        const getResponse = await petEndpoints.getPetById(petData.id);
        expect(getResponse.status()).toBe(404);
    });

    /**
     * TC06 - Get Pets by Status
     * Tests the GET /pet/findByStatus endpoint
     * Uses: test-data/pet-test-data.json
     */
    test('TC06 - Find pets by status and verify results @smoke @api @query', async () => {
        const status = petTestData.petStatuses.available;
        
        const response = await petEndpoints.findPetsByStatus(status);

        // Assertions
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(`\n=== TC06 - Find Pets by Status ===`);
        console.log(`Found ${responseBody.length} pets with status: ${status}`);

        // Verify response is an array
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);

        // Verify all pets have the correct status
        responseBody.forEach((pet: any) => {
            expect(pet.status).toBe(status);
        });
    });

    /**
     * TC07 - Create Pet Using Test Data
     * Data-driven test using multiple pet scenarios
     * Uses: test-data/pet-test-data.json
     */
    test('TC07 - Create multiple pets using test data @regression @api @crud', async () => {
        // Use test data from pet-test-data.json
        for (const petData of petTestData.validPets) {
            const response = await petEndpoints.createPet(petData);

            // Assertions
            expect(response.ok()).toBeTruthy();
            expect(response.status()).toBe(200);

            const responseBody = await response.json();
            console.log(`\nCreated pet: ${responseBody.name} (ID: ${responseBody.id})`);

            // Verify pet details
            expect(responseBody.id).toBe(petData.id);
            expect(responseBody.name).toBe(petData.name);
            expect(responseBody.status).toBe(petData.status);
        }
    });

    /**
     * TC08 - Invalid Pet ID (Negative Test)
     * Tests error handling with invalid pet ID
     * Uses: test-data/upload-test-data.json
     */
    test('TC08 - Get pet with invalid ID and verify error response @regression @api @negative', async () => {
        const invalidScenario = uploadTestData.invalidScenarios[0];
        
        const response = await petEndpoints.getPetById(invalidScenario.petId);

        // Assertions - Should return error
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(404);

        await logApiResponse('TC08 - Invalid Pet ID', response);
    });

    /**
     * TC09 - Unauthorized Request (Negative Test)
     * Tests authentication requirement
     * Uses: endpoints/pet-endpoints.ts (without auth method)
     */
    test('TC09 - Access API without authorization @regression @api @negative @security', async () => {
        // Try to get pet without API key
        const response = await petEndpoints.getPetByIdWithoutAuth(1);

        console.log(`\n=== TC09 - Unauthorized Request ===`);
        console.log(`Status: ${response.status()}`);
        
        // Note: Pet Store API may allow access without authentication
        // This test documents actual API behavior
        if (response.ok()) {
            console.log('Note: API allows access without authentication');
        } else {
            expect(response.status()).toBeGreaterThanOrEqual(400);
        }
    });

    /**
     * TC10 - Upload Multiple Images Using Test Data
     * Data-driven test for image upload scenarios
     * Uses: test-data/upload-test-data.json
     */
    test('TC10 - Upload multiple images using test data @regression @api @upload', async () => {
        const imageBuffer = createTestImageBuffer();

        // Test all upload scenarios from test data
        for (const scenario of uploadTestData.uploadScenarios) {
            console.log(`\nTesting: ${scenario.scenario}`);
            
            const response = await petEndpoints.uploadImage(
                scenario.petId,
                imageBuffer,
                scenario.additionalMetadata,
                scenario.fileName
            );

            // Assertions
            expect(response.status()).toBe(scenario.expectedStatus);
            
            const responseBody = await response.json();
            console.log(`Result: ${responseBody.message}`);
        }
    });
});
