/**
 * Pet Store API Endpoints
 * 
 * This module provides reusable methods for interacting with Pet Store API endpoints.
 * All endpoints use the configuration from test-data/api-config.json
 */

import { APIRequestContext, expect } from '@playwright/test';
import apiConfig from '../test-data/api-config.json';

const BASE_URL = apiConfig.apiConfig.baseUrl;
const API_KEY = apiConfig.apiConfig.apiKey;

export class PetEndpoints {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * Create a new pet
     * @param petData - Pet data object or JSON payload
     * @returns API Response
     */
    async createPet(petData: any) {
        const response = await this.request.post(`${BASE_URL}/pet`, {
            headers: {
                'api_key': API_KEY,
                'Content-Type': 'application/json'
            },
            data: petData
        });
        return response;
    }

    /**
     * Get pet by ID
     * @param petId - Pet ID
     * @returns API Response
     */
    async getPetById(petId: number | string) {
        const response = await this.request.get(`${BASE_URL}/pet/${petId}`, {
            headers: {
                'api_key': API_KEY
            }
        });
        return response;
    }

    /**
     * Update an existing pet
     * @param petData - Updated pet data
     * @returns API Response
     */
    async updatePet(petData: any) {
        const response = await this.request.put(`${BASE_URL}/pet`, {
            headers: {
                'api_key': API_KEY,
                'Content-Type': 'application/json'
            },
            data: petData
        });
        return response;
    }

    /**
     * Delete a pet by ID
     * @param petId - Pet ID to delete
     * @returns API Response
     */
    async deletePet(petId: number) {
        const response = await this.request.delete(`${BASE_URL}/pet/${petId}`, {
            headers: {
                'api_key': API_KEY
            }
        });
        return response;
    }

    /**
     * Find pets by status
     * @param status - Pet status (available, pending, sold)
     * @returns API Response
     */
    async findPetsByStatus(status: string) {
        const response = await this.request.get(`${BASE_URL}/pet/findByStatus?status=${status}`, {
            headers: {
                'api_key': API_KEY
            }
        });
        return response;
    }

    /**
     * Upload image for a pet
     * @param petId - Pet ID
     * @param imageBuffer - Image buffer data
     * @param additionalMetadata - Additional metadata
     * @param fileName - File name
     * @returns API Response
     */
    async uploadImage(petId: number, imageBuffer: Buffer, additionalMetadata: string, fileName: string = 'test-image.png') {
        const response = await this.request.post(`${BASE_URL}/pet/${petId}/uploadImage`, {
            headers: {
                'api_key': API_KEY
            },
            multipart: {
                additionalMetadata: additionalMetadata,
                file: {
                    name: fileName,
                    mimeType: 'image/png',
                    buffer: imageBuffer
                }
            }
        });
        return response;
    }

    /**
     * Upload image without authentication (for negative testing)
     * @param petId - Pet ID
     * @param imageBuffer - Image buffer data
     * @returns API Response
     */
    async uploadImageWithoutAuth(petId: number, imageBuffer: Buffer) {
        const response = await this.request.post(`${BASE_URL}/pet/${petId}/uploadImage`, {
            multipart: {
                additionalMetadata: 'Unauthorized upload attempt',
                file: {
                    name: 'test-image.png',
                    mimeType: 'image/png',
                    buffer: imageBuffer
                }
            }
        });
        return response;
    }

    /**
     * Get pet by ID without authentication (for negative testing)
     * @param petId - Pet ID
     * @returns API Response
     */
    async getPetByIdWithoutAuth(petId: number) {
        const response = await this.request.get(`${BASE_URL}/pet/${petId}`);
        return response;
    }
}

export default PetEndpoints;
