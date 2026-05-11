# Direct Command Execution Guide

This guide explains how to run tests using direct commands in PowerShell without the `.\run.ps1` prefix.

## 🎯 Overview

After running the setup script, you can execute tests using natural language commands directly in PowerShell:

```powershell
run smoke tests from login spec
```

Instead of:

```powershell
.\run.ps1 smoke tests from login spec
```

---

## 🚀 Quick Setup

### Step 1: Run the Setup Script

```powershell
.\setup-powershell.ps1
```

This script will:
- ✅ Create or update your PowerShell profile
- ✅ Add a global `run` function
- ✅ Enable auto-completion for test commands
- ✅ Display setup instructions

### Step 2: Reload Your Profile

Choose one of:

**Option A: Automatic reload (during setup)**
- When prompted, type `Y` to reload immediately

**Option B: Manual reload**
```powershell
. $PROFILE
```

**Option C: Restart PowerShell**
- Close and reopen your PowerShell window

---

## 📝 Usage

### Basic Commands

```powershell
# Run smoke tests from a specific spec
run smoke tests from login spec
run smoke tests from dashboard spec
run smoke tests from transactions spec

# Run regression tests
run regression tests
run regression tests from dashboard spec

# Run mobile tests
run mobile tests

# Run with browser modes
run smoke tests in headed mode
run regression tests in debug mode

# Run with specific browser
run smoke tests with firefox
run regression tests with webkit

# Combine tags
run smoke and regression tests
run smoke and mobile tests from dashboard spec
```

### Advanced Commands

```powershell
# Multiple tags with mode
run smoke and regression tests from dashboard spec in headed mode

# Mobile tests with browser mode
run mobile tests in headed mode with chromium

# All tests in debug mode
run all tests in debug mode
```

### Help

```powershell
run --help
run -h
```

---

## 🔧 How It Works

### PowerShell Profile Function

The setup script adds this function to your PowerShell profile (`$PROFILE`):

```powershell
function run {
    param(
        [Parameter(ValueFromRemainingArguments=$true)]
        [string[]]$Command
    )
    
    $projectRoot = "D:\github\e2e-playwright-typescript-framework"
    $testRunnerPath = Join-Path $projectRoot "testRunner.ts"
    
    if (-not (Test-Path $testRunnerPath)) {
        Write-Host "Error: testRunner.ts not found" -ForegroundColor Red
        return
    }
    
    $commandString = $Command -join ' '
    
    if ([string]::IsNullOrWhiteSpace($commandString)) {
        Write-Host "No command provided!"
        Write-Host "Usage: run smoke tests from login spec"
        return
    }
    
    if (-not $commandString.StartsWith('run ')) {
        $commandString = "run $commandString"
    }
    
    Push-Location $projectRoot
    try {
        & npx ts-node testRunner.ts $commandString
    } finally {
        Pop-Location
    }
}
```

### Execution Flow

1. **User types command**: `run smoke tests from login spec`
2. **PowerShell function intercepts**: Captures all arguments
3. **Adds 'run' prefix**: Converts to `run smoke tests from login spec`
4. **Changes directory**: Navigates to project root
5. **Executes TypeScript runner**: Calls `npx ts-node testRunner.ts`
6. **Returns to original directory**: Uses `Push/Pop-Location`

---

## 🎨 Auto-Completion

The setup includes tab completion for common commands:

```powershell
run <TAB>
```

Suggestions include:
- `smoke tests`
- `regression tests`
- `mobile tests`
- `smoke tests from login spec`
- `smoke tests from dashboard spec`
- `smoke tests from transactions spec`
- `regression tests from dashboard spec`
- `mobile tests in headed mode`
- `smoke and regression tests`
- `tests from login spec in debug mode`
- `--help`

---

## 🛠 Troubleshooting

### Issue: "run is not recognized"

**Problem**: The function wasn't loaded in the current session.

**Solution**:
```powershell
. $PROFILE
```

Or restart PowerShell.

---

### Issue: Function works in one terminal but not another

**Problem**: Each PowerShell window needs to load the profile.

**Solution**: The profile loads automatically when you open new PowerShell windows. For existing windows, reload manually:
```powershell
. $PROFILE
```

---

### Issue: Setup script fails or shows errors

**Problem**: PowerShell execution policy might be restricted.

**Solution**: Check your execution policy:
```powershell
Get-ExecutionPolicy
```

If it's `Restricted`, change it:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then run the setup script again.

---

### Issue: Want to update the function

**Problem**: Need to modify the function behavior.

**Solution**: 
1. Edit `setup-powershell.ps1` with your changes
2. Run it again: `.\setup-powershell.ps1`
3. Choose `Y` to reload

The script will detect and update the existing function.

---

## 📍 Profile Location

Your PowerShell profile is located at:

```powershell
$PROFILE
```

Typical paths:
- **Windows PowerShell**: `C:\Users\YourName\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`
- **PowerShell Core**: `C:\Users\YourName\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`

To view your profile:
```powershell
notepad $PROFILE
```

To view profile location:
```powershell
$PROFILE
```

---

## 🔄 Alternative Methods

If you don't want to modify your PowerShell profile, you can still use:

### Method 1: PowerShell Wrapper Script
```powershell
.\run.ps1 smoke tests from login spec
```

### Method 2: Batch File (Windows CMD)
```cmd
run.bat smoke tests from login spec
```

### Method 3: NPM Scripts
```powershell
npm run test:run -- "run smoke tests from login spec"
```

### Method 4: Direct Execution
```powershell
npx ts-node testRunner.ts "run smoke tests from login spec"
```

---

## 🎯 Benefits of Direct Commands

| Feature | Direct Command | Script Wrapper |
|---------|---------------|----------------|
| Speed | ⚡ Fast | ⚡ Fast |
| Typing | ✅ Short | ⚠️ Requires prefix |
| Auto-complete | ✅ Yes | ❌ No |
| Works anywhere | ✅ Yes (after profile loads) | ⚠️ Only in project directory |
| Setup required | ✅ One-time | ❌ None |

---

## 📚 Examples

### Smoke Testing Workflow

```powershell
# Test login functionality
run smoke tests from login spec

# Test dashboard features
run smoke tests from dashboard spec

# Test transactions
run smoke tests from transactions spec

# Run all smoke tests
run smoke tests
```

### Debugging Workflow

```powershell
# Run specific spec in debug mode
run tests from login spec in debug mode

# Run with headed browser for visual inspection
run smoke tests from dashboard spec in headed mode

# Combine debug mode with specific browser
run tests from transactions spec in debug mode with firefox
```

### Mobile Testing Workflow

```powershell
# Run all mobile tests
run mobile tests

# Run mobile tests in headed mode (see mobile viewport)
run mobile tests in headed mode

# Run mobile tests from specific spec
run mobile tests from dashboard spec
```

### Continuous Integration Workflow

```powershell
# Run all smoke tests (fast feedback)
run smoke tests

# Run all regression tests (comprehensive)
run regression tests

# Run everything
run smoke and regression tests
```

---

## ✨ Summary

1. ✅ **One-time setup**: Run `.\setup-powershell.ps1`
2. ✅ **Reload profile**: `. $PROFILE` or restart PowerShell
3. ✅ **Use direct commands**: `run smoke tests from login spec`
4. ✅ **Tab completion**: Type `run` and press Tab
5. ✅ **Works globally**: From any directory in PowerShell

---

## 🎓 Learn More

- [NATURAL_LANGUAGE_TEST_RUNNER.md](NATURAL_LANGUAGE_TEST_RUNNER.md) - Complete runner documentation
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - Command cheat sheet
- [HOW_TO_RUN_TESTS.md](HOW_TO_RUN_TESTS.md) - Detailed testing guide
- [README.md](README.md) - Project overview
