# API Tests

This folder contains API test specifications for the application using a **professionally organized structure**.

## 📁 Folder Organization

```
tests/API/
├── payloads/          ➡️ Request body templates (JSON)
├── endpoints/         ➡️ API endpoint methods (TypeScript)
├── test-data/         ➡️ Test scenarios & configuration (JSON)
├── helpers/           ➡️ Utility functions (TypeScript)
└── *.spec.ts          ➡️ Test specification files
```

### Quick Understanding:
- **payloads/** = What data to send (JSON templates)
- **endpoints/** = Where to send it (API methods)
- **test-data/** = Different scenarios to test (JSON)
- **helpers/** = Reusable utility functions (TypeScript)

## 🚀 Quick Start

### Run Pet Store API Tests:
```bash
npm run api:petstore:tests
# or
npx playwright test tests/API/petstore.spec.ts --project=chromium
```

### Run All API Tests:
```bash
npx playwright test tests/API/
```

### Run Smoke Tests Only:
```bash
npm run api:smoke
# or
npx playwright test tests/API/ --grep "@smoke"
```

### Run Specific Test Case:
```bash
npx playwright test tests/API/petstore.spec.ts -g "TC01"
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[STRUCTURE_OVERVIEW.md](./STRUCTURE_OVERVIEW.md)** | 🎯 START HERE - Complete visual guide |
| **[README_ORGANIZATION.md](./README_ORGANIZATION.md)** | Detailed organization explanation |
| **[API_TESTS_QUICK_START.md](./API_TESTS_QUICK_START.md)** | Quick reference guide |
| **[petstore.spec.md](./petstore.spec.md)** | Test case documentation |

## 📋 Test Files

| File | Description | Test Count |
|------|-------------|------------|
| **petstore.spec.ts** | ⭐ Main API test file | 10 tests |

## 🎓 Example Usage

### Simple Test Example:
```typescript
import PetEndpoints from './endpoints/pet-endpoints';
import { generatePetData } from './helpers/api-helpers';
import createPetPayload from './payloads/create-pet.json';

test('Create pet', async ({ request }) => {
    const petEndpoints = new PetEndpoints(request);
    const petData = generatePetData(createPetPayload);
    
    const response = await petEndpoints.createPet(petData);
    expect(response.ok()).toBeTruthy();
});
```

## 📊 Test Coverage

**Pet Store API Tests:**
- ✅ 10 test cases in organized structure
- ✅ 30 total tests (10 × 3 browsers)
- ✅ CRUD operations
- ✅ Image upload
- ✅ Query by status
- ✅ Negative tests
- ✅ Security tests

## 🔑 Configuration

**API Details:**
- **Base URL:** `https://petstore.swagger.io/v2`
- **Authorization:** `special-key` (API key)
- **Config File:** [test-data/api-config.json](./test-data/api-config.json)

## ✅ Benefits of This Organization

1. **Easy to Understand** - Clear folder structure
2. **Easy to Maintain** - Update one file, affects all tests
3. **Reusable** - Use same code across tests
4. **Scalable** - Easy to add new tests
5. **Professional** - Industry-standard organization

## 🆕 Adding New Tests

1. **Add Payload** (optional): Create JSON in `payloads/`
2. **Add Endpoint** (optional): Add method to `endpoints/pet-endpoints.ts`
3. **Add Test Data** (optional): Create JSON in `test-data/`
4. **Write Test**: Use existing components in new test

## 📝 Structure

Place your API test files here following the naming convention:
- `*.spec.ts` - Test specification files
- `*.spec.md` - Test documentation files (optional)

## Example API Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('API Test Suite Name', () => {
  
  test('should verify API endpoint response @smoke @api', async ({ request }) => {
    const response = await request.get('https://api.example.com/endpoint');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('expectedField');
  });
  
  test('should handle POST request @regression @api', async ({ request }) => {
    const response = await request.post('https://api.example.com/endpoint', {
      data: {
        key: 'value'
      }
    });
    expect(response.ok()).toBeTruthy();
  });
  
});
```

## Running API Tests

You can run API tests using:
- `npm test` - Run all tests (including API tests)
- `npx playwright test tests/API/` - Run only API tests
- `npx playwright test tests/API/your-api.spec.ts` - Run specific API test file
- `npx playwright test --grep @api` - Run tests tagged with @api

## Best Practices

1. Use descriptive test names that explain what is being tested
2. Tag tests appropriately (@smoke, @regression, @api)
3. Use proper assertions to verify API responses
4. Handle authentication and authorization in test setup
5. Use test data files from `test-data/` folder
6. Document complex API test scenarios in corresponding `.spec.md` files

## Related Documentation

- [Playwright API Testing Documentation](https://playwright.dev/docs/api-testing)
- [Framework Organization](../../FRAMEWORK_ORGANIZATION.md)
- [How to Run Tests](../../docs/HOW_TO_RUN_TESTS.md)
