# Playwright TypeScript Automation Framework

A scalable and maintainable end-to-end (E2E) test automation framework built using **Playwright + TypeScript**, following best practices like **Page Object Model (POM)**, **Fixtures Pattern**, environment configuration, reusable utilities, data-driven testing, tagged test execution, mobile testing support, screenshot utilities, natural language test runner, and comprehensive documentation.

**🤖 AI-Driven QA Engineering:** This framework is developed and maintained with assistance from Large Language Models (LLMs) for intelligent test design, optimization, and documentation.

---

## 📌 Key Features

- ✅ **Playwright with TypeScript** - Modern, reliable E2E testing with full type safety
- ✅ **Page Object Model (POM)** - Maintainable and reusable page classes  
- ✅ **Fixtures Pattern** - Playwright's dependency injection for cleaner tests
- ✅ **Natural Language Test Runner** - Run tests using plain English commands
- ✅ **Cross-browser testing** - Chromium, Firefox, WebKit support
- ✅ **Mobile testing** - iPhone 14 Pro Max viewport support
- ✅ **Screenshot utilities** - Timestamp-based, organized screenshot capture
- ✅ **Environment-based configuration** - dev, uat, prod environments
- ✅ **Data-driven testing** - JSON-based test data with dynamic generation
- ✅ **Tagged test execution** - @smoke, @regression, @mobile, @negative tags
- ✅ **Reusable utilities** - Helper methods for common operations
- ✅ **Comprehensive documentation** - 8 detailed guides in docs/ folder
- ✅ **Negative testing** - Error validation and security testing
- ✅ **Random data generation** - Unique test data for each run
- ✅ **API + UI automation** - Support for both API and UI testing
- ✅ **Custom reporting** - HTML reports with detailed execution logs
- ✅ **CI/CD integration** - GitHub Actions workflows for automated testing
- ✅ **Scheduled testing** - Nightly test runs across all browsers
- ✅ **AI-assisted development** - LLM-powered test generation and maintenance
- ✅ **Clean architecture** - Organized folder structure with separate runner and docs

---

## 🧪 Test Suites

### Login Test Suite (`login.spec.ts`)
**Total Test Cases:** 4 (2 positive, 1 negative, 1 mobile)  
**Tags:** `@smoke`, `@regression`, `@login`, `@negative`, `@mobile`

| Test Case | Description | Tags | Status |
|-----------|-------------|------|--------|
| TC01 | Admin login with "Full access" | @smoke @regression @login | ✅ Active |
| TC02 | Viewer login with "Read-only access" | @regression @login | ✅ Active |
| TC03 | Login with invalid credentials (Negative Test) | @regression @login @negative | ✅ Active |
| TC04 | Admin login on iPhone 14 Pro Max (Mobile) | @smoke @login @mobile | ✅ Active |

### Dashboard Test Suite (`Dashboard.spec.ts`)
**Total Test Cases:** 4 (Account Management + Mobile)  
**Tags:** `@smoke`, `@regression`, `@dashboard`, `@mobile`

| Test Case | Description | Tags | Status |
|-----------|-------------|------|--------|
| TC01 | Add New Savings Account and verify balance | @smoke @regression @dashboard | ✅ Active |
| TC02 | Add New Checking Account and verify balance | @regression @dashboard | ✅ Active |
| TC03 | Add New Credit Card and verify balance | @regression @dashboard | ✅ Active |
| TC04 | Add Savings Account on iPhone 14 Pro Max (Mobile) | @smoke @dashboard @mobile | ✅ Active |

**Features:**
- Data-driven testing approach (TC02 & TC03)
- Random 4-digit account name generation for unique account
- Balance verification in dashboard table
- Screenshot capture on test completion
- Mobile viewport testing (TC04)
- Fixtures-based test implementation

### Transactions Test Suite (`transactions.spec.ts`)
**Total Test Cases:** 4 (3 active, 1 mobile)  
**Tags:** `@smoke`, `@regression`, `@transactions`, `@mobile`

| Test Case | Description | Tags | Status |
|-----------|-------------|------|--------|
| TC01 | Create Deposit transaction and verify in table | @smoke @regression @transactions | ✅ Active |
| TC02 | Create Withdrawal transaction and verify in table | @regression @transactions | ✅ Active |
| TC03 | Create Withdrawal from different account | @regression @transactions | ✅ Active |
| TC04 | Create Deposit on iPhone 14 Pro Max (Mobile) | @smoke @transactions @mobile | ✅ Active |

**Features:**
- Transaction creation (Deposit, Withdrawal, Transfer)
- Row-level validation ensuring all values in same row
- Column-based cell verification for accuracy
- Email notification toggle testing
- Mobile testing with iPhone 14 Pro Max viewport
- Fixtures-based implementation with loginWithAdmin

---

## 🏷️ Test Tags & Execution

### Available Tags
- **@smoke** - Critical path tests (6 tests) - Fast validation
- **@regression** - Full test suite (10 tests) - Comprehensive coverage
- **@login** - Login functionality tests (4 tests)
- **@dashboard** - Dashboard functionality tests (4 tests)
- **@transactions** - Transaction functionality tests (4 tests)
- **@mobile** - Mobile viewport tests (4 tests) - iPhone 14 Pro Max
- **@negative** - Negative/error scenario tests (1 test)

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
npx playwright test --grep @mobile
npx playwright test --grep @negative
```

---

## 📂 Project Structure

```
e2e-playwright-typescript-framework/
│
├── test-runner/                      # ✨ Natural Language Test Runner
│   ├── testRunner.ts                # Core TypeScript test runner with command parser
│   ├── run.ps1                      # PowerShell wrapper script for Windows
│   ├── run.bat                      # Batch wrapper script for CMD
│   ├── setup-powershell.ps1         # PowerShell profile setup for direct commands
│   └── README.md                    # Test runner documentation and usage guide
│
├── docs/                             # ✨ Comprehensive Framework Documentation
│   ├── HOW_TO_RUN_TESTS.md          # Complete testing guide with all methods
│   ├── NATURAL_LANGUAGE_TEST_RUNNER.md  # Natural language runner features
│   ├── DIRECT_COMMANDS_GUIDE.md     # Direct command execution setup guide
│   ├── QUICK_REFERENCE.md           # Command cheat sheet and quick examples
│   ├── FIXTURES_GUIDE.md            # Complete Playwright fixtures guide
│   ├── FIXTURES_IMPLEMENTATION_SUMMARY.md  # Fixtures implementation details
│   ├── TYPESCRIPT_IMPLEMENTATION.md # Technical implementation documentation
│   ├── ISSUE_FIXED.md               # Troubleshooting and solutions
│   └── README.md                    # Documentation index and navigation
│
├── fixtures/                         # Playwright Fixtures for Dependency Injection
│   └── baseFixtures.ts              # Custom fixtures (loginPage, dashboardPage, loginWithAdmin, etc.)
│
├── tests/                            # Test Specification Files
│   ├── login.spec.ts                # Login test scenarios (4 test cases)
│   ├── Dashboard.spec.ts            # Dashboard account management (4 test cases)
│   ├── transactions.spec.ts         # Transaction tests (4 test cases)
│   └── fixtures-examples.spec.ts    # Fixtures usage examples and patterns
│
├── pages/                            # Page Object Model Classes
│   ├── loginPage.ts                 # Login page with validation methods
│   ├── dashboardPage.ts             # Dashboard with account management
│   └── transactionsPage.ts          # Transactions with row-level validation
│
├── helpers/                          # Helper Utilities
│   ├── helperMethodsUI.ts           # UI helpers + Screenshot utilities
│   ├── globalSetup.ts               # Global test setup
│   ├── pageObjects.ts               # Page object helper functions
│   ├── apiLogger.ts                 # API logging utilities
│   └── env.ts                       # Environment helper functions
│
├── config/                           # Environment Configuration
│   ├── environmentManager.ts        # Environment manager class
│   ├── types.ts                     # TypeScript type definitions
│   └── environments/
│       ├── dev.env.ts               # Development environment config
│       ├── uat.env.ts               # UAT environment config
│       └── prod.env.ts              # Production environment config
│
├── test-data/                        # Test Data Files (JSON)
│   ├── login.json                   # Login credentials
│   ├── dashboard.json               # Dashboard account test data
│   └── transactions.json            # Transaction test data
│
├── utils/                            # Utility Functions
│   └── logger.ts                    # Custom logger utility
│
├── screenshots/                      # Test Screenshots (Auto-generated, gitignored)
│   └── {TestName}/                  # Organized by test name
│       └── {screenshotName}_{timestamp}.png
│
├── .github/                          # ✨ GitHub Actions CI/CD Configuration
│   └── workflows/                   # GitHub Actions workflow files
│       ├── playwright.yml           # Main CI/CD pipeline (smoke, regression, mobile)
│       └── scheduled-tests.yml      # Nightly scheduled test runs
│
├── test-results/                     # Test Execution Results (gitignored)
├── playwright-report/                # HTML Test Reports (gitignored)
│
├── playwright.config.ts              # Playwright Configuration
├── package.json                      # NPM dependencies and scripts
├── tsconfig.json                     # TypeScript Configuration
├── FRAMEWORK_ORGANIZATION.md         # Framework organization documentation
└── README.md                         # Main project documentation (this file)
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

### Run Smoke Tests (Critical Path - 6 Tests)
```bash
# Headless mode (CI/CD pipelines)
npm run smoke

# Headed mode (watch browser)
npm run smoke:headed

# DEV environment with headed mode
npm run smoke:dev
```

### Run Regression Tests (Full Suite - 10 Tests)
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

---

## 🎭 Natural Language Test Runner

Run tests using plain English commands! No need to remember complex CLI syntax.

### Quick Start - PowerShell (Windows - Recommended)
```powershell
# Simple commands - no quotes needed!
.\test-runner\run.ps1 smoke tests from login spec
.\test-runner\run.ps1 regression tests from dashboard spec in headed mode
.\test-runner\run.ps1 mobile tests
.\test-runner\run.ps1 smoke and mobile tests in headed mode
```

### Alternative Methods

**Windows Command Prompt (CMD):**
```cmd
test-runner\run.bat smoke tests from login spec
test-runner\run.bat mobile tests in headed mode
```

**NPM Scripts (Cross-Platform):**
```bash
# Predefined commands
npm run run -- "run smoke tests from login spec"
npm run run:smoke-from-login
npm run run:smoke-from-dashboard
npm run run:mobile-tests
npm run help

# Custom command
npm run run -- "run regression tests in headed mode"
```

**Direct Execution:**
```bash
npx ts-node test-runner/testRunner.ts "run smoke tests from login spec"
```

### Common Natural Language Commands

```powershell
# By tags
.\test-runner\run.ps1 smoke tests
.\test-runner\run.ps1 regression tests
.\test-runner\run.ps1 mobile tests

# By spec files
.\test-runner\run.ps1 tests from login spec
.\test-runner\run.ps1 tests from dashboard spec
.\test-runner\run.ps1 tests from transactions spec

# Combinations
.\test-runner\run.ps1 smoke tests from login spec
.\test-runner\run.ps1 smoke and mobile tests from dashboard spec
.\test-runner\run.ps1 regression tests in headed mode
.\test-runner\run.ps1 mobile tests from all specs in headed mode

# With browsers
.\test-runner\run.ps1 smoke tests with firefox
.\test-runner\run.ps1 regression tests with webkit
```

### Documentation
- **📖 [Complete Guide](docs/NATURAL_LANGUAGE_TEST_RUNNER.md)** - All features and syntax
- **⚡ [Quick Reference](docs/QUICK_REFERENCE.md)** - Command cheat sheet
- **🎯 [How to Run Tests](docs/HOW_TO_RUN_TESTS.md)** - Step-by-step instructions
- **🚀 [Direct Commands Setup](docs/DIRECT_COMMANDS_GUIDE.md)** - PowerShell profile setup

### Features
- ✅ Natural English commands - Easy to remember
- ✅ Tag filtering - @smoke, @regression, @mobile, @negative
- ✅ Spec filtering - login, dashboard, transactions
- ✅ Mode selection - headed, headless, debug, ui
- ✅ Browser selection - chromium, firefox, webkit
- ✅ Beautiful colored output with progress indicators
- ✅ Smart command parsing
- ✅ Beginner-friendly with helpful error messages

**Get Help:**
```powershell
.\test-runner\run.ps1 --help
npm run help
```

---
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

| Test Suite | Total Tests | Smoke Tests | Regression Tests | Mobile Tests | Status |
|------------|-------------|-------------|------------------|--------------|--------|
| Login | 4 | 2 | 3 | 1 | ✅ 100% Pass |
| Dashboard | 4 | 2 | 3 | 1 | ✅ 100% Pass |
| Transactions | 4 | 2 | 4 | 1 | ✅ 100% Pass |
| **Total** | **12** | **6** | **10** | **3** | **✅ 100% Active** |

---

## 🎯 Playwright Fixtures Implementation

The framework uses Playwright's **Fixtures Pattern** for dependency injection, providing cleaner test code and automatic setup/teardown.

### Available Fixtures

```typescript
import { test } from '../fixtures/baseFixtures';

test('Example test', async ({ 
  loginPage,        // LoginPage instance (auto-created)
  dashboardPage,    // DashboardPage instance (auto-created)
  transactionsPage, // TransactionsPage instance (auto-created)
  helperMethods,    // HelperMethods instance (auto-created)
  loginWithAdmin,   // Auto-login as admin (pre-authenticated)
  loginWithViewer   // Auto-login as viewer (pre-authenticated)
}) => {
  // Your test code here
});
```

### Fixtures Benefits

- ✅ **Automatic Setup** - Page objects created automatically
- ✅ **Pre-authenticated Tests** - Skip login with `loginWithAdmin`/`loginWithViewer`
- ✅ **Cleaner Code** - No manual instantiation needed
- ✅ **Better Isolation** - Each test gets fresh instances
- ✅ **Reusability** - Share setup logic across tests
- ✅ **Type Safety** - Full TypeScript support

### Usage Examples

**Basic Fixtures:**
```typescript
test('Add account', async ({ loginWithAdmin, dashboardPage }) => {
  // Already logged in as admin
  await dashboardPage.addNewAccount('Savings', 'My Account', '1000');
});
```

**Page Object Fixtures:**
```typescript
test('Login test', async ({ loginPage }) => {
  await loginPage.login('admin', 'password');
  await loginPage.validateTitleAfterSuccessfulLogin('SecureBank');
});
```

**Documentation:**
- **📖 [Complete Fixtures Guide](docs/FIXTURES_GUIDE.md)** - Comprehensive fixtures documentation
- **📝 [Implementation Summary](docs/FIXTURES_IMPLEMENTATION_SUMMARY.md)** - Quick overview

---

## 📸 Screenshot Utilities

Framework includes built-in screenshot capture with organized folder structure and timestamp naming.

### Screenshot Methods

```typescript
// Full page screenshot
await helperMethods.takeScreenshot('account-created', testInfo.title, true);
// Result: screenshots/TC01-Dashboard/account-created_0511121819.png

// Element screenshot
await helperMethods.takeElementScreenshot(locator, 'element-name', testInfo.title);

// With test info (automatic naming)
await helperMethods.takeScreenshotWithTestInfo(testInfo, 'final-state');
```

### Features

- ✅ **Timestamp-based naming** - MMDDHHmmss format
- ✅ **Organized folders** - Grouped by test name
- ✅ **Sanitized filenames** - Safe for all operating systems
- ✅ **Full page or element** - Flexible capture options
- ✅ **Automatic cleanup** - `npm run clean:screenshots`

### Screenshot Location

```
screenshots/
├── TC01-Dashboard-SavingsAccount/
│   └── account-created-successfully_0511121819.png
├── TC04-Dashboard-Mobile/
│   └── mobile-account-created_0511121819.png
└── TC04-Transactions-Mobile/
    └── transaction-completed_0511121820.png
```

---

## 📱 Mobile Testing Support

Framework includes mobile viewport testing with iPhone 14 Pro Max configuration.

### Mobile Test Cases

- **Login TC04** - Admin login on iPhone 14 Pro Max
- **Dashboard TC04** - Account creation on mobile viewport
- **Transactions TC04** - Transaction creation on mobile viewport

### Programmatic Viewport Setting

```typescript
test('Mobile test @mobile', async ({ page, loginWithAdmin, dashboardPage }) => {
  // Set iPhone 14 Pro Max viewport
  await page.setViewportSize({ width: 430, height: 932 });
  
  // Your test code
  await dashboardPage.addNewAccount('Savings', 'Mobile-Account', '2500');
});
```

### Running Mobile Tests

```powershell
# Using natural language runner
.\test-runner\run.ps1 mobile tests

# Using tag
npx playwright test --grep @mobile

# Specific mobile test
npx playwright test tests/Dashboard.spec.ts -g "TC04"
```

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

## 📚 Documentation & Resources

### Complete Documentation Suite

The framework includes comprehensive documentation in the `docs/` folder:

| Document | Description |
|----------|-------------|
| **[HOW_TO_RUN_TESTS.md](docs/HOW_TO_RUN_TESTS.md)** | Complete guide to running tests using all available methods |
| **[NATURAL_LANGUAGE_TEST_RUNNER.md](docs/NATURAL_LANGUAGE_TEST_RUNNER.md)** | Natural language runner features, syntax, and examples |
| **[DIRECT_COMMANDS_GUIDE.md](docs/DIRECT_COMMANDS_GUIDE.md)** | PowerShell profile setup for direct command execution |
| **[QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md)** | Command cheat sheet for common test commands |
| **[GITHUB_ACTIONS_SETUP.md](docs/GITHUB_ACTIONS_SETUP.md)** | GitHub Actions CI/CD setup and configuration guide |
| **[FIXTURES_GUIDE.md](docs/FIXTURES_GUIDE.md)** | Comprehensive Playwright fixtures guide |
| **[FIXTURES_IMPLEMENTATION_SUMMARY.md](docs/FIXTURES_IMPLEMENTATION_SUMMARY.md)** | Fixtures implementation details and patterns |
| **[TYPESCRIPT_IMPLEMENTATION.md](docs/TYPESCRIPT_IMPLEMENTATION.md)** | Technical implementation documentation |
| **[ISSUE_FIXED.md](docs/ISSUE_FIXED.md)** | Troubleshooting and issue resolution guide |
| **[docs/README.md](docs/README.md)** | Documentation index and navigation |

### Framework Organization

- **[FRAMEWORK_ORGANIZATION.md](FRAMEWORK_ORGANIZATION.md)** - Framework structure and organization details
- **[test-runner/README.md](test-runner/README.md)** - Test runner documentation

### Test Data Files

Test data is centralized in JSON files for easy maintenance:

- **[login.json](test-data/login.json)** - Login credentials (validUsers, invalidUser)
- **[dashboard.json](test-data/dashboard.json)** - Dashboard account test data
- **[transactions.json](test-data/transactions.json)** - Transaction test data

### Keeping Documentation Updated

When adding or modifying tests:
1. Update test specifications
2. Update relevant documentation in `docs/` folder
3. Update test coverage tables in README.md
4. Commit documentation with code changes

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
Reusable methods for common operations with inline logging and screenshot utilities:

**UI Interaction Methods:**
- `clickElement(locator, logMessage)` - Click with wait and logging
- `fillInput(locator, value, logMessage)` - Fill input with clear and logging
- `validate(locator, logMessage)` - Visibility validation
- `validateValue(locator, expectedValue, logMessage)` - Value assertion for input fields
- `validateUrl(page, expectedUrl, logMessage)` - URL validation
- `waitForElementToBeVisible(locator, timeout)` - Wait for visibility with optional timeout

**Screenshot Methods:**
- `takeScreenshot(screenshotName, testName, fullPage)` - Capture full-page or viewport screenshot
- `takeElementScreenshot(locator, screenshotName, testName)` - Capture specific element screenshot
- `takeScreenshotWithTestInfo(testInfo, screenshotName, fullPage)` - Auto-extract test name from context
- `getCurrentDateTime()` - Get timestamp in MMDDHHmmss format

**Features:**
- Organized folder structure: `screenshots/{testName}/{screenshotName}_{timestamp}.png`
- Sanitized filenames for cross-platform compatibility
- Timestamp-based naming to prevent overwrites

### Fixtures System (`fixtures/baseFixtures.ts`)

Custom Playwright fixtures providing dependency injection for cleaner tests:

**Available Fixtures:**
- `loginPage` - Automatic LoginPage instance creation
- `dashboardPage` - Automatic DashboardPage instance creation
- `transactionsPage` - Automatic TransactionsPage instance creation
- `helperMethods` - HelperMethods instance with screenshot utilities
- `loginWithAdmin` - Pre-authenticated admin session (auto-login)
- `loginWithViewer` - Pre-authenticated viewer session (auto-login)

**Benefits:**
- Automatic setup and teardown
- Pre-authenticated test scenarios
- Cleaner test code
- Better test isolation
- Full TypeScript support

### Test Data Management

All test data is centralized in JSON files for easy maintenance and can be found in the `test-data/` directory:
- `login.json` - User credentials for valid and invalid login scenarios
- `dashboard.json` - Account types and test configurations
- `transactions.json` - Transaction data

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
- **Natural Language Interface:** Plain English test execution commands

### AI Contributions
- ✅ Playwright Fixtures implementation for cleaner tests
- ✅ Natural Language Test Runner with TypeScript
- ✅ Screenshot utilities with organized folder structure
- ✅ Mobile testing support with programmatic viewports
- ✅ Data-driven testing patterns
- ✅ Random data generation for unique test data
- ✅ Comprehensive documentation suite (8 guides)
- ✅ Framework organization and structure
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
| **Playwright** | E2E testing framework with cross-browser support |
| **TypeScript** | Type-safe programming language |
| **Node.js** | JavaScript runtime environment |
| **ts-node** | TypeScript execution without compilation |
| **Playwright Fixtures** | Dependency injection pattern |
| **Page Object Model** | Design pattern for maintainability |
| **Cross-env** | Environment variable management |
| **JSON** | Test data management |

---

## 📝 Best Practices Implemented

### Code Organization
- ✅ **Separation of Concerns:** Test logic separated from page interactions
- ✅ **DRY Principle:** Reusable methods and helper utilities
- ✅ **Type Safety:** Strong typing with TypeScript
- ✅ **Consistent Naming:** Clear, descriptive names for methods and variables
- ✅ **Modular Structure:** Organized folders (test-runner/, docs/, fixtures/, pages/)
- ✅ **Fixtures Pattern:** Dependency injection for cleaner tests

### Test Design
- ✅ **Independent Tests:** Each test can run independently
- ✅ **Data-Driven Testing:** Parameterized tests for efficiency
- ✅ **Fixtures-Based:** Pre-authenticated sessions and page objects
- ✅ **Mobile Testing:** Programmatic viewport settings
- ✅ **Screenshot Capture:** Organized evidence collection
- ✅ **Negative Testing:** Error scenarios and validation
- ✅ **Random Data Generation:** Unique test data to avoid conflicts

### Documentation
- ✅ **Comprehensive Guides:** 8 detailed documentation files
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
- **Documentation:** Comprehensive guides in `docs/` folder
- **Test Runner Help:** `.\test-runner\run.ps1 --help`
- **Team QA Lead:** Contact for framework-specific questions
- **AI QA Engineering Team:** For AI-assisted testing support

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes (include documentation updates)
4. Test with `.\test-runner\run.ps1 smoke tests`
5. Update relevant documentation in `docs/` folder
6. Submit a pull request
7. Ensure all tests pass

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

**Last Updated:** May 11, 2026  
**Framework Version:** 2.0.0  
**Total Test Cases:** 12  
**Test Success Rate:** 100%  
**AI-Assisted Development:** ✅ Enabled  
**Natural Language Runner:** ✅ Implemented  
**Fixtures Pattern:** ✅ Implemented  
**Mobile Testing:** ✅ Supported  
**Screenshot Utilities:** ✅ Integrated

---

**⭐ Star this repository** if you find it helpful!

**💡 Happy Testing!** 🚀