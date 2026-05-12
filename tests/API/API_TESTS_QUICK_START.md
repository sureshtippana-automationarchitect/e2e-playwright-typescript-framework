# API Tests - Quick Start Guide

## 🎉 What Was Created

### Files Created:
1. **petstore.spec.ts** - Complete API test suite with 10 test cases
2. **petstore.spec.md** - Comprehensive documentation for all test cases
3. **payloads/** - Request body templates (JSON)
4. **endpoints/** - API endpoint methods (reusable)
5. **test-data/** - Test scenarios & configuration (api-config.json, pet-test-data.json, upload-test-data.json)
6. **helpers/** - API utility functions (api-helpers.ts)
7. **API_TESTS_QUICK_START.md** - This quick start guide

---

## 📊 Test Suite Summary

**Total Tests:** 10 test cases (30 total across 3 browsers)
- ✅ **4 Smoke Tests** - Critical path validation
- ✅ **6 Regression Tests** - Full test coverage
- ✅ **2 Negative Tests** - Error handling validation
- ✅ **1 Security Test** - Authentication validation

### Test Cases:
| Test | Endpoint | Tags | Status |
|------|----------|------|--------|
| TC01 | POST /pet/{petId}/uploadImage | @smoke @api @upload | ✅ |
| TC02 | POST /pet | @smoke @regression @api @crud | ✅ |
| TC03 | GET /pet/{petId} | @smoke @api @crud | ✅ |
| TC04 | PUT /pet | @regression @api @crud | ✅ |
| TC05 | DELETE /pet/{petId} | @regression @api @crud | ✅ |
| TC06 | GET /pet/findByStatus | @smoke @api @query | ✅ |
| TC07 | POST /pet (data-driven) | @regression @api @crud | ✅ |
| TC08 | GET /pet/{invalid} | @regression @api @negative | ✅ |
| TC09 | GET /pet (no auth) | @regression @api @negative @security | ✅ |
| TC10 | POST /pet/uploadImage (data-driven) | @regression @api @upload | ✅ |

---

## 🚀 How to Run Tests

### Quick Commands:

```bash
# Run Pet Store API tests
npm run api:petstore:tests

# Run with filters
npx playwright test tests/API/petstore.spec.ts --grep "@smoke"
npx playwright test tests/API/petstore.spec.ts --grep "@regression"

# Run all API tests
npx playwright test tests/API/

# Run in debug mode
npm run api:debug
```

### Using Tags:

```bash
# CRUD operations only
npx playwright test tests/API/ --grep @crud

# Negative tests only
npx playwright test tests/API/ --grep @negative

# Upload functionality
npx playwright test tests/API/ --grep @upload

# Security tests
npx playwright test tests/API/ --grep @security
```

### Run Specific Test Case:

```bash
# Run TC01 only
npx playwright test tests/API/petstore.spec.ts -g "TC01"

# Run TC02 only
npx playwright test tests/API/petstore.spec.ts -g "TC02"
```

---

## 🔑 Configuration

### API Details:
- **Base URL:** `https://petstore.swagger.io/v2`
- **Authorization:** `special-key` (API key in header)
- **Documentation:** [Swagger UI](https://petstore.swagger.io)

### Request Headers:
```typescript
headers: {
  'api_key': 'special-key',
  'Content-Type': 'application/json'
}
```

---

## ✅ Test Execution Results

**Last Run:** All tests passed successfully!

```
Running 10 tests using 10 workers

✅ TC01 - Upload image for pet - PASSED
✅ TC02 - Create new pet - PASSED  
✅ TC03 - Get pet by ID - PASSED
✅ TC04 - Update pet - PASSED
✅ TC05 - Delete pet - PASSED
✅ TC06 - Find pets by status - PASSED (Found 717+ pets)
✅ TC07 - Create multiple pets (data-driven) - PASSED
✅ TC08 - Invalid pet ID - PASSED
✅ TC09 - Unauthorized access - PASSED
✅ TC10 - Upload multiple images (data-driven) - PASSED

10 passed (3.3s)
```

---

## 📁 Test Structure

```
tests/API/
├── payloads/                  # Request body templates (JSON)
│   ├── create-pet.json
│   ├── update-pet.json
│   └── upload-image.json
├── endpoints/                 # API endpoint methods (reusable)
│   └── pet-endpoints.ts
├── test-data/                 # Test scenarios & configuration
│   ├── api-config.json
│   ├── pet-test-data.json
│   └── upload-test-data.json
├── helpers/                   # API utility functions
│   └── api-helpers.ts
├── petstore.spec.ts          # Test implementation (10 test cases)
├── petstore.spec.md          # Detailed documentation
├── README.md                 # API testing guide
└── API_TESTS_QUICK_START.md  # This quick start guide
```

---

## 🎯 Example: Upload Image Test (TC01)

The first test case from the screenshot validates image upload:

```typescript
test('TC01 - Upload image for pet and verify response', async ({ request }) => {
    const petId = 1;
    
    // Create test image buffer
    const imageBuffer = Buffer.from('...base64...', 'base64');

    // Upload image
    const response = await request.post(`${BASE_URL}/pet/${petId}/uploadImage`, {
        headers: { 'api_key': 'special-key' },
        multipart: {
            additionalMetadata: 'Test image upload',
            file: {
                name: 'test-image.png',
                mimeType: 'image/png',
                buffer: imageBuffer
            }
        }
    });

    // Verify response
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.code).toBe(200);
});
```

**Result:**
```json
{
  "code": 200,
  "type": "unknown",
  "message": "additionalMetadata: Test image upload from Playwright automation\nFile uploaded to ./test-image.png, 70 bytes"
}
```

---

## 📝 Adding More API Tests

### Step 1: Create New Test File
```typescript
// tests/API/my-api.spec.ts
import { test, expect } from '@playwright/test';

test.describe('My API Tests @api', () => {
  test('TC01 - My test @smoke @api', async ({ request }) => {
    const response = await request.get('https://api.example.com/endpoint');
    expect(response.ok()).toBeTruthy();
  });
});
```

### Step 2: Add Test Data (Optional)
```json
// test-data/my-api.json
{
  "baseUrl": "https://api.example.com",
  "testData": { ... }
}
```

### Step 3: Add NPM Script (Optional)
```json
// package.json
"scripts": {
  "api:myapi": "npx playwright test tests/API/my-api.spec.ts"
}
```

---

## 📚 Documentation

- **Detailed Test Docs:** [petstore.spec.md](./petstore.spec.md)
- **General API Guide:** [README.md](./README.md)
- **Framework Docs:** [../../FRAMEWORK_ORGANIZATION.md](../../FRAMEWORK_ORGANIZATION.md)
- **Swagger Petstore:** [https://petstore.swagger.io](https://petstore.swagger.io)

---

## 🎓 Key Learnings

1. **No Page Object Needed:** API tests use `request` fixture directly
2. **Multipart Forms:** Image uploads work with `multipart` option
3. **Authorization:** API key passed in headers as `api_key`
4. **Tags Work:** Same tag system as UI tests (@smoke, @regression, etc.)
5. **Parallel Execution:** API tests run in parallel across browsers

---

## 🔧 Troubleshooting

### Issue: Tests failing with network errors
**Solution:** Check internet connection and API availability at petstore.swagger.io

### Issue: Tests timing out
**Solution:** Increase timeout in playwright.config.ts or use `test.setTimeout(60000)`

### Issue: 404 errors on GET requests
**Solution:** Ensure pet was created successfully before attempting to retrieve it

---

## 🎉 Next Steps

1. ✅ **API tests are ready to use** - Run `npm run api:petstore:tests`
2. 📝 **Review documentation** - Check [petstore.spec.md](./petstore.spec.md)
3. 🔨 **Add more APIs** - Follow the organized pattern in petstore.spec.ts
4. 🚀 **Integrate with CI/CD** - Add to GitHub Actions workflows

---

**Created:** May 12, 2026  
**Status:** ✅ Ready for Use  
**Authorization:** special-key
