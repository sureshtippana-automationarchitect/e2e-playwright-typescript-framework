# Test Suite Documentation README

## 📚 Overview
This directory contains comprehensive documentation for all test suites in the Playwright TypeScript E2E framework. These markdown files serve as living documentation that should be updated whenever test cases are added, modified, or removed.

**Last Updated:** May 8, 2026  
**Total Test Suites:** 3 (Login, Dashboard, Transactions)  
**Total Test Cases:** 10 (9 active, 1 skipped)  
**Documentation Files:** 3 + 1 guide

---

## 🤖 AI-Driven QA Engineering Approach

This documentation is part of our **AI-driven QA engineering initiative** where Large Language Models (LLMs) assist in:
- Test design and implementation
- Documentation generation and maintenance
- Code optimization and best practices
- Pattern recognition and test improvement suggestions
- Tag-based test organization (@smoke, @regression, @feature)
- Inline comment generation for better code readability

**Benefits:**
- ✅ Consistent documentation standards across all test suites
- ✅ Up-to-date test coverage information with tag-based categorization
- ✅ Faster onboarding for new team members with inline comments
- ✅ Better collaboration between QA and development teams
- ✅ Intelligent test improvement recommendations
- ✅ Centralized test data management in JSON files
- ✅ Row-level validation patterns for table data verification

---

## 📋 Available Test Documentation

### [login.spec.md](./login.spec.md)
Documents the login functionality test suite:
- **Version:** 1.1.0
- **Test Cases:** 3 (TC01-TC03)
- **Coverage:** Admin and Viewer login with different access levels, plus negative testing
- **User Roles:** Admin, Viewer, Invalid User
- **Tags:** @smoke (TC01), @regression (all), @login (all), @negative (TC03)
- **Test Data:** `test-data/login.json` with validUsers and invalidUser structure
- **Status:** ✅ All Active

### [dashboard.spec.md](./dashboard.spec.md)
Documents the dashboard account management test suite:
- **Version:** 1.3.0
- **Test Cases:** 3 (TC01-TC03)
- **Coverage:** Creating Savings, Checking, and Credit Card accounts with balance verification
- **User Roles:** Admin
- **Tags:** @smoke (TC01), @regression (all), @dashboard (all)
- **Test Data:** `test-data/dashboard.json` with accounts array
- **Features:** Data-driven testing (TC02, TC03), random number generation, row-level validation
- **Status:** ✅ All Active

### [transactions.spec.md](./transactions.spec.md)
Documents the transactions functionality test suite:
- **Version:** 1.0.0
- **Test Cases:** 4 (TC01-TC04, with TC04 skipped)
- **Coverage:** Deposit and Withdrawal transactions with row-level validation
- **User Roles:** Admin
- **Tags:** @smoke (TC01), @regression (all), @transactions (all), @negative (TC04)
- **Test Data:** `test-data/transactions.json` with transactions and negativeTests structure
- **Features:** Transaction creation (Deposit, Withdrawal, Transfer), column-based cell verification, email notification toggle
- **Status:** ✅ 3 Active, ⚠️ 1 Skipped (TC04 pending error validation)

---

## 📝 Documentation Maintenance Guide

### When to Update Documentation

**⚠️ IMPORTANT:** Update the corresponding `.md` file whenever you:

1. **Add a new test case**
   - Add test case details in the Test Cases section
   - Include appropriate tags (@smoke, @regression, @feature, @negative)
   - Update test coverage tables
   - Add test data structure from JSON file
   - Update maintenance log with version bump
   - Update "Last Updated" date

2. **Modify an existing test case**
   - Update test steps and expected results
   - Update tags if test categorization changes
   - Update test data tables if JSON structure changes
   - Add notes about the changes
   - Update maintenance log

3. **Remove a test case**
   - Remove from Test Cases section
   - Update coverage tables
   - Document reason in maintenance log
   - Mark as deprecated if needed

4. **Change test data structure**
   - Update Test Data Management section
   - Update JSON file structure examples
   - Update individual test case data tables
   - Document data source changes
   - Update validUsers, accounts, or transactions structures

5. **Update page objects or helpers**
   - Update Test Architecture section
   - Update method references
   - Note any breaking changes
   - Update inline comment examples

6. **Add or modify tags**
   - Update tag lists (@smoke, @regression, @feature)
   - Update test case tables with new tags
   - Document tag usage patterns
   - Update running instructions with new tag examples

7. **Change inline comment style**
   - Update code examples in documentation
   - Ensure consistency across all test files
   - Document the comment positioning pattern

### How to Update Documentation

#### Step 1: Identify Changes
```bash
# Review your code changes
git diff tests/UI/login.spec.ts
git diff test-data/login.json
git diff pages/loginPage.ts
```

#### Step 2: Update Markdown File
Open the corresponding `.md` file and update relevant sections:
- Test case details with tags
- Test data tables (show JSON structure)
- Coverage tables
- Tag-based execution examples
- Inline comment examples
- Maintenance log

#### Step 3: Version Control
Update version numbers following semantic versioning:
- **Major (X.0.0):** Breaking changes, complete restructure, major tag changes
- **Minor (0.X.0):** New test cases added, significant features, new tags
- **Patch (0.0.X):** Bug fixes, minor updates, clarifications, comment updates

#### Step 4: Update Test Data Documentation
When JSON files change, update:
```markdown
### Test Data Structure
\`\`\`json
{
  "validUsers": {
    "admin": { "username": "admin", "password": "admin123", ... }
  },
  "invalidUser": { ... }
}
\`\`\`
```

#### Step 5: Commit Documentation with Code
```bash
# Commit test code, test data, and documentation together
git add tests/UI/dashboard.spec.ts test-data/dashboard.json tests/UI/dashboard.spec.md
git commit -m "feat: Add new account deletion test case (TC04) with @regression tag"
```

### Documentation for Tags

When documenting tests with tags, include:
- **Tag Definition:** What the tag represents (@smoke, @regression, @feature, @negative)
- **Execution Examples:** How to run tests with that tag
- **Tag Count:** How many tests have each tag

**Example:**
```markdown
**Tags:** @smoke @regression @dashboard

### Running Tagged Tests
\`\`\`bash
npm run smoke         # Run all @smoke tests
npm run regression    # Run all @regression tests
npx playwright test --grep @dashboard  # Run all @dashboard tests
\`\`\`
```

### Documentation for Inline Comments

Document the inline comment pattern:
```typescript
const loginPage = new LoginPage(page);                // Initialize LoginPage
await loginPage.login(username, password);            // Login with credentials
```

**Benefits:**
- Keeps code concise
- Comments aligned on the right
- Easy to read and understand
- Consistent across all test files
git add tests/dashboard.spec.ts tests/dashboard.spec.md
git commit -m "feat: Add new account deletion test case (TC04)"
```

---

## 📊 Test Data Management Best Practices

### Centralized JSON Files
All test data is stored in JSON files for easy maintenance:
- `test-data/login.json` - Login credentials and user data
- `test-data/dashboard.json` - Dashboard account test data
- `test-data/transactions.json` - Transaction test data

### JSON Structure Guidelines
1. **Use descriptive keys:** `validUsers`, `invalidUser`, `accounts`, `transactions`, `negativeTests`
2. **Group related data:** Separate positive and negative test data
3. **Include metadata:** testId, description, expected values
4. **Maintain consistency:** Same structure across similar test data

### Example Test Data Documentation
```markdown
### Test Data Structure

**File:** `test-data/login.json`

\`\`\`json
{
  "validUsers": {
    "admin": {
      "username": "admin",
      "password": "admin123",
      "accessLevel": "Full access",
      "expectedTitle": "SecureBank"
    }
  },
  "invalidUser": {
    "username": "invaliduser",
    "password": "invalidpassword",
    "expectedErrorMessage": "⚠️ Invalid username or password. Please try again."
  }
}
\`\`\`
```

### Random Data Generation
Document when tests use random data generation:
```markdown
**Random Data:** Account names use 4-digit random numbers (1000-9999) to ensure uniqueness.

**Example:** "My Savings Account-8273"

**Implementation:**
\`\`\`typescript
const generateRandomNumber = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};
\`\`\`
```

---

## 🏷️ Tag-Based Test Organization

### Available Tags
Document all tags used in the test suite:

| Tag | Purpose | Count | Example Usage |
|-----|---------|-------|---------------|
| @smoke | Critical path tests - fast validation | 3 | `npm run smoke` |
| @regression | Full test suite - comprehensive coverage | 10 | `npm run regression` |
| @login | Login functionality tests | 3 | `npx playwright test --grep @login` |
| @dashboard | Dashboard functionality tests | 3 | `npx playwright test --grep @dashboard` |
| @transactions | Transaction functionality tests | 4 | `npx playwright test --grep @transactions` |
| @negative | Negative/error scenario tests | 2 | `npx playwright test --grep @negative` |

### Tag Usage in Test Cases
When documenting test cases, always include tags:
```markdown
### TC01 - Admin Login
**Tags:** @smoke @regression @login
**Priority:** High (Critical Path)
```

### Running Tests by Tags
Include execution examples in documentation:
```bash
# Run smoke tests (critical path - 3 tests)
npm run smoke
npm run smoke:headed

# Run regression tests (full suite - 10 tests)
npm run regression
npm run regression:headed

# Run specific feature tests
npx playwright test --grep @login
npx playwright test --grep @negative
```

---

## 🎯 Documentation Template Structure

Each test suite documentation follows this enhanced structure:

```markdown
# [Test Suite Name] Documentation

**Version:** X.Y.Z
**Last Updated:** [Date]
**Test File:** `tests/[suite-name].spec.ts`
**Page Object:** `pages/[pageName].ts`
**Test Data:** `test-data/[data-file].json`

## 📋 Overview
[Brief description of what this test suite covers]

## 🤖 AI-Driven QA Engineering
[How AI assists with this test suite]

## 🧪 Test Cases
   ### TC01 - [Test Case Name]
   - **Tags:** @smoke @regression @feature
   - **Description:** [What this test does]
   - **Test Priority:** High/Medium/Low
   - **Prerequisites:** [What needs to be set up]
   - **Test Data:**
     ```json
     {
       "testId": "TC01",
       "username": "admin",
       ...
     }
     ```
   - **Test Steps:**
     1. Step 1
     2. Step 2
   - **Expected Results:** [What should happen]
   - **Actual Results:** ✅ Pass / ❌ Fail
   - **Notes:** [Additional information]

## 📊 Test Data Management
[JSON file structure and data organization]

## 🏗️ Test Architecture
[Page objects, helper methods, inline comments]

## 🏷️ Tags & Execution
[Tag definitions and running instructions]

## 🔄 Test Execution
[How to run tests, commands, examples]

## 📈 Test Coverage
[Coverage tables, percentages, gaps]

## 🐛 Known Issues
[Current limitations or bugs]

## 🔮 Future Enhancements
[Planned improvements]

## 📝 Maintenance Log
| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | [Date] | Initial version | [Author] |

## 📞 Contact & Support
[How to get help]
```

---

## 🔄 AI-Assisted Documentation Updates

### Using LLM for Documentation Maintenance

When adding or modifying test cases, you can leverage AI assistance:

**Example Prompt:**
```
I've added a new test case TC04 to dashboard.spec.ts that tests account deletion.
The test:
1. Logs in as admin
2. Creates a savings account
3. Deletes the account
4. Verifies the account is removed from the dashboard

Please update dashboard.spec.md with this new test case following the existing format.
```

**AI Will:**
- Add the test case to the Test Cases section
- Update coverage tables
- Suggest related test cases
- Update the maintenance log
- Maintain consistent formatting

---

## 📊 Documentation Health Checklist

Before committing changes, verify:

### Content Accuracy
- [ ] Test case numbers are sequential and match test file
- [ ] All test data tables reflect current JSON structure
- [ ] Expected results match actual implementation
- [ ] Tags are correctly applied (@smoke, @regression, @feature, @negative)
- [ ] Coverage tables reflect current test count (10 tests total)
- [ ] Maintenance log is updated with new version
- [ ] "Last Updated" date is current

### Code Examples
- [ ] JSON examples match actual test data files
- [ ] Inline comment examples follow right-side positioning pattern
- [ ] Code snippets are syntactically correct
- [ ] TypeScript examples compile without errors

### Cross-References
- [ ] Links to test files are valid (login.spec.ts, dashboard.spec.ts, transactions.spec.ts)
- [ ] Links to page objects are valid (loginPage.ts, dashboardPage.ts, transactionsPage.ts)
- [ ] Links to test data files are valid (login.json, dashboard.json, transactions.json)
- [ ] References to other documentation files work

### Tag Documentation
- [ ] All tags are documented with counts
- [ ] Tag execution examples are correct (npm run smoke, npm run regression)
- [ ] Tag distribution is up-to-date (3 smoke, 10 regression)
- [ ] Feature-specific tag examples are included

### Test Data Documentation
- [ ] JSON structure examples are complete
- [ ] validUsers, accounts, transactions structures are documented
- [ ] Negative test data (invalidUser, negativeTests) is documented
- [ ] Random data generation is explained

### Formatting & Style
- [ ] Markdown formatting is consistent
- [ ] Tables are properly formatted
- [ ] Code blocks have proper syntax highlighting
- [ ] Headings follow hierarchy (##, ###, ####)
- [ ] Lists are properly indented
- [ ] Emojis are used consistently

---

## 🔄 Quick Update Commands

### Check Current Test Count
```bash
npx playwright test --list
```

### Check Test Tags
```bash
npx playwright test --list --grep @smoke
npx playwright test --list --grep @regression
npx playwright test --list --grep @login
npx playwright test --list --grep @dashboard
npx playwright test --list --grep @transactions
npx playwright test --list --grep @negative
```

### Verify Test Data Files
```bash
cat test-data/login.json
cat test-data/dashboard.json
cat test-data/transactions.json
```

### Check Recent Changes
```bash
git diff tests/
git diff test-data/
git diff pages/
```

---

## 🎓 Documentation Best Practices

### 1. Keep It Current
Documentation is only valuable if it's up-to-date. Make updating documentation part of your definition of done.

### 2. Be Descriptive
Include enough detail that someone unfamiliar with the test can understand:
- What is being tested
- Why it's being tested
- How to execute the test
- What to expect
- What tags apply

### 3. Include Examples
Real examples help readers understand:
- Test data samples from JSON files
- Expected output formats
- Command line examples with tags
- Inline comment patterns

### 4. Document Known Issues
If a test is skipped or has limitations:
- Explain why (e.g., TC04 transactions - awaiting error validation)
- Document workarounds
- Reference related issues or tickets
- Set expected resolution timeline

### 5. Update Test Data References
When JSON structure changes:
- Update all examples in documentation
- Show before/after structure
- Document migration path
- Update all test cases that use that data

### 6. Maintain Tag Consistency
- Use standard tags (@smoke, @regression, @feature, @negative)
- Document when new tags are introduced
- Keep tag counts accurate
- Update CI/CD pipeline documentation when tags change

---

## 🤖 AI-Assisted Documentation Workflow

### Step 1: Code Changes
Make your test changes (add TC, modify data, update tags)

### Step 2: Generate Update Prompt
```
I've made the following changes to [test-suite].spec.ts:
- Added TC05 with @smoke and @regression tags
- Updated test data in [data-file].json with new structure
- Modified page object to include new validation method
- Added inline comments following right-side pattern

Please update [test-suite].spec.md following these changes.
Include:
- New test case documentation with tags
- Updated test data structure
- Updated page object methods
- Updated tag counts (now 4 @smoke tests)
- Version bump to X.Y.Z
- Maintenance log entry
```

### Step 3: AI Response Review
AI will provide:
- Updated markdown content
- Proper formatting
- Consistent style
- Updated tables and counts

### Step 4: Manual Verification
- Verify all technical details are accurate
- Check command examples work
- Test all links
- Confirm tag counts
- Validate JSON structure examples

### Step 5: Commit Together
```bash
git add tests/[test-suite].spec.ts tests/[test-suite].spec.md test-data/[data-file].json
git commit -m "feat: Add TC05 with smoke test tag and updated test data structure"
```

---

## 📚 Additional Resources

### Framework Documentation
- [README.md](../README.md) - Main project documentation
- [package.json](../package.json) - NPM scripts with tag-based execution

### Test Suites
- [login.spec.ts](./login.spec.ts) - Login test implementation
- [dashboard.spec.ts](./dashboard.spec.ts) - Dashboard test implementation
- [transactions.spec.ts](./transactions.spec.ts) - Transactions test implementation

### Page Objects
- [loginPage.ts](../pages/loginPage.ts) - Login page object
- [dashboardPage.ts](../pages/dashboardPage.ts) - Dashboard page object
- [transactionsPage.ts](../pages/transactionsPage.ts) - Transactions page object

### Test Data
- [login.json](../test-data/login.json) - Login test data
- [dashboard.json](../test-data/dashboard.json) - Dashboard test data
- [transactions.json](../test-data/transactions.json) - Transactions test data

---

**Remember:** Good documentation is a living artifact. Keep it updated, accurate, and helpful! 📝✨
If a test has known quirks or limitations, document them to save debugging time.

### 5. Link Related Content
Cross-reference related documentation, page objects, and test data files.

### 6. Maintain History
The maintenance log provides valuable context about test evolution.

---

## 🔗 Quick Links

### Test Files
- [login.spec.ts](./login.spec.ts)
- [dashboard.spec.ts](./dashboard.spec.ts)

### Page Objects
- [loginPage.ts](../pages/loginPage.ts)
- [dashboardPage.ts](../pages/dashboardPage.ts)

### Test Data
- [login.json](../test-data/login.json)

### Configuration
- [playwright.config.ts](../playwright.config.ts)
- [environmentManager.ts](../config/environmentManager.ts)

---

## 📞 Support

### For Documentation Questions
- Review this README
- Check existing documentation examples
- Consult with QA team lead

### For AI Assistance
- Use LLM prompts for documentation generation
- Request AI review for consistency
- Get AI suggestions for test improvements

---

## 🚀 Future Plans

### Planned Documentation Enhancements
- [ ] Add API test documentation
- [ ] Create visual test documentation with screenshots
- [ ] Add performance test benchmarks
- [ ] Generate test execution reports automatically
- [ ] Create test data dictionary
- [ ] Add troubleshooting guides

### Automation Ideas
- [ ] Auto-generate documentation stubs for new test files
- [ ] Validate documentation against actual test code
- [ ] Generate coverage reports automatically
- [ ] Create documentation diff reports in PRs

---

**Last Updated:** May 7, 2026  
**Document Version:** 1.0.0  
**Maintained By:** AI QA Engineering Team
