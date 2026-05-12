# Test Runner

This folder contains the Natural Language Test Runner for Playwright tests.

## 📁 Files

| File | Purpose |
|------|---------|
| **testRunner.ts** | Core TypeScript test runner that parses natural language commands |
| **run.ps1** | PowerShell wrapper script for convenient command execution |
| **run.bat** | Windows Batch wrapper script for CMD usage |
| **setup-powershell.ps1** | One-time setup script to enable direct commands in PowerShell |

---

## 🚀 Quick Start

### Option 1: Using PowerShell Wrapper (Recommended)
```powershell
.\test-runner\run.ps1 smoke tests from login spec
```

### Option 2: Using Batch File (CMD)
```cmd
test-runner\run.bat smoke tests from login spec
```

### Option 3: Direct Execution
```powershell
npx ts-node test-runner/testRunner.ts "run smoke tests from login spec"
```

### Option 4: NPM Scripts
```powershell
npm run run -- "run smoke tests from login spec"
```

---

## ⚙️ Setup for Direct Commands (Optional)

Run the setup script once to enable direct commands without the script prefix:

```powershell
.\test-runner\setup-powershell.ps1
```

Then reload your PowerShell profile:
```powershell
. $PROFILE
```

After setup, you can run commands directly:
```powershell
run smoke tests from login spec
```

---

## 📚 Documentation

For complete documentation, see the [docs](../docs/) folder:

- **[HOW_TO_RUN_TESTS.md](../docs/HOW_TO_RUN_TESTS.md)** - Complete testing guide
- **[NATURAL_LANGUAGE_TEST_RUNNER.md](../docs/NATURAL_LANGUAGE_TEST_RUNNER.md)** - Runner features and usage
- **[DIRECT_COMMANDS_GUIDE.md](../docs/DIRECT_COMMANDS_GUIDE.md)** - Direct command setup
- **[QUICK_REFERENCE.md](../docs/QUICK_REFERENCE.md)** - Command cheat sheet

---

## 🎯 Command Examples

```powershell
# Basic smoke tests
.\test-runner\run.ps1 smoke tests from login spec

# Regression tests with headed mode
.\test-runner\run.ps1 regression tests from dashboard spec in headed mode

# Mobile tests
.\test-runner\run.ps1 mobile tests

# Multiple tags
.\test-runner\run.ps1 smoke and regression tests

# Debug mode
.\test-runner\run.ps1 smoke tests in debug mode

# Specific browser
.\test-runner\run.ps1 smoke tests with firefox
```

---

## 🔧 Technical Details

### How It Works

1. **User runs command**: `.\test-runner\run.ps1 smoke tests from login spec`
2. **Wrapper adds prefix**: Converts to `run smoke tests from login spec`
3. **Executes TypeScript runner**: `npx ts-node test-runner/testRunner.ts`
4. **Parser processes command**: Extracts tags, spec files, modes, browsers
5. **Builds Playwright command**: `npx playwright test --grep="@smoke" tests/UI/login.spec.ts`
6. **Runs tests**: Executes Playwright with parsed arguments

### Dependencies

- **ts-node**: Executes TypeScript directly without compilation
- **TypeScript**: Provides type safety
- **Playwright**: Test execution engine

---

## 🛠️ Maintenance

### Updating the Runner

Edit `testRunner.ts` to modify parsing logic or add new features.

### Updating Wrapper Scripts

Edit `run.ps1` or `run.bat` to change wrapper behavior.

### Updating Profile Setup

Edit `setup-powershell.ps1` to modify the PowerShell profile function.

---

## 📦 Integration

The test runner is integrated with package.json scripts:

```json
{
  "scripts": {
    "run": "ts-node test-runner/testRunner.ts",
    "run:smoke-from-login": "ts-node test-runner/testRunner.ts \"run smoke tests from login spec\"",
    "run:smoke-from-dashboard": "ts-node test-runner/testRunner.ts \"run smoke tests from dashboard spec\"",
    "help": "ts-node test-runner/testRunner.ts --help"
  }
}
```

---

*For more information, see the [main README](../README.md) and [documentation](../docs/).*
