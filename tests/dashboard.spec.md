# Dashboard Test Suite Documentation

## 📋 Overview
This test suite validates the account management functionality on the SecureBank dashboard. Tests verify that authenticated users can successfully create different types of accounts and view them with correct balances in the dashboard.

**Test File:** `dashboard.spec.ts`  
**Page Objects:** 
- `LoginPage` (pages/loginPage.ts)
- `DashboardPage` (pages/dashboardPage.ts)

**Test Data Sources:** 
- `test-data/login.json` (login credentials)
- Dynamic test data generation (random account names)

---

## 🤖 AI-Driven QA Engineering
This test suite is developed and maintained with assistance from Large Language Models (LLMs) as part of our AI-driven QA engineering approach:
- Test case design and implementation
- Page Object Model structure and best practices
- Data-driven testing patterns
- Code optimization and maintainability
- Comprehensive documentation generation
- Pattern recognition for edge cases

**AI Contributions:**
- ✅ Implemented dynamic random number generation for unique account names
- ✅ Created reusable page object methods with helper patterns
- ✅ Designed data-driven approach for TC02 and TC03
- ✅ Added detailed inline documentation for learning purposes
- ✅ Built verification logic for account display with balance validation

---

## 🧪 Test Cases

### TC01 - Add New Savings Account and Verify Display with Correct Balance
**Description:** Verify that an admin user can successfully create a new Savings Account with an initial balance and see it displayed correctly in the dashboard.

**Test Priority:** Critical  
**Test Type:** Functional, E2E, Smoke  
**User Role:** Admin  
**Account Type:** Savings Account  
**Test Approach:** Traditional step-by-step (kept for learning/reference)

#### Prerequisites
- Application is accessible
- Admin user is able to log in
- Dashboard is functional
- Account creation feature is enabled

#### Test Data
| Field | Value | Source | Notes |
|-------|-------|--------|-------|
| Username | `admin` | test-data/login.json | Admin credentials |
| Password | `admin123` | test-data/login.json | Admin credentials |
| Account Type | Savings Account | Test case | Selected from dropdown |
| Account Name | `My Savings Account-{random}` | Dynamic generation | Random = 4-digit number (1000-9999) |
| Initial Balance | `4999.99` | Test case | USD format |
| Account Status | Active | Test case | Default selection |

#### Test Steps
1. **Setup:** Navigate to the application URL and wait for network idle
2. **Login:** Authenticate with admin credentials
   - Create LoginPage instance
   - Call `login(username, password)` method
3. **Verify Login:** Validate "SecureBank" title is visible on dashboard
4. **Generate Test Data:** 
   - Generate unique 4-digit random number
   - Construct account name with random suffix
5. **Add Account:**
   - Click "Quick Add Account" button
   - Fill account name field
   - Open account type dropdown
   - Verify all account type options are visible
   - Select "Savings Account"
   - Fill initial balance
   - Verify status options are visible
   - Select "Active" status
   - Click "Save Account" button
6. **Verify Account Display:**
   - Search for account name in dashboard table
   - Validate account name matches
   - Validate balance displays correctly (formatted as "$4,999.99")

#### Expected Results
- ✅ User successfully logs in
- ✅ Dashboard loads with "SecureBank" title
- ✅ Account creation form opens
- ✅ All account type options are available
- ✅ Account is created successfully
- ✅ New account appears in dashboard table
- ✅ Account name matches input (e.g., "My Savings Account-8273")
- ✅ Balance displays correctly with formatting ("$4,999.99")
- ✅ No error messages

#### Actual Results
Status: ✅ PASS (Last Run: Automated)

#### Notes
- This test uses the traditional approach with explicit steps
- Kept separate as a learning reference for new team members
- Demonstrates complete flow from login to verification
- Shows Page Object Model implementation

---

### TC02 - Add New Checking Account and Verify Display with Correct Balance
**Description:** Verify that an admin user can successfully create a new Checking Account with an initial balance and see it displayed correctly in the dashboard.

**Test Priority:** Critical  
**Test Type:** Functional, E2E  
**User Role:** Admin  
**Account Type:** Checking Account  
**Test Approach:** Data-driven (optimized)

#### Prerequisites
- Application is accessible
- Admin user is able to log in
- Dashboard is functional
- Account creation feature is enabled

#### Test Data
| Field | Value | Source | Notes |
|-------|-------|--------|-------|
| Username | `admin` | test-data/login.json | Admin credentials |
| Password | `admin123` | test-data/login.json | Admin credentials |
| Account Type | Checking Account | accountTestData array | Selected from dropdown |
| Account Name | `My Checking Account-{random}` | Dynamic generation | Random = 4-digit number |
| Initial Balance | `3500.00` | accountTestData array | USD format |
| Account Status | Active | Test case | Default selection |

#### Test Steps
1. **Setup:** Navigate to application URL
2. **Login:** Authenticate with admin credentials
3. **Verify Login:** Validate dashboard loaded
4. **Generate Test Data:** Create unique account name with random number
5. **Add Account:** Execute complete account creation flow using DashboardPage methods
6. **Verify Account:** Validate account appears with correct name and balance

#### Expected Results
- ✅ Checking Account created successfully
- ✅ Account displays in dashboard as "My Checking Account-{4-digit-number}"
- ✅ Balance shows correctly as "$3,500.00"
- ✅ No errors during creation or verification

#### Actual Results
Status: ✅ PASS (Last Run: Automated)

#### Notes
- Uses data-driven testing approach
- Shares test logic with TC03 through forEach loop
- More maintainable than traditional approach

---

### TC03 - Add New Credit Card and Verify Display with Correct Balance
**Description:** Verify that an admin user can successfully create a new Credit Card account with an initial balance and see it displayed correctly in the dashboard.

**Test Priority:** Critical  
**Test Type:** Functional, E2E  
**User Role:** Admin  
**Account Type:** Credit Card  
**Test Approach:** Data-driven (optimized)

#### Prerequisites
- Application is accessible
- Admin user is able to log in
- Dashboard is functional
- Account creation feature is enabled

#### Test Data
| Field | Value | Source | Notes |
|-------|-------|--------|-------|
| Username | `admin` | test-data/login.json | Admin credentials |
| Password | `admin123` | test-data/login.json | Admin credentials |
| Account Type | Credit Card | accountTestData array | Selected from dropdown |
| Account Name | `My Credit Card-{random}` | Dynamic generation | Random = 4-digit number |
| Initial Balance | `5000.00` | accountTestData array | USD format |
| Account Status | Active | Test case | Default selection |

#### Test Steps
1. **Setup:** Navigate to application URL
2. **Login:** Authenticate with admin credentials
3. **Verify Login:** Validate dashboard loaded
4. **Generate Test Data:** Create unique account name with random number
5. **Add Account:** Execute complete account creation flow using DashboardPage methods
6. **Verify Account:** Validate account appears with correct name and balance

#### Expected Results
- ✅ Credit Card account created successfully
- ✅ Account displays in dashboard as "My Credit Card-{4-digit-number}"
- ✅ Balance shows correctly as "$5,000.00"
- ✅ No errors during creation or verification

#### Actual Results
Status: ✅ PASS (Last Run: Automated)

#### Notes
- Uses data-driven testing approach
- Shares test logic with TC02 through forEach loop
- Validates Credit Card as a supported account type

---

## 📊 Test Data Management

### Login Credentials (login.json)
```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Account Test Data (Embedded in Test)
```typescript
const accountTestData = [
    { 
        testId: 'TC02',
        accountType: 'Checking Account',
        accountPrefix: 'My Checking Account',
        initialBalance: '3500.00'
    },
    { 
        testId: 'TC03',
        accountType: 'Credit Card',
        accountPrefix: 'My Credit Card',
        initialBalance: '5000.00'
    }
];
```

### Dynamic Data Generation
```typescript
// Generates unique 4-digit random number (1000-9999)
const generateRandomNumber = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};
```

**Purpose:** Ensures each test run creates accounts with unique names to avoid:
- Data conflicts in the database
- Test failures due to duplicate account names
- Test dependency issues

**Example Generated Names:**
- `My Savings Account-8273`
- `My Checking Account-4521`
- `My Credit Card-9182`

---

## 🏗️ Test Architecture

### Page Object Model (POM)

#### LoginPage Methods Used
- `login(username, password)` - Complete login flow

#### DashboardPage Methods Used
- `validateSecureBankTitleVisible()` - Verify dashboard loaded
- `addNewAccount(accountType, accountName, initialBalance)` - Complete account creation flow
- `verifyAccountDisplayedWithBalance(accountName, expectedBalance)` - Verify account in table

### Data-Driven Testing Pattern
TC02 and TC03 use a data-driven approach:
- Test data is defined in an array
- `forEach` loop creates test cases dynamically
- Same test logic, different data
- Easy to add new account types

**Benefits:**
- ✅ Eliminates code duplication
- ✅ Centralizes test data management
- ✅ Easy to extend with new account types
- ✅ Maintains test isolation
- ✅ Improves maintainability

### Helper Methods
All UI interactions use `HelperMethods` class for:
- Element visibility verification
- Input field interactions (clear, fill)
- Click actions with waiting
- Validation with logging
- Error handling

---

## 🔄 Test Execution

### Running the Tests

**Run dashboard tests (headed mode with dev environment):**
```bash
npm run dashboard:dev
```

**Run dashboard tests (headless):**
```bash
npm run dashboard
```

**Run in headed mode:**
```bash
npm run dashboard:headed
```

**Run in debug mode:**
```bash
npm run dashboard:debug
```

**Run specific test case:**
```bash
npx playwright test tests/dashboard.spec.ts -g "TC01"
```

### Test Hooks
- **beforeEach:** Navigates to the application URL and waits for network idle state before each test

### Test Execution Flow
```
1. beforeEach: Navigate to app → Wait for load
2. Test execution: Login → Add account → Verify
3. Cleanup: (handled automatically by Playwright)
```

---

## 📈 Test Coverage

### Account Management Features
| Feature | Coverage | Test Cases | Priority |
|---------|----------|------------|----------|
| Add Savings Account | ✅ Covered | TC01 | Critical |
| Add Checking Account | ✅ Covered | TC02 | Critical |
| Add Credit Card | ✅ Covered | TC03 | Critical |
| Verify Account Display | ✅ Covered | TC01, TC02, TC03 | Critical |
| Verify Balance Display | ✅ Covered | TC01, TC02, TC03 | Critical |
| Edit Account | ❌ Not Covered | - | High |
| Delete Account | ❌ Not Covered | - | High |
| Account Search/Filter | ❌ Not Covered | - | Medium |
| Inactive Account Status | ❌ Not Covered | - | Medium |
| Overdraft Protection | ❌ Not Covered | - | Low |
| Account Transactions | ❌ Not Covered | - | High |
| Account Details View | ❌ Not Covered | - | Medium |

### Account Types Coverage
| Account Type | Tested | Test Case |
|--------------|--------|-----------|
| Savings Account | ✅ | TC01 |
| Checking Account | ✅ | TC02 |
| Credit Card | ✅ | TC03 |

---

## 🐛 Known Issues
None at this time.

---

## 🔮 Future Enhancements

### Recommended Test Cases to Add

#### High Priority
1. **Edit Account Functionality**
   - Modify account name
   - Update account balance
   - Change account status (Active ↔ Inactive)

2. **Delete Account Functionality**
   - Delete single account
   - Verify account removed from list
   - Confirm deletion prompt

3. **Account Validation**
   - Duplicate account name handling
   - Invalid balance amounts (negative, special characters)
   - Empty field validations
   - Maximum balance limits

4. **Account Transactions**
   - Add transaction to account
   - View transaction history
   - Filter transactions

#### Medium Priority
5. **Search and Filter**
   - Search accounts by name
   - Filter by account type
   - Sort by balance/date

6. **Inactive Account Testing**
   - Create inactive account
   - Verify inactive status display
   - Attempt transactions on inactive account

7. **Multiple Accounts**
   - Create multiple accounts of same type
   - Pagination testing (if applicable)
   - Account limit testing

#### Low Priority
8. **UI/UX Testing**
   - Responsive design validation
   - Keyboard navigation
   - Loading states and spinners
   - Error message display

9. **Performance Testing**
   - Account creation with large initial balance
   - Loading dashboard with many accounts
   - Concurrent account operations

### Technical Improvements
- ✅ Implemented: Random number generation for unique names
- ✅ Implemented: Data-driven testing for TC02/TC03
- 🔄 Consider: Move account test data to separate JSON file
- 🔄 Consider: Add screenshot capture on verification failure
- 🔄 Consider: Implement test execution metrics (timing)
- 🔄 Consider: Add account cleanup in afterEach hook
- 🔄 Consider: API-based account verification (faster than UI)

### Test Data Improvements
- Create separate test data file for account types and balances
- Add boundary value test data (min/max balances)
- Include edge case scenarios in test data

---

## 🧠 Learning & Best Practices

### Code Pattern Comparison

**Traditional Approach (TC01):**
- Explicit step-by-step implementation
- Easy to understand for beginners
- Good for documentation and learning
- More verbose, potential duplication

**Data-Driven Approach (TC02, TC03):**
- Uses data array and forEach loop
- Reduces code duplication
- Easier to maintain and extend
- Requires understanding of dynamic test generation

### Key Learnings for New Team Members

1. **Page Object Model Benefits:**
   - Separates test logic from page interactions
   - Reusable methods across tests
   - Easy maintenance when UI changes

2. **Random Data Generation:**
   - Prevents test data conflicts
   - Enables parallel test execution
   - Provides realistic test scenarios

3. **Verification Strategy:**
   - Always verify account creation succeeded
   - Check both account name and balance
   - Use formatted balance comparison

4. **Helper Method Pattern:**
   - Encapsulates common operations
   - Provides consistent error handling
   - Includes automatic logging

---

## 📝 Maintenance Log

| Date | Modified By | Changes | Version |
|------|------------|---------|---------|
| 2026-05-07 | AI QA Engineer (LLM) | Initial test suite with 3 account creation tests (Savings, Checking, Credit Card) | 1.0.0 |
| 2026-05-07 | AI QA Engineer (LLM) | Added comprehensive verification for account display with balance validation | 1.1.0 |
| 2026-05-07 | AI QA Engineer (LLM) | Implemented data-driven testing for TC02 and TC03 | 1.2.0 |
| 2026-05-07 | AI QA Engineer (LLM) | Added detailed inline comments and documentation | 1.3.0 |

---

## 📞 Contact & Support
For questions or issues related to this test suite, please refer to:
- Framework repository documentation
- Team QA lead
- AI QA Engineering team

---

## 🔗 Related Documentation
- [login.spec.md](./login.spec.md) - Login test suite documentation
- [LoginPage POM](../pages/loginPage.ts) - Login page object implementation
- [DashboardPage POM](../pages/dashboardPage.ts) - Dashboard page object implementation
- [Test Data](../test-data/login.json) - Login credentials

---

**Last Updated:** May 7, 2026  
**Document Version:** 1.3.0  
**Test Suite Status:** ✅ Active  
**AI-Assisted:** Yes (LLM-powered QA Engineering)
