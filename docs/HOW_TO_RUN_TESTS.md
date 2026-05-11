# 🎭 How to Run Tests - Complete Guide

## ✅ CORRECT Ways to Run Tests

### 🔵 Windows PowerShell (EASIEST - Recommended)

```powershell
# Simple syntax - no quotes needed!
.\run.ps1 smoke tests from login spec
.\run.ps1 regression tests from dashboard spec in headed mode
.\run.ps1 mobile tests
.\run.ps1 smoke and regression tests from transactions spec
```

**Why this is best:**
- ✅ No quotes needed
- ✅ Clean syntax
- ✅ Works like natural conversation
- ✅ Easiest to remember

---

### 🟢 Windows Command Prompt

```cmd
run.bat smoke tests from login spec
run.bat regression tests in headed mode
run.bat mobile tests from dashboard spec
```

---

### 🟡 Cross-Platform Node Command

```bash
# MUST use quotes!
node testRunner.js "run smoke tests from login spec"
node testRunner.js "run regression tests from dashboard spec in headed mode"
node testRunner.js "run mobile tests"
```

**Important:** Quotes are REQUIRED with this method!

---

### 🟠 NPM Scripts (Predefined)

```bash
npm run run:smoke-from-login
npm run run:smoke-from-dashboard
npm run run:mobile-tests
npm run run:smoke-headed
npm run help
```

**When to use:** Quick access to common test scenarios

---

## ❌ WRONG Ways (Common Mistakes)

### ❌ Mistake #1: Running "run" directly
```powershell
run smoke tests from login spec
```
**Error:** `The term 'run' is not recognized`

**Fix:** Use the script:
```powershell
.\run.ps1 smoke tests from login spec
```

---

### ❌ Mistake #2: Missing quotes with node
```bash
node testRunner.js run smoke tests from login spec
```
**Error:** Multiple arguments interpreted incorrectly

**Fix:** Use quotes:
```bash
node testRunner.js "run smoke tests from login spec"
```

---

### ❌ Mistake #3: Wrong NPM syntax
```bash
npm run smoke tests from login spec
```
**Error:** npm doesn't understand the command

**Fix:** Use predefined script or custom command:
```bash
npm run run:smoke-from-login
# or
.\run.ps1 smoke tests from login spec
```

---

## 📋 Command Examples

### Smoke Tests
```powershell
# All smoke tests
.\run.ps1 smoke tests

# Smoke from specific spec
.\run.ps1 smoke tests from login spec
.\run.ps1 smoke tests from dashboard spec
.\run.ps1 smoke tests from transactions spec
```

### Regression Tests
```powershell
# All regression tests
.\run.ps1 regression tests

# Regression from specific spec
.\run.ps1 regression tests from dashboard spec
```

### Mobile Tests
```powershell
# All mobile tests
.\run.ps1 mobile tests

# Mobile tests with visible browser
.\run.ps1 mobile tests in headed mode
```

### Combining Multiple Tags
```powershell
.\run.ps1 smoke and regression tests
.\run.ps1 smoke and mobile tests from dashboard spec
.\run.ps1 regression and mobile tests in headed mode
```

### With Display Modes
```powershell
# Headed mode (browser visible)
.\run.ps1 smoke tests in headed mode

# Debug mode (step-by-step)
.\run.ps1 login tests in debug mode

# UI mode (Playwright UI)
.\run.ps1 all tests in ui mode
```

### Specific Browsers
```powershell
.\run.ps1 smoke tests in firefox
.\run.ps1 regression tests in webkit
.\run.ps1 mobile tests in safari headed mode
```

---

## 🎯 Quick Reference Table

| What You Want | Command |
|---------------|---------|
| Quick smoke check | `.\run.ps1 smoke tests` |
| Smoke from login | `.\run.ps1 smoke tests from login spec` |
| Smoke from dashboard | `.\run.ps1 smoke tests from dashboard spec` |
| All mobile tests | `.\run.ps1 mobile tests` |
| Debug login | `.\run.ps1 login tests in debug mode` |
| Headed mode | `.\run.ps1 smoke tests in headed mode` |
| Multiple tags | `.\run.ps1 smoke and mobile tests` |
| With browser | `.\run.ps1 smoke tests in firefox` |

---

## 🚦 Decision Tree: Which Method to Use?

```
On Windows PowerShell?
    ├─ Yes → Use: .\run.ps1 [your command]
    │         (Easiest! No quotes needed)
    │
    └─ No → On Windows CMD?
            ├─ Yes → Use: run.bat [your command]
            │
            └─ No → On Mac/Linux or need cross-platform?
                    └─ Use: node testRunner.js "your command"
                           (Must use quotes!)

Want a quick predefined command?
    └─ Use: npm run run:[scenario]
```

---

## 💡 Pro Tips

### Tip 1: Tab Completion
```powershell
# Type the start and press Tab
.\run.ps1 smoke<TAB>
```

### Tip 2: Command History
```powershell
# Press Up Arrow to see previous commands
# Edit and re-run quickly
```

### Tip 3: Quick Help
```powershell
.\run.ps1 --help
npm run help
node testRunner.js --help
```

### Tip 4: NPM Script List
```bash
# See all available npm scripts
npm run
```

### Tip 5: Combine with Watch Mode
```powershell
# For rapid development - tests rerun on file changes
npx playwright test --ui
```

---

## 🎓 Learning Path

### Day 1: Start with PowerShell Script
```powershell
.\run.ps1 smoke tests
.\run.ps1 smoke tests from login spec
```

### Day 2: Try Different Specs
```powershell
.\run.ps1 smoke tests from dashboard spec
.\run.ps1 smoke tests from transactions spec
```

### Day 3: Add Modes
```powershell
.\run.ps1 smoke tests in headed mode
.\run.ps1 mobile tests in headed mode
```

### Day 4: Combine Multiple Tags
```powershell
.\run.ps1 smoke and mobile tests
.\run.ps1 regression and smoke tests from dashboard spec
```

### Day 5+: Master Everything
```powershell
.\run.ps1 smoke and mobile tests from all specs in firefox headed mode
```

---

## 🆘 Troubleshooting

### Problem: "run is not recognized"
**Solution:** You're missing the `.\` prefix
```powershell
# Wrong
run smoke tests

# Correct
.\run.ps1 smoke tests
```

---

### Problem: "Execution policy" error in PowerShell
**Solution:** Allow script execution (one-time setup)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then try again:
```powershell
.\run.ps1 smoke tests
```

---

### Problem: No tests running
**Solution:** Check your command syntax
```powershell
# Show what would be executed
.\run.ps1 smoke tests from login spec

# Look at the "Executing:" line to verify the command
```

---

### Problem: Tests fail
**Solution:** 
1. Check if the test tags exist in your specs
2. Try running with headed mode to see what's happening
```powershell
.\run.ps1 smoke tests in headed mode
```

---

## 📞 Getting Help

```powershell
# Show help for PowerShell script
.\run.ps1

# Show help for test runner
.\run.ps1 --help

# Show all npm scripts
npm run

# Show Playwright help
npx playwright test --help
```

---

## 🎉 Examples in Action

### Morning Smoke Test (Before Work)
```powershell
.\run.ps1 smoke tests
# Fast check: 6 tests in ~8 seconds
```

### Debugging a Failing Login Test
```powershell
.\run.ps1 login tests in debug mode
# Opens Playwright Inspector for step-by-step debugging
```

### Testing Mobile Responsiveness
```powershell
.\run.ps1 mobile tests in headed mode
# Watch tests run on iPhone 14 Pro Max viewport
```

### Full Regression Before Deployment
```powershell
.\run.ps1 regression tests
# Complete test suite across all specs
```

### Cross-Browser Testing
```powershell
.\run.ps1 smoke tests in firefox
.\run.ps1 smoke tests in webkit
# Verify compatibility
```

---

**🎭 Happy Testing! Choose the method that works best for you! ✨**
