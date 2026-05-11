# Documentation

This folder contains comprehensive documentation for the E2E Playwright TypeScript Framework.

## 📚 Documentation Files

### Test Execution & Runner

| Document | Description |
|----------|-------------|
| **[HOW_TO_RUN_TESTS.md](HOW_TO_RUN_TESTS.md)** | Complete guide to running tests using all available methods |
| **[NATURAL_LANGUAGE_TEST_RUNNER.md](NATURAL_LANGUAGE_TEST_RUNNER.md)** | Natural language test runner features, syntax, and examples |
| **[DIRECT_COMMANDS_GUIDE.md](DIRECT_COMMANDS_GUIDE.md)** | Setup and usage guide for direct command execution |
| **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** | Cheat sheet for common test commands and patterns |

### CI/CD & Automation

| Document | Description |
|----------|-------------|
| **[GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md)** | Complete GitHub Actions CI/CD setup and configuration guide |
| **[GITHUB_ACTIONS_TROUBLESHOOTING.md](GITHUB_ACTIONS_TROUBLESHOOTING.md)** | GitHub Actions issues, fixes, and troubleshooting guide |

### Framework Features & Implementation

| Document | Description |
|----------|-------------|
| **[FIXTURES_GUIDE.md](FIXTURES_GUIDE.md)** | Comprehensive guide to Playwright fixtures in this framework |
| **[FIXTURES_IMPLEMENTATION_SUMMARY.md](FIXTURES_IMPLEMENTATION_SUMMARY.md)** | Summary of fixtures implementation and usage patterns |
| **[TYPESCRIPT_IMPLEMENTATION.md](TYPESCRIPT_IMPLEMENTATION.md)** | Technical details of TypeScript test runner implementation |

### Troubleshooting & Issues

| Document | Description |
|----------|-------------|
| **[ISSUE_FIXED.md](ISSUE_FIXED.md)** | Documentation of resolved issues and their solutions |

---

## 🚀 Quick Links

### Getting Started
1. Start with [HOW_TO_RUN_TESTS.md](HOW_TO_RUN_TESTS.md) for running tests
2. Review [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for command examples
3. Check [NATURAL_LANGUAGE_TEST_RUNNER.md](NATURAL_LANGUAGE_TEST_RUNNER.md) for advanced features

### Learning Fixtures
1. Read [FIXTURES_GUIDE.md](FIXTURES_GUIDE.md) for complete fixtures documentation
2. Review [FIXTURES_IMPLEMENTATION_SUMMARY.md](FIXTURES_IMPLEMENTATION_SUMMARY.md) for quick overview
3. See `fixtures/baseFixtures.ts` for implementation

### Advanced Setup
1. Follow [DIRECT_COMMANDS_GUIDE.md](DIRECT_COMMANDS_GUIDE.md) for PowerShell setup
2. Review [TYPESCRIPT_IMPLEMENTATION.md](TYPESCRIPT_IMPLEMENTATION.md) for technical details

---

## 📖 Documentation by Topic

### Testing Workflow

**Basic Testing**
```powershell
# Using wrapper script (recommended)
.\test-runner\run.ps1 smoke tests from login spec

# Using NPM scripts
npm run smoke

# Using Playwright directly
npx playwright test --grep @smoke
```

**Advanced Testing**
```powershell
# Natural language with modes
.\test-runner\run.ps1 smoke tests in headed mode

# Multiple tags
.\test-runner\run.ps1 smoke and regression tests

# Specific browser
.\test-runner\run.ps1 smoke tests with firefox
```

See: [HOW_TO_RUN_TESTS.md](HOW_TO_RUN_TESTS.md), [NATURAL_LANGUAGE_TEST_RUNNER.md](NATURAL_LANGUAGE_TEST_RUNNER.md)

---

### Fixtures System

**Using Fixtures**
```typescript
import { test } from '../fixtures/baseFixtures';

test('Test with fixtures', async ({ loginWithAdmin, dashboardPage }) => {
  // loginWithAdmin automatically logs in
  // dashboardPage is ready to use
  await dashboardPage.clickAddAccount();
});
```

See: [FIXTURES_GUIDE.md](FIXTURES_GUIDE.md), [FIXTURES_IMPLEMENTATION_SUMMARY.md](FIXTURES_IMPLEMENTATION_SUMMARY.md)

---

### Natural Language Runner

**Supported Syntax**
```powershell
# Tags
smoke tests
regression tests
mobile tests
smoke and regression tests

# Spec files
smoke tests from login spec
tests from dashboard spec

# Modes
smoke tests in headed mode
regression tests in debug mode

# Browsers
smoke tests with firefox
tests with webkit
```

See: [NATURAL_LANGUAGE_TEST_RUNNER.md](NATURAL_LANGUAGE_TEST_RUNNER.md), [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

---

### Direct Commands Setup

**One-Time Setup**
```powershell
# Run setup script
.\test-runner\setup-powershell.ps1

# Reload profile
. $PROFILE

# Use direct commands (no prefix needed)
run smoke tests from login spec
```

See: [DIRECT_COMMANDS_GUIDE.md](DIRECT_COMMANDS_GUIDE.md)

---

## 🔍 Search by Use Case

| I want to... | See Document |
|-------------|--------------|
| Run tests quickly | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |
| Understand all test execution methods | [HOW_TO_RUN_TESTS.md](HOW_TO_RUN_TESTS.md) |
| Use natural language commands | [NATURAL_LANGUAGE_TEST_RUNNER.md](NATURAL_LANGUAGE_TEST_RUNNER.md) |
| Set up direct commands | [DIRECT_COMMANDS_GUIDE.md](DIRECT_COMMANDS_GUIDE.md) |
| Learn about fixtures | [FIXTURES_GUIDE.md](FIXTURES_GUIDE.md) |
| Understand framework architecture | [TYPESCRIPT_IMPLEMENTATION.md](TYPESCRIPT_IMPLEMENTATION.md) |
| Troubleshoot issues | [ISSUE_FIXED.md](ISSUE_FIXED.md) |

---

## 🎯 Document Status

| Document | Status | Last Updated |
|----------|--------|--------------|
| HOW_TO_RUN_TESTS.md | ✅ Current | 2026-05-11 |
| NATURAL_LANGUAGE_TEST_RUNNER.md | ✅ Current | 2026-05-11 |
| DIRECT_COMMANDS_GUIDE.md | ✅ Current | 2026-05-11 |
| QUICK_REFERENCE.md | ✅ Current | 2026-05-11 |
| FIXTURES_GUIDE.md | ✅ Current | 2026-05-11 |
| FIXTURES_IMPLEMENTATION_SUMMARY.md | ✅ Current | 2026-05-11 |
| TYPESCRIPT_IMPLEMENTATION.md | ✅ Current | 2026-05-11 |
| ISSUE_FIXED.md | ✅ Current | 2026-05-11 |

---

## 📝 Contributing to Documentation

When adding new features or making changes:

1. Update relevant documentation files
2. Add examples and usage patterns
3. Update the main [README.md](../README.md)
4. Keep this index up to date

---

*For framework overview, see the [main README](../README.md).*
*For test runner details, see [test-runner folder](../test-runner/).*
