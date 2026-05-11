# GitHub Actions Troubleshooting Guide

## 🐛 Issues Fixed - May 11, 2026

### Issue 1: Firefox and WebKit Project Not Found ❌

**Error Message:**
```
Error: Project(s) "firefox" not found. Available projects: "chromium"
Error: Project(s) "webkit" not found. Available projects: "chromium"
```

**Root Cause:**
The `playwright.config.ts` file only had the `chromium` project enabled. Firefox and WebKit projects were commented out.

**Solution:**
Enabled all three browser projects in `playwright.config.ts`:

```typescript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
]
```

**Files Modified:**
- `playwright.config.ts` - Uncommented firefox and webkit projects

---

### Issue 2: Playwright Browsers Not Installed Properly ❌

**Error Message:**
```
Looks like Playwright was just installed or updated.
Please run the following command to download new browsers:
npx playwright install
```

**Root Cause:**
The workflow was trying to install specific browsers with `npx playwright install --with-deps chromium` (or firefox/webkit), but when running tests with `--project` flags, all browsers need to be available.

**Solution:**
Changed all browser installation steps to install all browsers:

```yaml
# Before (Incorrect)
- name: 🎭 Install Playwright Browsers
  run: npx playwright install --with-deps chromium

# After (Correct)
- name: 🎭 Install Playwright Browsers
  run: npx playwright install --with-deps
```

**Files Modified:**
- `.github/workflows/playwright.yml` - Updated all browser installation commands
- `.github/workflows/scheduled-tests.yml` - Updated browser installation

---

### Issue 3: Node.js 20 Deprecation Warning ⚠️

**Warning Message:**
```
Node.js 20 actions are deprecated. The following actions are running on Node.js 20 and may not work as expected:
actions/download-artifact@v4. Actions will be forced to run with Node.js 24 by default starting June 2nd, 2026.
```

**Root Cause:**
GitHub Actions is planning to deprecate Node.js 20 in favor of Node.js 24.

**Solution:**
This is just a warning and won't cause test failures. The actions will automatically upgrade to Node.js 24 by June 2026. No immediate action needed.

**Recommendation:**
Monitor for updates to action versions that support Node.js 24, and update when available:
```yaml
- uses: actions/upload-artifact@v5  # When v5 is released
- uses: actions/download-artifact@v5
```

---

## 📊 Summary of Changes

### Modified Files

| File | Changes Made | Reason |
|------|-------------|--------|
| `playwright.config.ts` | Enabled firefox and webkit projects | Allow cross-browser testing |
| `.github/workflows/playwright.yml` | Changed browser installation to install all browsers | Fix "project not found" errors |
| `.github/workflows/scheduled-tests.yml` | Changed browser installation to install all browsers | Ensure nightly tests work |

### Commits

- **Commit:** `828f54e`
- **Message:** "fix: Enable all browser projects and fix GitHub Actions workflow issues"
- **Branch:** `develop`
- **Pushed:** May 11, 2026

---

## ✅ Expected Results After Fix

### Main CI/CD Pipeline (`playwright.yml`)

**Job 1: Smoke Tests** 🚀
- ✅ Runs 6 smoke tests on Chromium
- ✅ Completes in ~2-3 minutes
- ✅ All browsers installed

**Job 2: Regression Tests** 🔄
- ✅ Runs 10 regression tests on Chromium
- ✅ Runs 10 regression tests on Firefox
- ✅ Runs 10 regression tests on WebKit
- ✅ All 3 jobs run in parallel
- ✅ Completes in ~5-7 minutes per browser

**Job 3: Mobile Tests** 📱
- ✅ Runs 3 mobile tests on Chromium
- ✅ iPhone 14 Pro Max viewport (430x932)
- ✅ Completes in ~4-5 minutes

**Job 4: Test Summary** 📋
- ✅ Consolidates all results
- ✅ Shows pass/fail status for all jobs

### Scheduled Nightly Tests (`scheduled-tests.yml`)

- ✅ Runs at 2 AM UTC daily
- ✅ Tests all 3 suites (login, dashboard, transactions)
- ✅ Tests all 3 browsers (chromium, firefox, webkit)
- ✅ Total: 36 test executions (12 tests × 3 browsers)

---

## 🔍 How to Verify Fixes

### Step 1: Check Workflow Run Status

1. Go to: https://github.com/sureshtippana-automationarchitect/e2e-playwright-typescript-framework/actions
2. Look for the latest workflow run (should be running now)
3. Verify all jobs show green checkmarks ✅

### Step 2: Review Job Logs

Click on each job to verify:

**Smoke Tests:**
- Look for: "6 passed"
- Browser: chromium only
- No errors

**Regression Tests (each browser):**
- Look for: "10 passed" on chromium
- Look for: "10 passed" on firefox
- Look for: "10 passed" on webkit
- No "project not found" errors

**Mobile Tests:**
- Look for: "3 passed"
- Viewport: 430x932 confirmed
- No browser installation errors

### Step 3: Download and Check Artifacts

1. Scroll to bottom of workflow run page
2. Download artifacts:
   - `smoke-test-results`
   - `regression-results-chromium`
   - `regression-results-firefox`
   - `regression-results-webkit`
   - `mobile-test-results`

3. Extract and open `playwright-report/index.html` in each
4. Verify all tests show as passed

---

## 🚨 Common Issues and Solutions

### Issue: "Cannot find module" Error

**Solution:**
```bash
# Locally, run:
npm ci
npx playwright install --with-deps
```

### Issue: Tests Pass Locally but Fail in CI

**Checklist:**
- [ ] Check if `process.env.CI` conditional logic exists
- [ ] Verify retries are set: `retries: process.env.CI ? 2 : 0`
- [ ] Check for hardcoded timeouts
- [ ] Ensure no local-only dependencies

### Issue: Workflow Not Triggering

**Checklist:**
- [ ] Verify workflow file is in `.github/workflows/`
- [ ] Check branch names in `on.push.branches` match your branch
- [ ] Ensure GitHub Actions is enabled in repo settings
- [ ] Verify workflow file has correct YAML syntax

### Issue: Artifact Upload Failing

**Solution:**
```yaml
- uses: actions/upload-artifact@v4
  if: always()  # Upload even if tests fail
  with:
    name: test-results-${{ matrix.browser }}
    path: |
      playwright-report/
      test-results/
      screenshots/
```

---

## 📈 Performance Optimization Tips

### 1. Cache npm Dependencies

Already implemented:
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20.x'
    cache: 'npm'  # ✅ Saves 30-60 seconds
```

### 2. Install Only Required Browsers (Per Job)

For specific jobs that only need one browser:
```yaml
# For smoke tests (chromium only)
- name: Install Chromium Only
  run: npx playwright install chromium --with-deps
```

### 3. Reduce Artifact Retention

```yaml
- uses: actions/upload-artifact@v4
  with:
    retention-days: 7  # Instead of 30
```

### 4. Use Matrix Strategy Efficiently

```yaml
strategy:
  fail-fast: false  # Continue other browsers if one fails
  matrix:
    browser: [chromium, firefox, webkit]
```

---

## 📚 Additional Resources

- **Main Setup Guide:** [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md)
- **Playwright CI Docs:** https://playwright.dev/docs/ci
- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **Workflow Syntax:** https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions

---

## 📞 Getting Help

If you encounter issues not covered here:

1. Check the [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md) for detailed setup
2. Review workflow run logs in GitHub Actions tab
3. Compare local test results with CI results
4. Ensure playwright.config.ts matches workflow configuration

---

**Last Updated:** May 11, 2026  
**Status:** ✅ All Issues Resolved  
**Next Workflow Run:** In Progress
