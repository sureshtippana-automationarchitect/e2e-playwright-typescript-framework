# 🎯 Natural Language Test Runner - Quick Reference

## 4 Ways to Run Tests

### 1️⃣ PowerShell Script (Easiest on Windows)
```powershell
.\run.ps1 smoke tests from login spec
.\run.ps1 smoke and mobile tests from dashboard spec in headed mode
```

### 2️⃣ Batch Script (Windows Command Prompt)
```cmd
run.bat smoke tests from login spec
run.bat regression tests in headed mode
```

### 3️⃣ Direct Node Command (Cross-Platform)
```bash
node testRunner.js "run smoke tests from login spec"
```

### 4️⃣ NPM Scripts (Predefined Shortcuts)
```bash
npm run run:smoke-from-login
```

---

## 🚀 Most Common Commands

| What You Want | Command |
|---------------|---------|
| Quick smoke test | `node testRunner.js "run smoke tests"` |
| Smoke from login | `npm run run:smoke-from-login` |
| Smoke from dashboard | `npm run run:smoke-from-dashboard` |
| All mobile tests | `npm run run:mobile-tests` |
| Debug login tests | `node testRunner.js "run login tests in debug mode"` |
| See all options | `npm run help` |

---

## 📝 Command Template

```
node testRunner.js "run [TAGS] tests from [SPEC] spec in [MODE] mode"
```

**Mix and match:**
- **Tags**: smoke, regression, mobile, negative
- **Specs**: login, dashboard, transactions
- **Modes**: headed, headless, debug, ui
- **Browsers**: chromium, firefox, webkit

---

## 💡 Real Examples

```bash
# Simple
node testRunner.js "run smoke tests"
node testRunner.js "run tests from login spec"

# With tags + specs
node testRunner.js "run smoke tests from dashboard spec"
node testRunner.js "run regression and mobile tests from transactions spec"

# With modes
node testRunner.js "run smoke tests in headed mode"
node testRunner.js "run login tests in debug mode"

# Advanced
node testRunner.js "run smoke and mobile tests from all specs in headed mode"
node testRunner.js "run regression tests from dashboard spec in firefox"
```

---

## 📋 All NPM Scripts

```bash
npm run run:smoke-from-login                    # ⚡ Smoke tests from login spec
npm run run:smoke-from-dashboard               # ⚡ Smoke tests from dashboard spec
npm run run:smoke-from-transactions            # ⚡ Smoke tests from transactions spec
npm run run:regression-and-smoke-from-dashboard # 🔄 Both tags from dashboard
npm run run:mobile-tests                       # 📱 All mobile tests
npm run run:smoke-headed                       # 👁️ Smoke tests with browser visible
npm run run:all-tests-debug                    # 🐛 All tests in debug mode
npm run help                                   # 📖 Show full help
```

---

## 🎨 Visual Guide

### Command Parser Flow
```
"run smoke and mobile tests from dashboard spec in headed mode"
         ↓
Parser identifies:
  ✓ Tags: @smoke, @mobile
  ✓ Spec: tests/Dashboard.spec.ts
  ✓ Mode: headed
  ✓ Browser: chromium (default)
         ↓
Builds command:
  npx playwright test --headed --grep="@smoke|@mobile" tests/Dashboard.spec.ts
         ↓
Executes tests with color output
```

---

## 🔑 Key Features

✅ **Natural English** - No complex CLI syntax  
✅ **Flexible** - Combine any tags, specs, modes  
✅ **Colored Output** - Beautiful terminal display  
✅ **Smart Parsing** - Understands variations in phrasing  
✅ **NPM Integration** - Works with existing scripts  
✅ **Help System** - Built-in documentation  

---

## 🆘 Need Help?

```bash
# Show full help
npm run help

# See all npm scripts
npm run

# Check what's available
node testRunner.js --help
```

---

## 📊 Before vs After

### Before (Complex CLI)
```bash
npx playwright test --grep @smoke --headed tests/login.spec.ts
npx playwright test --grep "@smoke|@mobile" --headed tests/Dashboard.spec.ts
npx playwright test --debug --grep @regression tests/transactions.spec.ts
```

### After (Natural Language)
```bash
node testRunner.js "run smoke tests from login spec in headed mode"
node testRunner.js "run smoke and mobile tests from dashboard spec in headed mode"
node testRunner.js "run regression tests from transactions spec in debug mode"
```

**Much easier to remember and type! 🎉**

---

## 🎓 Learning Path

**Day 1**: Learn basic commands
```bash
node testRunner.js "run smoke tests"
node testRunner.js "run tests from login spec"
```

**Day 2**: Combine tags and specs
```bash
node testRunner.js "run smoke tests from dashboard spec"
```

**Day 3**: Add modes and browsers
```bash
node testRunner.js "run smoke tests in headed mode"
node testRunner.js "run mobile tests in firefox"
```

**Day 4+**: Master complex combinations
```bash
node testRunner.js "run smoke and mobile tests from all specs in headed mode"
```

---

**🎭 Happy Testing with Natural Language! ✨**

For detailed documentation, see: [NATURAL_LANGUAGE_TEST_RUNNER.md](NATURAL_LANGUAGE_TEST_RUNNER.md)
