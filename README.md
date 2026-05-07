# Playwright TypeScript Automation Framework

A scalable and maintainable end-to-end (E2E) test automation framework built using **Playwright + TypeScript**, following best practices like **Page Object Model (POM)**, environment configuration, reusable utilities, data-driven testing, and comprehensive test documentation.

**🤖 AI-Driven QA Engineering:** This framework is developed and maintained with assistance from Large Language Models (LLMs) for intelligent test design, optimization, and documentation.

---

## 📌 Key Features

- ✅ **Playwright with TypeScript** - Modern, reliable E2E testing
- ✅ **Page Object Model (POM)** - Maintainable and reusable page classes
- ✅ **Cross-browser testing** - Chromium, Firefox, WebKit support
- ✅ **Environment-based configuration** - dev, uat, prod environments
- ✅ **Data-driven testing** - JSON-based test data with dynamic generation
- ✅ **Reusable utilities** - Helper methods for common operations
- ✅ **Comprehensive test documentation** - Markdown files for each test suite
- ✅ **Negative testing** - Error validation and security testing
- ✅ **Random data generation** - Unique test data for each run
- ✅ **API + UI automation** - Support for both API and UI testing
- ✅ **Custom reporting** - HTML reports with detailed execution logs
- ✅ **CI/CD ready** - GitHub Actions compatible
- ✅ **AI-assisted development** - LLM-powered test generation and maintenance

---

## 🧪 Test Suites

### Login Test Suite (`login.spec.ts`)
**Total Test Cases:** 3 (2 positive, 1 negative)

| Test Case | Description | Status |
|-----------|-------------|--------|
| TC01 | Admin login with "Full access" | ✅ Active |
| TC02 | Viewer login with "Read-only access" | ✅ Active |
| TC03 | Login with invalid credentials (Negative Test) | ✅ Active |

**Documentation:** [login.spec.md](./tests/login.spec.md)

### Dashboard Test Suite (`Dashboard.spec.ts`)
**Total Test Cases:** 3 (Account Management)

| Test Case | Description | Status |
|-----------|-------------|--------|
| TC01 | Add New Savings Account and verify balance | ✅ Active |
| TC02 | Add New Checking Account and verify balance | ✅ Active |
| TC03 | Add New Credit Card and verify balance | ✅ Active |

**Features:**
- Data-driven testing approach (TC02 & TC03)
- Random 4-digit account name generation
- Balance verification in dashboard table
- Traditional vs optimized code patterns for learning

**Documentation:** [Dashboard.spec.md](./tests/Dashboard.spec.md)

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
│   └── dashboardPage.ts             # Dashboard page object for account management
│
├── test-data/                        # Test data files
│   └── login.json                   # Login credentials (admin, viewer)
│
├── test-results/                     # Test execution results
│   └── last-run.json                # Last test run metadata
│
├── tests/                            # Test specification files
│   ├── login.spec.ts                # Login test scenarios (3 test cases)
│   ├── login.spec.md                # Login test suite documentation
│   ├── Dashboard.spec.ts            # Dashboard account management tests (3 test cases)
│   ├── Dashboard.spec.md            # Dashboard test suite documentation
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

### Run Login Tests
```bash
# Run login tests in dev environment (headed mode)
npm run login:dev

# Run all login tests
npx playwright test tests/login.spec.ts

# Run specific login test case
npx playwright test tests/login.spec.ts -g "TC01"
```

### Run Dashboard Tests
```bash
# Run dashboard tests in dev environment (headed mode)
npm run dashboard:dev

# Run dashboard tests (headless)
npm run dashboard

# Run dashboard tests (headed mode)
npm run dashboard:headed

# Run dashboard tests in debug mode
npm run dashboard:debug

# Run specific dashboard test case
npx playwright test tests/Dashboard.spec.ts -g "TC01"
```

### Run Tests by Tag
```bash
# Run all tests in a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests in parallel
npx playwright test --workers=4
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

## 📚 Test Documentation

Each test suite has comprehensive markdown documentation that includes:
- Test case descriptions and priorities
- Step-by-step execution details
- Test data tables
- Expected results
- Test coverage analysis
- Future enhancement recommendations
- Maintenance logs

### Available Documentation
- [login.spec.md](./tests/login.spec.md) - Login test suite documentation
- [Dashboard.spec.md](./tests/Dashboard.spec.md) - Dashboard test suite documentation
- [TEST_DOCUMENTATION_README.md](./tests/TEST_DOCUMENTATION_README.md) - Documentation maintenance guide

### Keeping Documentation Updated
When adding or modifying tests, update the corresponding `.md` file:
1. Add new test case details
2. Update test coverage tables
3. Update maintenance log with version bump
4. Commit documentation with code changes

---

## 🏗️ Framework Architecture

### Page Object Model (POM)

#### LoginPage (`pages/loginPage.ts`)
**Methods:**
- `login(username, password)` - Complete login flow
- `fillUserName(userName)` - Fill username field
- `fillPassword(password)` - Fill password field
- `clickLogin()` - Click login button
- `validateTitleAfterSuccessfulLogin(expectedTitle)` - Verify successful login
- `validateLoginErrorMessage()` - Verify error message for failed login

#### DashboardPage (`pages/dashboardPage.ts`)
**Methods:**
- `validateSecureBankTitleVisible()` - Verify dashboard loaded
- `addNewAccount(accountType, accountName, initialBalance)` - Complete account creation flow
- `verifyAccountDisplayedWithBalance(accountName, expectedBalance)` - Verify account in table
- `clickQuickAddAccount()` - Open account form
- `fillAccountName(accountName)` - Fill account name
- `selectAccountType(accountType)` - Select account type from dropdown
- `fillInitialBalance(amount)` - Fill initial balance

### Helper Methods (`helpers/helperMethodsUI.ts`)
Reusable methods for common operations:
- `clickElement(locator, logMessage)` - Click with wait and logging
- `fillInput(locator, value, logMessage)` - Fill input with clear and logging
- `validate(locator, logMessage)` - Visibility validation
- `validateValue(locator, expectedValue, logMessage)` - Value assertion
- `validateUrl(page, expectedUrl, logMessage)` - URL validation
- `waitForElementToBeVisible(locator, timeout)` - Wait for visibility

### Dynamic Test Data Generation
```typescript
// Generate unique 4-digit random number for account names
const generateRandomNumber = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

// Usage: "My Savings Account-8273"
const accountName = `My Savings Account-${generateRandomNumber()}`;
```

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
I've added a new test case TC04 to Dashboard.spec.ts that tests account deletion.
Please update Dashboard.spec.md with this new test case following the existing format.
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

## 📊 Test Coverage Summary

### Login Functionality
| Feature | Coverage | Test Cases |
|---------|----------|------------|
| Admin Login | ✅ Covered | TC01 |
| Viewer Login | ✅ Covered | TC02 |
| Invalid Credentials | ✅ Covered | TC03 |
| Empty Credentials | ❌ Not Covered | - |
| Password Masking | ❌ Not Covered | - |

### Dashboard - Account Management
| Feature | Coverage | Test Cases |
|---------|----------|------------|
| Add Savings Account | ✅ Covered | TC01 |
| Add Checking Account | ✅ Covered | TC02 |
| Add Credit Card | ✅ Covered | TC03 |
| Verify Account Display | ✅ Covered | TC01, TC02, TC03 |
| Verify Balance Display | ✅ Covered | TC01, TC02, TC03 |
| Edit Account | ❌ Not Covered | - |
| Delete Account | ❌ Not Covered | - |

**Total Test Cases:** 6 (5 positive, 1 negative)  
**Test Success Rate:** 100%

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
1. **Start with TC01 in Dashboard.spec.ts** - Traditional approach with step-by-step comments
2. **Review Page Object Model** - loginPage.ts and dashboardPage.ts
3. **Understand Helper Methods** - helperMethodsUI.ts
4. **Study Data-Driven Testing** - TC02 & TC03 in Dashboard.spec.ts

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
- [ ] Transaction management
- [ ] User profile management
- [ ] Security testing (SQL injection, XSS)

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

**Last Updated:** May 7, 2026  
**Framework Version:** 1.3.0  
**Total Test Cases:** 6  
**Test Success Rate:** 100%  
**AI-Assisted Development:** ✅ Enabled
AI-Driven QA Engineer | Automation Architect
Playwright | TypeScript | API & UI Testing

--------------
⭐ Contribution
Feel free to fork, enhance, and raise PRs.

----------
💡 Why this framework?
This framework is designed to solve real-world challenges like:
- Flaky test handling
- Maintainability at scale
- Reusability across UI & API layers
- - 🤖 AI-assisted test design (future-ready)
- 🧠 LLM-based test case generation

