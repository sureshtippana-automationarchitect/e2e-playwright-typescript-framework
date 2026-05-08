# Playwright TypeScript Automation Framework

A scalable and maintainable end-to-end (E2E) test automation framework built using **Playwright + TypeScript**, following best practices like **Page Object Model (POM)**, environment configuration, reusable utilities, data-driven testing, tagged test execution, and comprehensive test documentation.

**🤖 AI-Driven QA Engineering:** This framework is developed and maintained with assistance from Large Language Models (LLMs) for intelligent test design, optimization, and documentation.

---

## 📌 Key Features

- ✅ **Playwright with TypeScript** - Modern, reliable E2E testing
- ✅ **Page Object Model (POM)** - Maintainable and reusable page classes  
- ✅ **Cross-browser testing** - Chromium, Firefox, WebKit support
- ✅ **Environment-based configuration** - dev, uat, prod environments
- ✅ **Data-driven testing** - JSON-based test data with dynamic generation
- ✅ **Tagged test execution** - @smoke, @regression, @feature tags for selective test runs
- ✅ **Reusable utilities** - Helper methods for common operations
- ✅ **Comprehensive test documentation** - Markdown files for each test suite
- ✅ **Negative testing** - Error validation and security testing
- ✅ **Random data generation** - Unique test data for each run
- ✅ **Inline code comments** - Comments positioned on the right side for better readability
- ✅ **API + UI automation** - Support for both API and UI testing
- ✅ **Custom reporting** - HTML reports with detailed execution logs
- ✅ **CI/CD ready** - GitHub Actions compatible with smoke/regression test scripts
- ✅ **AI-assisted development** - LLM-powered test generation and maintenance

---

## 🧪 Test Suites

### Login Test Suite (`login.spec.ts`)
**Total Test Cases:** 3 (2 positive, 1 negative)  
**Tags:** `@smoke`, `@regression`, `@login`, `@negative`

| Test Case | Description | Tags | Status |
|-----------|-------------|------|--------|
| TC01 | Admin login with "Full access" | @smoke @regression @login | ✅ Active |
| TC02 | Viewer login with "Read-only access" | @regression @login | ✅ Active |
| TC03 | Login with invalid credentials (Negative Test) | @regression @login @negative | ✅ Active |

**Documentation:** [login.spec.md](./tests/login.spec.md)

### Dashboard Test Suite (`dashboard.spec.ts`)
**Total Test Cases:** 3 (Account Management)  
**Tags:** `@smoke`, `@regression`, `@dashboard`

| Test Case | Description | Tags | Status |
|-----------|-------------|------|--------|
| TC01 | Add New Savings Account and verify balance | @smoke @regression @dashboard | ✅ Active |
| TC02 | Add New Checking Account and verify balance | @regression @dashboard | ✅ Active |
| TC03 | Add New Credit Card and verify balance | @regression @dashboard | ✅ Active |

**Features:**
- Data-driven testing approach (TC02 & TC03)
- Random 4-digit account name generation
- Balance verification in dashboard table
- Traditional vs optimized code patterns for learning

**Documentation:** [dashboard.spec.md](./tests/dashboard.spec.md)

### Transactions Test Suite (`transactions.spec.ts`)
**Total Test Cases:** 4 (3 active, 1 skipped)  
**Tags:** `@smoke`, `@regression`, `@transactions`, `@negative`

| Test Case | Description | Tags | Status |
|-----------|-------------|------|--------|
| TC01 | Create Deposit transaction and verify in table | @smoke @regression @transactions | ✅ Active |
| TC02 | Create Withdrawal transaction and verify in table | @regression @transactions | ✅ Active |
| TC03 | Create Withdrawal from different account | @regression @transactions | ✅ Active |
| TC04 | Insufficient funds withdrawal (Negative Test) | @regression @transactions @negative | ⚠️ Skipped |

**Features:**
- Transaction creation (Deposit, Withdrawal, Transfer)
- Row-level validation ensuring all values in same row
- Column-based cell verification for accuracy
- Email notification toggle testing
- Traditional vs data-driven testing patterns

**Documentation:** [transactions.spec.md](./tests/transactions.spec.md)

---

## 🏷️ Test Tags & Execution

### Available Tags
- **@smoke** - Critical path tests (3 tests) - Fast validation
- **@regression** - Full test suite (9 tests) - Comprehensive coverage
- **@login** - Login functionality tests (3 tests)
- **@dashboard** - Dashboard functionality tests (3 tests)
- **@transactions** - Transaction functionality tests (4 tests)
- **@negative** - Negative/error scenario tests (2 tests)

### Tag-Based Test Execution
```bash
# Run smoke tests (critical path - fast)
npm run smoke
npm run smoke:headed
npm run smoke:dev

# Run regression tests (full suite)
npm run regression
npm run regression:headed
npm run regression:dev

# Run tests by feature tag
npx playwright test --grep @login
npx playwright test --grep @dashboard
npx playwright test --grep @transactions
npx playwright test --grep @negative
```

---

## 📂 Project Structure

```
e2e-playwright-typescript-framework/
│
├── config/                           # Environment configuration
│   ├── environments/
│   │   ├── dev.env.ts               # Development environment config
│   │   ├── uat.env.ts               # UAT environment config
│   │   └── prod.env.ts              # Production environment config
│   ├── environmentManager.ts        # Environment manager class
│   └── types.ts                     # TypeScript type definitions
│
├── helpers/                          # Reusable helper methods
│   ├── apiLogger.ts                 # API logging utilities
│   ├── env.ts                       # Environment helper functions
│   ├── globalSetup.ts               # Global test setup
│   ├── helperMethodsUI.ts           # UI interaction helpers (click, fill, validate)
│   └── pageObjects.ts               # Page object helper functions
│
├── pages/                            # Page Object Model classes
│   ├── loginPage.ts                 # Login page object with validation methods
│   ├── dashboardPage.ts             # Dashboard page object for account management
│   └── transactionsPage.ts          # Transactions page object for transaction operations
│
├── test-data/                        # Test data files (JSON format)
│   ├── login.json                   # Login credentials (validUsers, invalidUser)
│   ├── dashboard.json               # Dashboard account test data
│   └── transactions.json            # Transaction test data (Deposit, Withdrawal, Transfer)
│
├── test-results/                     # Test execution results
│   └── last-run.json                # Last test run metadata
│
├── tests/                            # Test specification files
│   ├── login.spec.ts                # Login test scenarios (3 test cases)
│   ├── login.spec.md                # Login test suite documentation
│   ├── dashboard.spec.ts            # Dashboard account management tests (3 test cases)
│   ├── dashboard.spec.md            # Dashboard test suite documentation
│   ├── transactions.spec.ts         # Transaction tests (4 test cases, 1 skipped)
│   ├── transactions.spec.md         # Transactions test suite documentation
│   └── TEST_DOCUMENTATION_README.md # Documentation maintenance guide
│
├── utils/                            # Utility functions
│   └── logger.ts                    # Custom logger utility
│
├── playwright-report/                # Generated HTML test reports
│
├── node_modules/                     # Node.js dependencies
│
├── .env.example                      # Example environment variables
├── .gitignore                        # Git ignore configuration
├── package.json                      # NPM dependencies and scripts (19 scripts)
├── package-lock.json                 # Locked dependency versions
├── playwright.config.ts              # Playwright configuration
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Project documentation (this file)
```
├── node_modules/                     # Node.js dependencies
│
├── .env.example                      # Example environment variables
├── .gitignore                        # Git ignore configuration
├── package.json                      # NPM dependencies and scripts
├── package-lock.json                 # Locked dependency versions
├── playwright.config.ts              # Playwright configuration
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Project documentation (this file)
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/sureshtippana-automationarchitect/e2e-playwright-typescript-framework.git
cd e2e-playwright-typescript-framework
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Install Playwright Browsers
```bash
npx playwright install
```

### 4️⃣ Verify Installation
```bash
npx playwright test --list
```

---

## ▶️ Running Tests

### Run All Tests
```bash
# Run all tests in headless mode
npx playwright test

# Run all tests in headed mode
npx playwright test --headed

# Run all tests in debug mode
npx playwright test --debug
```

### Run Smoke Tests (Critical Path - 3 Tests)
```bash
# Headless mode (CI/CD pipelines)
npm run smoke

# Headed mode (watch browser)
npm run smoke:headed

# DEV environment with headed mode
npm run smoke:dev
```

### Run Regression Tests (Full Suite - 9 Tests)
```bash
# Headless mode (nightly runs)
npm run regression

# Headed mode (watch browser)
npm run regression:headed

# DEV environment with headed mode
npm run regression:dev
```

### Run Tests by Suite
```bash
# Run by feature tag
npx playwright test --grep @login
npx playwright test --grep @dashboard
npx playwright test --grep @transactions
npx playwright test --grep @negative

# Run specific suite
npm run login
npm run dashboard
npm run transactions

# Run specific test case
npx playwright test tests/login.spec.ts -g "TC01"
```

### Additional Options
```bash
# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests in parallel
npx playwright test --workers=4
```

---

## 📊 Test Coverage Summary

| Test Suite | Total Tests | Smoke Tests | Regression Tests | Negative Tests | Status |
|------------|-------------|-------------|------------------|----------------|--------|
| Login | 3 | 1 | 3 | 1 | ✅ 100% Pass |
| Dashboard | 3 | 1 | 3 | 0 | ✅ 100% Pass |
| Transactions | 4 | 1 | 4 | 1* | ✅ 75% Active |
| **Total** | **10** | **3** | **10** | **2** | **✅ 90% Active** |

*Note: TC04 (Insufficient funds) is skipped pending error validation mechanism*

---

## 🌍 Environment Configuration

The framework supports multiple environments using environment variables:

### Available Environments
- **dev** - Development environment
- **uat** - User Acceptance Testing environment
- **prod** - Production environment

### Setting Environment
```bash
# Using cross-env
cross-env test_env=dev npx playwright test

# Using npm scripts (dev environment with headed mode)
npm run login:dev
npm run dashboard:dev
```

### Environment Configuration Files
- `config/environments/dev.env.ts` - Development URLs and settings
- `config/environments/uat.env.ts` - UAT URLs and settings
- `config/environments/prod.env.ts` - Production URLs and settings

---

## 📚 Test Documentation

Each test suite has comprehensive markdown documentation that includes:
- Test case descriptions and priorities
- Tags for test categorization (@smoke, @regression, @feature)
- Step-by-step execution details
- Test data tables with JSON structure
- Expected results and validations
- Test coverage analysis
- Inline code comments positioned on the right side
- Future enhancement recommendations
- Maintenance logs with version history

### Available Documentation
- [login.spec.md](./tests/login.spec.md) - Login test suite documentation (3 test cases)
- [dashboard.spec.md](./tests/dashboard.spec.md) - Dashboard test suite documentation (3 test cases)
- [transactions.spec.md](./tests/transactions.spec.md) - Transactions test suite documentation (4 test cases)
- [TEST_DOCUMENTATION_README.md](./tests/TEST_DOCUMENTATION_README.md) - Documentation maintenance guide

### Test Data Files
- [login.json](./test-data/login.json) - Login credentials with validUsers and invalidUser structure
- [dashboard.json](./test-data/dashboard.json) - Dashboard account test data for all 3 test cases
- [transactions.json](./test-data/transactions.json) - Transaction test data including negative test scenarios

### Keeping Documentation Updated
When adding or modifying tests, update the corresponding `.md` file:
1. Add new test case details with tags
2. Update test coverage tables
3. Update test data structure if changed
4. Update maintenance log with version bump
5. Commit documentation with code changes

---

## 🏗️ Framework Architecture

### Page Object Model (POM)

#### LoginPage (`pages/loginPage.ts`)
**Purpose:** Handle all login page interactions and validations

**Key Methods:**
- `login(username, password)` - Complete login flow (fill username, password, click login)
- `fillUserName(userName)` - Fill username field
- `fillPassword(password)` - Fill password field
- `clickLogin()` - Click login button
- `validateTitleAfterSuccessfulLogin(expectedTitle)` - Verify successful login
- `validateLoginErrorMessage()` - Verify error message for failed login (negative testing)

**Elements:** Username input, password input, login button, error message locator, page title

#### DashboardPage (`pages/dashboardPage.ts`)
**Purpose:** Handle dashboard account management operations

**Key Methods:**
- `validateSecureBankTitleVisible()` - Verify dashboard loaded successfully
- `addNewAccount(accountType, accountName, initialBalance)` - Complete account creation orchestration
- `verifyAccountDisplayedWithBalance(accountName, expectedBalance)` - Row-level validation in table
- `clickQuickAddAccount()` - Open account creation form
- `fillAccountName(accountName)` - Fill account name field
- `selectAccountType(accountType)` - Select account type (Savings/Checking/Credit Card)
- `fillInitialBalance(amount)` - Fill initial balance field
- `clickSaveAccount()` - Submit account creation

**Elements:** Add account button, account form fields, account type dropdown, account table

#### TransactionsPage (`pages/transactionsPage.ts`)
**Purpose:** Handle transaction creation and validation

**Key Methods:**
- `navigateToTransactions()` - Navigate to transactions page
- `validateSecureBankTitleVisible()` - Verify page loaded
- `createNewTransaction(type, account, amount, description, sendEmail)` - Complete transaction orchestration
- `clickNewTransactionButton()` - Open transaction modal
- `selectTransactionType(type)` - Select Deposit/Withdrawal/Transfer
- `selectFromAccount(accountName)` - Select source account
- `enterAmount(amount)` - Enter transaction amount
- `enterDescription(description)` - Enter transaction description
- `toggleEmailNotification(shouldCheck)` - Toggle email notification
- `submitTransaction()` - Submit transaction
- `verifyTransactionInTable(type, balance, description)` - Row-level validation ensuring all values in same row

**Elements:** New transaction button, transaction modal, form fields, transaction table with column-based validation

### Helper Methods (`helpers/helperMethodsUI.ts`)
Reusable methods for common operations with inline logging:
- `clickElement(locator, logMessage)` - Click with wait and logging
- `fillInput(locator, value, logMessage)` - Fill input with clear and logging
- `validate(locator, logMessage)` - Visibility validation
- `validateValue(locator, expectedValue, logMessage)` - Value assertion for input fields
- `validateUrl(page, expectedUrl, logMessage)` - URL validation
- `waitForElementToBeVisible(locator, timeout)` - Wait for visibility with optional timeout

### Test Data Management

All test data is centralized in JSON files for easy maintenance and can be found in the `test-data/` directory:
- `login.json` - User credentials for valid and invalid login scenarios
- `dashboard.json` - Account types and test configurations
- `transactions.json` - Transaction data and negative test scenarios

### Dynamic Test Data Generation
```typescript
// Generate unique 4-digit random number for account names
const generateRandomNumber = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

// Usage: "My Savings Account-8273"
const accountName = `My Savings Account-${generateRandomNumber()}`;
```

### Code Style: Inline Comments
All test files follow a consistent pattern with comments positioned on the right side of code:
```typescript
const loginPage = new LoginPage(page);                                   // Initialize LoginPage
await loginPage.login(loginData.validUsers.admin.username, loginData.validUsers.admin.password);  // Login with admin
```

This approach keeps code concise while providing clear documentation.

---

## 🤖 AI-Driven QA Engineering

This framework leverages Large Language Models (LLMs) for:
- **Test Design:** Intelligent test case generation and pattern recognition
- **Code Optimization:** Best practices and code quality improvements
- **Documentation:** Comprehensive and up-to-date documentation generation
- **Maintenance:** Automated updates and consistency checks
- **Learning Aids:** Detailed comments and explanations for team members

### AI Contributions
- ✅ Data-driven testing patterns (TC02 & TC03 in Dashboard suite)
- ✅ Random data generation for unique test data
- ✅ Comprehensive inline code documentation
- ✅ Test suite markdown documentation
- ✅ Page Object Model best practices
- ✅ Helper method patterns

### Using AI for Test Maintenance
Example prompt for updating documentation:
```
I've added a new test case TC04 to dashboard.spec.ts that tests account deletion.
Please update dashboard.spec.md with this new test case following the existing format.
```

---
## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Playwright** | E2E testing framework |
| **TypeScript** | Type-safe programming language |
| **Node.js** | JavaScript runtime |
| **Cross-env** | Environment variable management |
| **Page Object Model** | Design pattern for maintainability |
| **Helper Methods** | Reusable utility functions |
| **JSON** | Test data management |

---



---

## 📝 Best Practices Implemented

### Code Organization
- ✅ **Separation of Concerns:** Test logic separated from page interactions
- ✅ **DRY Principle:** Reusable methods and helper utilities
- ✅ **Type Safety:** Strong typing with TypeScript
- ✅ **Consistent Naming:** Clear, descriptive names for methods and variables

### Test Design
- ✅ **Independent Tests:** Each test can run independently
- ✅ **Data-Driven Testing:** Parameterized tests for efficiency
- ✅ **Negative Testing:** Error scenarios and validation
- ✅ **Random Data Generation:** Unique test data to avoid conflicts

### Documentation
- ✅ **Inline Comments:** Detailed explanations for complex logic
- ✅ **JSDoc Comments:** Method documentation with parameters and return types
- ✅ **Markdown Documentation:** Comprehensive test suite documentation
- ✅ **Learning Aids:** Code patterns for both beginners and advanced users

### Maintainability
- ✅ **Page Object Model:** Easy UI change management
- ✅ **Helper Methods:** Centralized common operations
- ✅ **Environment Configuration:** Multi-environment support
- ✅ **Version Control:** Git-based change tracking

---

## 🎓 Learning Resources

### For New Team Members
1. **Start with TC01 in dashboard.spec.ts** - Traditional approach with step-by-step comments
2. **Review Page Object Model** - loginPage.ts and dashboardPage.ts
3. **Understand Helper Methods** - helperMethodsUI.ts
4. **Study Data-Driven Testing** - TC02 & TC03 in dashboard.spec.ts

### Code Patterns Demonstrated
- **Traditional Test Approach:** Explicit, easy-to-understand steps (Dashboard TC01)
- **Data-Driven Approach:** Efficient, maintainable testing (Dashboard TC02 & TC03)
- **Negative Testing:** Error validation (Login TC03)
- **Dynamic Data Generation:** Unique test data creation

---

## 🚀 CI/CD Integration

This framework is ready for integration with:

### GitHub Actions
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Jenkins
```groovy
pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Test') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}
```

### Azure DevOps
- Supports Azure Pipelines integration
- Can be configured for multi-environment testing
- Automated test execution on code commits

---

## 🔮 Future Enhancements

### Planned Features
- [ ] API testing integration with request/response validation
- [ ] Visual regression testing with screenshot comparison
- [ ] Performance testing with metrics collection
- [ ] Accessibility testing with axe-core
- [ ] Test data management with database integration
- [ ] Advanced reporting with Allure
- [ ] Parallel execution optimization
- [ ] Docker containerization for test execution

### Recommended Test Cases to Add
- [ ] Empty field validations for login
- [ ] Account edit functionality
- [ ] Account delete functionality
- [ ] Search and filter accounts
- [ ] User profile management

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Browsers not installed
```bash
# Solution
npx playwright install
```

**Issue:** Test timeout
```bash
# Solution: Increase timeout in playwright.config.ts
timeout: 60000  // 60 seconds
```

**Issue:** Environment not set correctly
```bash
# Solution: Explicitly set environment
cross-env test_env=dev npx playwright test
```

**Issue:** Test data conflicts
```bash
# Solution: Tests already use random number generation for unique data
# Check that generateRandomNumber() is being used
```

---

## 📞 Support & Contact

### For Questions or Issues
- **Framework Repository:** [GitHub Repository](https://github.com/sureshtippana-automationarchitect/e2e-playwright-typescript-framework)
- **Documentation:** Check test suite `.md` files in `tests/` folder
- **Team QA Lead:** Contact for framework-specific questions
- **AI QA Engineering Team:** For AI-assisted testing support

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes (include test documentation updates)
4. Submit a pull request
5. Ensure all tests pass

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Suresh Tippana**  
Automation Architect

### Acknowledgments
- Playwright Team for the excellent testing framework
- TypeScript Community for type safety improvements
- AI/LLM Technology for intelligent test generation and documentation
- Open Source Community for continuous inspiration

---

**Last Updated:** May 8, 2026  
**Framework Version:** 1.3.0  
**Total Test Cases:** 10  
**Test Success Rate:** 100%  
**AI-Assisted Development:** ✅ Enabled

---

**⭐ Star this repository** if you find it helpful!

**💡 Happy Testing!** 🚀