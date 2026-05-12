# API Test Organization Guide

## 📁 Folder Structure

```
tests/API/
├── payloads/                       # Request payload templates (JSON)
│   ├── create-pet.json            # Payload for creating a pet
│   ├── update-pet.json            # Payload for updating a pet
│   └── upload-image.json          # Payload for image upload
│
├── endpoints/                      # API endpoint methods (reusable)
│   └── pet-endpoints.ts           # Pet Store API endpoint wrapper
│
├── test-data/                      # Test data for scenarios (JSON)
│   ├── api-config.json            # API configuration (baseUrl, apiKey)
│   ├── pet-test-data.json         # Pet test scenarios
│   └── upload-test-data.json      # Upload test scenarios
│
├── helpers/                        # Utility functions
│   └── api-helpers.ts             # Common helper functions
│
├── petstore.spec.ts # Main API test spec
└── README_ORGANIZATION.md         # This file
```

---

## 🎯 Why This Organization?

### **Separation of Concerns**
- **Payloads** = What data to send
- **Endpoints** = Where to send it (API methods)
- **Test Data** = Different scenarios to test
- **Helpers** = Reusable utility functions

### **Benefits**
✅ Easy to understand and maintain  
✅ Reusable components  
✅ Clean test code  
✅ Simple to add new tests  
✅ Clear data management  

---

## 📄 File Descriptions

### 1. **payloads/** - Request Templates

JSON files containing request body templates.

**create-pet.json** - Template for creating a pet:
```json
{
  "id": 0,
  "category": { "id": 1, "name": "Dogs" },
  "name": "Test Pet",
  "photoUrls": ["https://example.com/photo.jpg"],
  "tags": [{ "id": 1, "name": "friendly" }],
  "status": "available"
}
```

**update-pet.json** - Template for updating a pet:
```json
{
  "id": 0,
  "name": "Updated Test Pet",
  "status": "sold"
}
```

**upload-image.json** - Template for image upload:
```json
{
  "petId": 1,
  "additionalMetadata": "Test image upload",
  "fileName": "test-pet-image.png"
}
```

**Usage in Tests:**
```typescript
import createPetPayload from './payloads/create-pet.json';
const petData = generatePetData(createPetPayload);
```

---

### 2. **endpoints/** - API Methods

TypeScript files containing reusable API endpoint methods.

**pet-endpoints.ts** - Pet API wrapper class:
```typescript
export class PetEndpoints {
    async createPet(petData: any) { ... }
    async getPetById(petId: number) { ... }
    async updatePet(petData: any) { ... }
    async deletePet(petId: number) { ... }
    async findPetsByStatus(status: string) { ... }
    async uploadImage(petId, imageBuffer, metadata) { ... }
}
```

**Usage in Tests:**
```typescript
import PetEndpoints from './endpoints/pet-endpoints';

test('Create pet', async ({ request }) => {
    const petEndpoints = new PetEndpoints(request);
    const response = await petEndpoints.createPet(petData);
});
```

**Benefits:**
- ✅ Single source for API calls
- ✅ Easy to update endpoints
- ✅ Consistent error handling
- ✅ Reusable across tests

---

### 3. **test-data/** - Test Scenarios

JSON files containing test data for different scenarios.

**api-config.json** - API configuration:
```json
{
  "apiConfig": {
    "baseUrl": "https://petstore.swagger.io/v2",
    "apiKey": "special-key",
    "timeout": 30000
  },
  "headers": {
    "default": {
      "Content-Type": "application/json",
      "api_key": "special-key"
    }
  }
}
```

**pet-test-data.json** - Pet test scenarios:
```json
{
  "validPets": [
    { "id": 10001, "name": "Golden Retriever", ... },
    { "id": 10002, "name": "Persian Cat", ... }
  ],
  "invalidPets": [ ... ],
  "petStatuses": {
    "available": "available",
    "pending": "pending",
    "sold": "sold"
  }
}
```

**upload-test-data.json** - Upload scenarios:
```json
{
  "uploadScenarios": [
    {
      "scenario": "Valid Image Upload",
      "petId": 1,
      "additionalMetadata": "Valid test image",
      "expectedStatus": 200
    }
  ]
}
```

**Usage in Tests:**
```typescript
import petTestData from './test-data/pet-test-data.json';

for (const petData of petTestData.validPets) {
    await petEndpoints.createPet(petData);
}
```

---

### 4. **helpers/** - Utility Functions

TypeScript files with reusable helper functions.

**api-helpers.ts** - Common utilities:
```typescript
// Generate random pet ID
export function generateRandomPetId(): number { ... }

// Create test image buffer
export function createTestImageBuffer(): Buffer { ... }

// Generate pet data with random ID
export function generatePetData(basePayload: any): any { ... }

// Log API response
export async function logApiResponse(testName, response) { ... }

// Validate response schema
export function validateResponseSchema(body, fields): boolean { ... }
```

**Usage in Tests:**
```typescript
import { createTestImageBuffer, generatePetData } from './helpers/api-helpers';

const petData = generatePetData(createPetPayload);
const imageBuffer = createTestImageBuffer();
```

---

## 🧪 Test File Structure

**petstore.spec.ts** - Main API test file:

```typescript
import PetEndpoints from './endpoints/pet-endpoints';
import { createTestImageBuffer, generatePetData } from './helpers/api-helpers';
import createPetPayload from './payloads/create-pet.json';
import petTestData from './test-data/pet-test-data.json';

test.describe('Pet Store API Tests', () => {
    let petEndpoints: PetEndpoints;

    test.beforeEach(async ({ request }) => {
        petEndpoints = new PetEndpoints(request);
    });

    test('TC01 - Upload image', async () => {
        const imageBuffer = createTestImageBuffer();
        const response = await petEndpoints.uploadImage(...);
        expect(response.status()).toBe(200);
    });

    test('TC02 - Create pet', async () => {
        const petData = generatePetData(createPetPayload);
        const response = await petEndpoints.createPet(petData);
        expect(response.ok()).toBeTruthy();
    });
});
```

---

## 🚀 How to Use This Structure

### Step 1: Add New Payload
Create JSON file in `payloads/`:
```json
// payloads/new-feature.json
{
  "field1": "value1",
  "field2": "value2"
}
```

### Step 2: Add Endpoint Method
Add method to `endpoints/pet-endpoints.ts`:
```typescript
async newFeature(data: any) {
    return await this.request.post(`${BASE_URL}/newEndpoint`, {
        headers: { 'api_key': API_KEY },
        data: data
    });
}
```

### Step 3: Add Test Data
Create JSON file in `test-data/`:
```json
// test-data/new-feature-data.json
{
  "scenarios": [
    { "name": "Scenario 1", "data": {...} }
  ]
}
```

### Step 4: Write Test
Create test in spec file:
```typescript
import newFeaturePayload from './payloads/new-feature.json';
import newFeatureData from './test-data/new-feature-data.json';

test('TC11 - New feature test', async () => {
    const response = await petEndpoints.newFeature(newFeaturePayload);
    expect(response.ok()).toBeTruthy();
});
```

---

## ▶️ Running Tests

### Run Organized Tests
```bash
# Run the API test file
npx playwright test tests/API/petstore.spec.ts

# Run with specific tag
npx playwright test tests/API/petstore.spec.ts --grep @smoke

# Run specific test case
npx playwright test tests/API/petstore.spec.ts -g "TC01"
```

### All API Tests
```bash
npm run api:petstore:tests                              # Pet Store API tests
npx playwright test tests/API/                          # All API tests
npx playwright test tests/API/petstore.spec.ts --grep "@smoke"     # Smoke tests
npx playwright test tests/API/petstore.spec.ts --grep "@regression" # Regression tests
```

---

## 📊 Test Cases in Organized File

| Test Case | Description | Uses |
|-----------|-------------|------|
| TC01 | Upload image | payloads/upload-image.json, test-data/upload-test-data.json |
| TC02 | Create pet | payloads/create-pet.json |
| TC03 | Get pet by ID | payloads/create-pet.json |
| TC04 | Update pet | payloads/update-pet.json |
| TC05 | Delete pet | payloads/create-pet.json |
| TC06 | Find by status | test-data/pet-test-data.json |
| TC07 | Data-driven create | test-data/pet-test-data.json |
| TC08 | Invalid ID (negative) | test-data/upload-test-data.json |
| TC09 | No auth (negative) | endpoints/pet-endpoints.ts |
| TC10 | Data-driven upload | test-data/upload-test-data.json |

---

## 🎓 Key Concepts

### 1. **Data-Driven Testing**
```typescript
// Loop through test data scenarios
for (const scenario of uploadTestData.uploadScenarios) {
    const response = await petEndpoints.uploadImage(...);
    expect(response.status()).toBe(scenario.expectedStatus);
}
```

### 2. **Payload Reuse**
```typescript
// Use same payload template with different data
const petData1 = generatePetData(createPetPayload);
const petData2 = generatePetData(createPetPayload);
```

### 3. **Endpoint Abstraction**
```typescript
// No need to write API call details in tests
// Just call the method
await petEndpoints.createPet(data);
await petEndpoints.updatePet(data);
```

### 4. **Helper Functions**
```typescript
// Common operations in one place
const imageBuffer = createTestImageBuffer();
const petId = generateRandomPetId();
await logApiResponse('Test Name', response);
```

---

## 🔄 Comparison: Before vs After

### Before (All in One File):
```typescript
test('Create pet', async ({ request }) => {
    const response = await request.post('https://petstore.swagger.io/v2/pet', {
        headers: {
            'api_key': 'special-key',
            'Content-Type': 'application/json'
        },
        data: {
            id: Math.floor(Math.random() * 100000),
            name: "Test Pet",
            status: "available"
            // ... more fields
        }
    });
    expect(response.ok()).toBeTruthy();
});
```

### After (Organized):
```typescript
test('Create pet', async () => {
    const petData = generatePetData(createPetPayload);
    const response = await petEndpoints.createPet(petData);
    expect(response.ok()).toBeTruthy();
});
```

**Benefits:**
- ✅ 70% less code in test
- ✅ Clear what's being tested
- ✅ Easy to maintain
- ✅ Reusable components

---

## 📚 Related Files

- [API_TESTS_QUICK_START.md](./API_TESTS_QUICK_START.md) - Quick start guide
- [petstore.spec.md](./petstore.spec.md) - Detailed test documentation
- [README.md](./README.md) - General API testing guide

---

**Created:** May 12, 2026  
**Status:** ✅ Production Ready  
**Authorization:** special-key
