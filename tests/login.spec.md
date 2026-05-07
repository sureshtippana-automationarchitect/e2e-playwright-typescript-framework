# Login Test Suite Documentation

## 📋 Overview
This test suite validates the login functionality of the SecureBank application for different user roles and scenarios. Tests verify that users can successfully authenticate with valid credentials and that the system properly handles invalid login attempts with appropriate error messages.

**Test File:** `login.spec.ts`  
**Page Object:** `LoginPage` (pages/loginPage.ts)  
**Test Data Source:** `test-data/login.json`  
**Total Test Cases:** 3 (2 positive, 1 negative)

---

## 🤖 AI-Driven QA Engineering
This test suite is developed and maintained with assistance from Large Language Models (LLMs) as part of our AI-driven QA engineering approach:
- Test design and generation
- Code optimization and best practices
- Documentation maintenance
- Pattern recognition for test improvements

---

## 🧪 Test Cases

### TC01 - Admin Login with "Full Access"
**Description:** Verify that an admin user can successfully log in with full access privileges and land on the SecureBank dashboard.

**Test Priority:** High  
**Test Type:** Functional, Smoke  
**User Role:** Admin

#### Prerequisites
- Application is accessible
- Admin credentials are valid
- Test environment is up and running

#### Test Data
| Field | Value | Source |
|-------|-------|--------|
| Username | `admin` | test-data/login.json |
| Password | `admin123` | test-data/login.json |
| Expected Access Level | Full access | - |

#### Test Steps
1. Navigate to the application URL based on the environment
2. Wait for the page to load completely (network idle)
3. Initialize the LoginPage object
4. Enter username from test data
5. Enter password from test data
6. Click the login button
7. Validate that "SecureBank" title is visible on the dashboard

#### Expected Results
- ✅ User is successfully authenticated
- ✅ Dashboard loads with "SecureBank" title visible
- ✅ Admin has full access to all features
- ✅ No error messages are displayed

#### Actual Results
Status: ✅ PASS (Last Run: Automated)

---

### TC02 - Viewer Login with "Read-only Access"
**Description:** Verify that a viewer user can successfully log in with read-only access privileges and land on the SecureBank dashboard.

**Test Priority:** High  
**Test Type:** Functional  
**User Role:** Viewer

#### Prerequisites
- Application is accessible
- Viewer credentials are valid
- Test environment is up and running

#### Test Data
| Field | Value | Source |
|-------|-------|--------|
| Username | `viewer` | Hardcoded in test |
| Password | `viewer123` | Hardcoded in test |
| Expected Access Level | Read-only access | - |

#### Test Steps
1. Navigate to the application URL based on the environment
2. Wait for the page to load completely (network idle)
3. Initialize the LoginPage object
4. Enter username "viewer"
5. Enter password "viewer123"
6. Click the login button
7. Validate that "SecureBank" title is visible on the dashboard

#### Expected Results
- ✅ User is successfully authenticated
- ✅ Dashboard loads with "SecureBank" title visible
- ✅ Viewer has read-only access (limited permissions)
- ✅ No error messages are displayed

#### Actual Results
Status: ✅ PASS (Last Run: Automated)

---

### TC03 - Login with Invalid Credentials and Verify Error Message
**Description:** Verify that the system properly rejects invalid login attempts and displays an appropriate error message to the user.

**Test Priority:** High  
**Test Type:** Negative Testing, Security, Functional  
**User Role:** N/A (Invalid credentials)

#### Prerequisites
- Application is accessible
- Login page is functional
- Error handling is implemented

#### Test Data
| Field | Value | Source |
|-------|-------|--------|
| Username | `invaliduser` | Hardcoded in test |
| Password | `invalidpassword` | Hardcoded in test |
| Expected Error Message | ⚠️ Invalid username or password. Please try again. | Application error response |

#### Test Steps
1. Navigate to the application URL based on the environment
2. Wait for the page to load completely (network idle)
3. Initialize the LoginPage object
4. Enter invalid username "invaliduser"
5. Enter invalid password "invalidpassword"
6. Click the login button
7. Validate that the error message "⚠️ Invalid username or password. Please try again." is displayed

#### Expected Results
- ✅ Login attempt is rejected
- ✅ Error message is displayed: "⚠️ Invalid username or password. Please try again."
- ✅ User remains on the login page (not redirected)
- ✅ No sensitive information is revealed (generic error message)
- ✅ System does not specify which field is incorrect (security measure)

#### Actual Results
Status: ✅ PASS (Last Run: Automated)

#### Security Considerations
- Error message is intentionally generic to prevent account enumeration
- System doesn't reveal whether username or password is incorrect
- Consistent error message for all invalid credential combinations
- No system information leak in error response

---

## 📊 Test Data Management

### Test Data File: `login.json`
```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Additional Test Data (In-Test)
- Viewer credentials are currently hardcoded in TC02
- Invalid credentials are hardcoded in TC03 (negative test)
- **Recommendation:** Consider moving viewer credentials to login.json for better maintainability

---

## 🏗️ Test Architecture

### Page Object Model (POM)
This test suite follows the Page Object Model design pattern:

**LoginPage Class Methods Used:**
- `login(username, password)` - Complete login flow
- `validateTitleAfterSuccessfulLogin(expectedTitle)` - Post-login validation for successful scenarios
- `validateLoginErrorMessage()` - Error message validation for negative scenarios

**LoginPage Elements:**
- `userNameInput` - Username input field
- `passwordInput` - Password input field  
- `loginButton` - Login submit button
- `bankHomePageTitle` - Dashboard title (post-login)
- `loginErrorMessage` - Error message element (for failed login attempts)

### Helper Methods
All UI interactions use `HelperMethods` class for:
- Element visibility checks
- Input field interactions
- Click actions
- Logging and reporting

---

## 🔄 Test Execution

### Running the Tests

**Run specific login tests (headed mode with dev environment):**
```bash
npm run login:dev
```

**Run all login tests:**
```bash
npx playwright test tests/login.spec.ts
```

**Run in debug mode:**
```bash
npx playwright test --debug tests/login.spec.ts
```

### Test Hooks
- **beforeEach:** Navigates to the application URL and waits for network idle state before each test

---

## 📈 Test Coverage

| Feature | Coverage | Test Cases |
|---------|----------|------------|
| Admin Login | ✅ Covered | TC01 |
| Viewer Login | ✅ Covered | TC02 |
| Invalid Credentials | ✅ Covered | TC03 |
| Empty Credentials | ❌ Not Covered | - |
| Password Masking | ❌ Not Covered | - |
| Remember Me | ❌ Not Covered | - |
| Forgot Password | ❌ Not Covered | - |
| Logout | ❌ Not Covered | - |

---

## 🐛 Known Issues
None at this time.

---

## 🔮 Future Enhancements

### Recommended Test Cases to Add
1. **Negative Testing:**
   - ✅ ~~Invalid username/password combinations~~ (Covered in TC03)
   - Empty username/password fields
   - SQL injection attempts
   - XSS attempts
   - Special characters in username/password
   - Very long username/password inputs

2. **Security Testing:**
   - Password masking verification
   - Session timeout validation
   - CSRF token validation

3. **UI/UX Testing:**
   - Keyboard navigation (Tab order)
   - Error message display
   - Loading states

4. **Role-Based Testing:**
   - Additional user roles (if applicable)
   - Permission boundary testing

### Technical Improvements
- Move viewer credentials to test data file
- Add data-driven testing for multiple user roles
- Implement screenshot capture on failure
- Add test execution timing metrics

---

## 📝 Maintenance Log

| Date | Modified By | Changes | Version |
|------|------------|---------|---------|
| 2026-05-07 | AI QA Engineer (LLM) | Initial test suite creation with admin and viewer login tests | 1.0.0 |
| 2026-05-07 | AI QA Engineer (LLM) | Added TC03 - Negative test for invalid credentials with error message validation | 1.1.0 |

---

## 📞 Contact & Support
For questions or issues related to this test suite, please refer to:
- Framework repository documentation
- Team QA lead
- AI QA Engineering team

---

**Last Updated:** May 7, 2026  
**Document Version:** 1.1.0  
**Test Suite Status:** ✅ Active
