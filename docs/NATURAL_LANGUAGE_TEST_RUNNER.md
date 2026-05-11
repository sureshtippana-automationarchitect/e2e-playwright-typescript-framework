# 🎭 Natural Language Test Runner Guide

## Overview

This framework supports running Playwright tests using **plain English commands**! Instead of remembering complex CLI commands, you can simply tell the framework what tests you want to run in natural language.

---

## 🚀 Quick Start

### Windows PowerShell (Recommended)

```powershell
# Simple and clean - no quotes needed!
.\run.ps1 smoke tests from login spec
.\run.ps1 smoke and mobile tests in headed mode
.\run.ps1 regression tests from dashboard spec
```

### Windows Command Prompt

```cmd
run.bat smoke tests from login spec
run.bat mobile tests in headed mode
```

### Cross-Platform (Node.js)

```bash
node testRunner.js "run smoke tests from login spec"
```

### NPM Scripts (Predefined)

```bash
npm run run:smoke-from-login
```

---

## ⚠️ Common Mistakes

### ❌ Wrong: Running command directly in PowerShell
```powershell
run smoke tests from login spec
# Error: The term 'run' is not recognized
```

### ✅ Correct: Use the PowerShell script
```powershell
.\run.ps1 smoke tests from login spec
```

### ❌ Wrong: Missing quotes with node command
```bash
node testRunner.js run smoke tests from login spec
```

### ✅ Correct: Use quotes with node
```bash
node testRunner.js "run smoke tests from login spec"
```

### ❌ Wrong: Incorrect NPM script syntax
```bash
npm run smoke tests from login spec
```

### ✅ Correct: Use predefined NPM scripts
```bash
npm run run:smoke-from-login
```

---

## 📖 Command Syntax

The test runner understands natural English! Just describe what you want:

### Basic Pattern:
```
"run [TAGS] tests from [SPEC] spec in [MODE] mode"
```

You can mix and match any combination of:
- **Tags**: smoke, regression, mobile, negative
- **Specs**: login, dashboard, transactions
- **Modes**: headed, headless, debug, ui
- **Browsers**: chromium, firefox, webkit/safari

---

## 🎯 Usage Examples

### 1️⃣ By Tags Only

```bash
# Run all smoke tests
node testRunner.js "run smoke tests"

# Run all regression tests
node testRunner.js "run regression tests"

# Run mobile tests across all specs
node testRunner.js "run mobile tests"

# Run negative tests
node testRunner.js "run negative tests"

# Combine multiple tags
node testRunner.js "run smoke and regression tests"
```

**NPM Equivalents:**
```bash
npm run smoke              # Smoke tests headless
npm run regression         # Regression tests headless
```

---

### 2️⃣ By Spec Files

```bash
# Run all tests from a specific spec file
node testRunner.js "run tests from login spec"
node testRunner.js "run tests from dashboard spec"
node testRunner.js "run tests from transactions spec"
```

**NPM Equivalents:**
```bash
npm run login              # All login tests
npm run dashboard          # All dashboard tests
npm run transactions       # All transaction tests
```

---

### 3️⃣ Combining Tags + Specs (Most Common)

```bash
# Run smoke tests from login spec only
node testRunner.js "run smoke tests from login spec"

# Run regression and smoke tests from dashboard spec
node testRunner.js "run regression and smoke tests from dashboard spec"

# Run mobile tests from transactions spec
node testRunner.js "run mobile tests from transactions spec"

# Run negative tests from login spec
node testRunner.js "run negative tests from login spec"
```

**NPM Equivalents:**
```bash
npm run run:smoke-from-login
npm run run:smoke-from-dashboard
npm run run:regression-and-smoke-from-dashboard
```

---

### 4️⃣ With Display Modes

```bash
# Run tests with browser visible (headed mode)
node testRunner.js "run smoke tests in headed mode"
node testRunner.js "run smoke tests from login spec in headed mode"

# Run tests with Playwright Inspector (debug mode)
node testRunner.js "run login tests in debug mode"
node testRunner.js "run smoke tests from dashboard spec in debug mode"

# Run tests with Playwright UI mode
node testRunner.js "run all tests in ui mode"
```

**NPM Equivalents:**
```bash
npm run smoke:headed       # Smoke tests with browser visible
npm run login:headed       # Login tests with browser visible
npm run login:debug        # Login tests in debug mode
```

---

### 5️⃣ With Specific Browsers

```bash
# Run tests in Firefox
node testRunner.js "run smoke tests in firefox"
node testRunner.js "run regression tests from dashboard spec in firefox"

# Run tests in WebKit (Safari)
node testRunner.js "run smoke tests in webkit"
node testRunner.js "run mobile tests in safari"
```

---

### 6️⃣ Advanced Combinations

```bash
# Multiple tags + specific spec + headed mode
node testRunner.js "run smoke and mobile tests from login spec in headed mode"

# Regression tests + specific browser + debug mode
node testRunner.js "run regression tests from dashboard spec in firefox debug mode"

# All combinations work naturally
node testRunner.js "run mobile and smoke tests from all specs in headed mode"
```

---

## 📋 Available Options

### 🏷️ Tags
- `@smoke` - Critical path tests (fast, core functionality)
- `@regression` - Full test suite (comprehensive coverage)
- `@mobile` - Mobile viewport tests (iPhone 14 Pro Max)
- `@login` - Login-related tests
- `@dashboard` - Dashboard-related tests
- `@transactions` - Transaction-related tests
- `@negative` - Negative/error scenario tests

### 📁 Spec Files
- `login` → `tests/login.spec.ts`
- `dashboard` → `tests/Dashboard.spec.ts`
- `transactions` → `tests/transactions.spec.ts`

### 🎬 Display Modes
- `headless` - Default, no browser UI (fastest)
- `headed` - Browser visible (debugging)
- `debug` - Step-by-step with Playwright Inspector
- `ui` - Playwright UI mode (interactive)

### 🌐 Browsers
- `chromium` - Default (Google Chrome)
- `firefox` - Mozilla Firefox
- `webkit` or `safari` - Safari browser engine

---

## 🎨 NPM Script Examples

All NPM scripts now have clear, descriptive names:

```bash
# Predefined natural language scripts
npm run run:smoke-from-login                    # Smoke tests from login spec
npm run run:smoke-from-dashboard               # Smoke tests from dashboard spec
npm run run:smoke-from-transactions            # Smoke tests from transactions spec
npm run run:regression-and-smoke-from-dashboard # Both tags from dashboard spec
npm run run:mobile-tests                       # All mobile tests
npm run run:smoke-headed                       # Smoke tests in headed mode
npm run run:all-tests-debug                    # All tests in debug mode

# Custom command with npm run
npm run run "run smoke tests from login spec in headed mode"

# Show all available commands
npm run help
```

---

## 🔍 How It Works

### Command Parsing Flow

```
User Input (Plain English)
         ↓
  Parser Identifies:
    • Tags (@smoke, @regression, etc.)
    • Spec files (login, dashboard, etc.)
    • Display mode (headed, debug, ui)
    • Browser (chromium, firefox, webkit)
         ↓
  Builds Playwright CLI Command
         ↓
  Executes: npx playwright test [args]
         ↓
  Shows Results with Colors
```

### Example Breakdown

Input:
```bash
"run smoke and mobile tests from dashboard spec in headed mode"
```

Parser identifies:
- ✅ Tags: `@smoke`, `@mobile`
- ✅ Spec: `tests/Dashboard.spec.ts`
- ✅ Mode: `headed`
- ✅ Browser: `chromium` (default)

Final command:
```bash
npx playwright test --grep "@smoke|@mobile" --headed tests/Dashboard.spec.ts
```

---

## 🎯 Real-World Scenarios

### Scenario 1: Quick Smoke Check
**Need**: Run smoke tests before deployment

```bash
node testRunner.js "run smoke tests"
# or
npm run smoke
```

---

### Scenario 2: Debug Login Issue
**Need**: Debug failing login test with browser visible

```bash
node testRunner.js "run tests from login spec in debug mode"
# or
npm run login:debug
```

---

### Scenario 3: Test Mobile Functionality
**Need**: Run all mobile viewport tests

```bash
node testRunner.js "run mobile tests in headed mode"
# or
npm run run:mobile-tests
```

---

### Scenario 4: Full Dashboard Regression
**Need**: Run all dashboard tests with smoke and regression tags

```bash
node testRunner.js "run regression and smoke tests from dashboard spec"
# or
npm run run:regression-and-smoke-from-dashboard
```

---

### Scenario 5: Cross-Browser Testing
**Need**: Test smoke tests in Firefox

```bash
node testRunner.js "run smoke tests in firefox headed mode"
```

---

## 🆘 Getting Help

```bash
# Show help documentation
node testRunner.js --help
# or
npm run help
```

---

## 💡 Pro Tips

### 1. **Use Headed Mode for Debugging**
```bash
node testRunner.js "run smoke tests from login spec in headed mode"
```
Helps visualize what's happening during test failures.

### 2. **Use Debug Mode for Step-by-Step**
```bash
node testRunner.js "run login tests in debug mode"
```
Opens Playwright Inspector for line-by-line debugging.

### 3. **Combine Multiple Tags**
```bash
node testRunner.js "run smoke and regression tests"
```
Runs tests with EITHER tag (OR logic).

### 4. **Test Specific Flows**
```bash
node testRunner.js "run mobile tests from dashboard spec in headed mode"
```
Test mobile responsiveness with visual feedback.

### 5. **Quick Tag-Only Runs**
```bash
node testRunner.js "run smoke tests"
```
Fastest way to validate core functionality across all specs.

---

## 📊 Command Comparison

| Task | Traditional CLI | Natural Language |
|------|----------------|------------------|
| Smoke tests | `npx playwright test --grep @smoke` | `node testRunner.js "run smoke tests"` |
| Login spec only | `npx playwright test tests/login.spec.ts` | `node testRunner.js "run tests from login spec"` |
| Smoke + Login | `npx playwright test --grep @smoke tests/login.spec.ts` | `node testRunner.js "run smoke tests from login spec"` |
| Debug mode | `npx playwright test --debug tests/login.spec.ts` | `node testRunner.js "run login tests in debug mode"` |
| Headed Firefox | `npx playwright test --headed --project=firefox --grep @smoke` | `node testRunner.js "run smoke tests in firefox headed mode"` |

---

## 🎓 Learning Path

### Beginner (Week 1)
```bash
# Start with simple commands
node testRunner.js "run smoke tests"
node testRunner.js "run tests from login spec"
node testRunner.js "run smoke tests in headed mode"
```

### Intermediate (Week 2)
```bash
# Combine tags and specs
node testRunner.js "run smoke tests from login spec"
node testRunner.js "run regression tests from dashboard spec in headed mode"
```

### Advanced (Week 3+)
```bash
# Master complex combinations
node testRunner.js "run smoke and mobile tests from all specs in firefox headed mode"
node testRunner.js "run regression tests from dashboard spec in debug mode"
```

---

## 🔧 Customization

To add more natural language patterns, edit `testRunner.js`:

1. **Add new tags** - Update tag detection logic
2. **Add new keywords** - Extend parsing rules
3. **Add new modes** - Add mode detection
4. **Add new browsers** - Extend browser parsing

Example:
```javascript
// Add support for "staging" environment
if (command.includes('staging') || command.includes('uat')) {
    playwrightArgs.push('--env=uat');
}
```

---

## 🎉 Benefits

✅ **Easy to remember** - No need to memorize complex CLI flags  
✅ **Self-documenting** - Commands read like English  
✅ **Flexible** - Mix and match any combination  
✅ **Beginner-friendly** - Lower learning curve  
✅ **Team collaboration** - Share commands easily in Slack/Teams  
✅ **Powerful** - Full Playwright capabilities behind simple commands  

---

## 📞 Support

Need help? Try these:
```bash
# Show help
npm run help

# See all available npm scripts
npm run

# Check Playwright version
npx playwright --version
```

---

**Happy Testing! 🎭✨**
