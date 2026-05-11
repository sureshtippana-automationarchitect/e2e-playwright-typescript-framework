# 🚀 GitHub Actions CI/CD Setup Guide

## 📋 Overview

This guide provides step-by-step instructions for setting up and using GitHub Actions to run your Playwright E2E tests automatically in a CI/CD pipeline.

---

## 🎯 What's Included

### 1. **Main CI/CD Pipeline** (`playwright.yml`)
- **Trigger:** Runs on push/PR to `main` or `develop` branches
- **Jobs:**
  - 🚀 **Smoke Tests** - Quick validation (6 tests)
  - 🔄 **Regression Tests** - Full suite across 3 browsers (10 tests)
  - 📱 **Mobile Tests** - iPhone 14 Pro Max testing (3 tests)
  - 📋 **Test Summary** - Consolidated results

### 2. **Scheduled Nightly Tests** (`scheduled-tests.yml`)
- **Trigger:** Runs every night at 2 AM UTC
- **Coverage:** All 12 tests across all 3 browsers (36 total executions)
- **Matrix Strategy:** Tests each spec file on each browser

---

## 🛠️ Step-by-Step Setup Guide

### Step 1: Verify Workflow Files Exist

Your repository already has the GitHub Actions workflows configured:

```
.github/
  workflows/
    ├── playwright.yml          # Main CI/CD pipeline
    └── scheduled-tests.yml     # Nightly scheduled tests
```

### Step 2: Commit and Push to GitHub

```bash
# Add the workflow files (if newly created)
git add .github/workflows/

# Commit the changes
git commit -m "feat: Add enhanced GitHub Actions CI/CD workflows for Playwright tests"

# Push to develop branch
git push origin develop

# Or push to main branch
git push origin main
```

### Step 3: Enable GitHub Actions (if not already enabled)

1. Go to your GitHub repository
2. Click on **"Actions"** tab at the top
3. If prompted, click **"I understand my workflows, go ahead and enable them"**

### Step 4: Verify Workflows are Active

1. Navigate to **Settings** → **Actions** → **General**
2. Ensure **"Allow all actions and reusable workflows"** is selected
3. Check that **"Read and write permissions"** is enabled under Workflow permissions

---

## 🎬 How to Trigger Tests

### A. Automatic Triggers

#### 1. **On Push to Main/Develop**
```bash
git push origin develop
```
- Automatically runs the main CI/CD pipeline
- Executes: Smoke → Regression → Mobile tests

#### 2. **On Pull Request**
```bash
# Create a PR from feature branch to main/develop
gh pr create --base develop --head feature-branch
```
- Runs all tests before merging
- Prevents broken code from being merged

#### 3. **Scheduled (Nightly)**
- Runs automatically every day at 2 AM UTC
- No manual action needed
- Comprehensive test coverage across all browsers

### B. Manual Triggers

#### 1. **Via GitHub UI**
1. Go to **Actions** tab
2. Select **"Playwright E2E Tests CI/CD Pipeline"** or **"Scheduled Nightly Tests"**
3. Click **"Run workflow"** button
4. Choose branch (main or develop)
5. Click **"Run workflow"**

#### 2. **Via GitHub CLI**
```bash
# Trigger main CI/CD pipeline
gh workflow run "Playwright E2E Tests CI/CD Pipeline" --ref develop

# Trigger scheduled tests manually
gh workflow run "Scheduled Nightly Tests" --ref develop
```

---

## 📊 Viewing Test Results

### Step 1: Navigate to Actions Tab
1. Go to your GitHub repository
2. Click on **"Actions"** tab

### Step 2: Select Workflow Run
1. Click on the workflow run you want to view
2. See the workflow visualization with all jobs

### Step 3: View Job Details
- **Smoke Tests** - Quick validation results
- **Regression Tests** - Detailed results per browser
- **Mobile Tests** - Mobile viewport test results

### Step 4: Download Artifacts
1. Scroll to **"Artifacts"** section at the bottom
2. Download available reports:
   - `smoke-test-results` - Smoke test HTML report
   - `regression-results-chromium` - Chromium regression results
   - `regression-results-firefox` - Firefox regression results
   - `regression-results-webkit` - WebKit regression results
   - `mobile-test-results` - Mobile test results with screenshots
   - `smoke-screenshots` - Screenshots from smoke tests

### Step 5: View Test Summary
- Check the **"Summary"** section for quick overview
- Review **"Annotations"** for any test failures or warnings

---

## 🎯 Workflow Job Details

### Job 1: Smoke Tests 🚀
- **Purpose:** Quick validation before running full suite
- **Tests Run:** 6 smoke tests (@smoke tag)
- **Browser:** Chromium only (fastest)
- **Timeout:** 10 minutes
- **Artifacts:** Test results + Screenshots

### Job 2: Regression Tests 🔄
- **Purpose:** Comprehensive cross-browser testing
- **Tests Run:** 10 regression tests (@regression tag)
- **Browsers:** Chromium, Firefox, WebKit (matrix strategy)
- **Timeout:** 30 minutes per browser
- **Dependency:** Runs only if smoke tests pass
- **Artifacts:** Separate results per browser

### Job 3: Mobile Tests 📱
- **Purpose:** Mobile viewport testing
- **Tests Run:** 3 mobile tests (@mobile tag)
- **Device:** iPhone 14 Pro Max (430x932 viewport)
- **Browser:** WebKit (Safari)
- **Timeout:** 15 minutes
- **Dependency:** Runs only if smoke tests pass
- **Artifacts:** Results + Screenshots

### Job 4: Test Summary 📋
- **Purpose:** Consolidated results report
- **Generates:** Summary of all job results
- **Runs:** Always (even if tests fail)
- **Dependency:** Waits for all test jobs to complete

---

## ⚙️ Customization Options

### 1. Change Test Schedule

Edit `.github/workflows/scheduled-tests.yml`:

```yaml
schedule:
  # Run every day at 2 AM UTC
  - cron: '0 2 * * *'
  
  # Examples:
  # Every 6 hours: '0 */6 * * *'
  # Weekdays at 9 AM: '0 9 * * 1-5'
  # Every Sunday at midnight: '0 0 * * 0'
```

### 2. Add More Browsers

Edit `.github/workflows/playwright.yml`:

```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit, 'Google Chrome', 'Microsoft Edge']
```

### 3. Run Specific Test Suites

Add custom jobs:

```yaml
login-tests-only:
  name: Login Tests
  runs-on: ubuntu-latest
  steps:
    - name: Run Login Tests
      run: npx playwright test tests/login.spec.ts
```

### 4. Add Environment Variables

```yaml
env:
  BASE_URL: https://www.saucedemo.com
  TEST_ENV: production
  TIMEOUT: 30000
```

### 5. Enable Test Retries

Update test command:

```yaml
- name: Run Tests with Retries
  run: npx playwright test --retries=2
```

---

## 🔍 Troubleshooting

### Issue 1: Tests Failing Only in CI

**Symptoms:**
- Tests pass locally but fail in GitHub Actions

**Solutions:**
1. **Check browser installation:**
   ```yaml
   - name: Install Playwright Browsers
     run: npx playwright install --with-deps
   ```

2. **Add debug logging:**
   ```yaml
   - name: Run Tests with Debug
     run: DEBUG=pw:api npx playwright test
   ```

3. **Increase timeout:**
   ```yaml
   timeout-minutes: 60
   ```

### Issue 2: Artifacts Not Uploading

**Symptoms:**
- Cannot download test reports/screenshots

**Solutions:**
1. **Verify artifact path:**
   ```yaml
   - uses: actions/upload-artifact@v4
     with:
       name: test-results
       path: |
         playwright-report/
         screenshots/
   ```

2. **Use `if: always()` to upload even on failure:**
   ```yaml
   - uses: actions/upload-artifact@v4
     if: always()
   ```

### Issue 3: Workflow Not Triggering

**Symptoms:**
- Push/PR doesn't start workflow

**Solutions:**
1. **Check branch names match:**
   ```yaml
   on:
     push:
       branches: [ main, develop ]  # Must match your branch name
   ```

2. **Verify workflow file location:**
   - Must be in `.github/workflows/`
   - Must have `.yml` or `.yaml` extension

3. **Check GitHub Actions is enabled:**
   - Go to Settings → Actions → General
   - Enable "Allow all actions"

### Issue 4: Out of Storage/Runner Space

**Symptoms:**
- "No space left on device" error

**Solutions:**
1. **Clean up before tests:**
   ```yaml
   - name: Clean up disk space
     run: |
       sudo rm -rf /usr/share/dotnet
       sudo rm -rf /opt/ghc
       sudo apt-get clean
   ```

2. **Install only needed browsers:**
   ```yaml
   - name: Install Chromium Only
     run: npx playwright install --with-deps chromium
   ```

---

## 📈 Best Practices

### 1. **Use Dependency Between Jobs**
```yaml
regression-tests:
  needs: smoke-tests  # Run only if smoke tests pass
```

### 2. **Cache npm Dependencies**
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20.x'
    cache: 'npm'  # Faster installs
```

### 3. **Set Appropriate Timeouts**
```yaml
timeout-minutes: 30  # Prevents hung jobs
```

### 4. **Use Matrix Strategy for Coverage**
```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
```

### 5. **Upload Artifacts on Failure**
```yaml
- uses: actions/upload-artifact@v4
  if: always()  # Upload even if tests fail
```

### 6. **Use Descriptive Job Names**
```yaml
name: 🚀 Smoke Tests  # Emojis help visual identification
```

### 7. **Set fail-fast: false for Matrix**
```yaml
strategy:
  fail-fast: false  # Continue other browsers if one fails
```

---

## 🎨 Advanced Configurations

### 1. Run Tests on Multiple Node Versions

```yaml
strategy:
  matrix:
    node-version: ['18.x', '20.x', '22.x']
```

### 2. Parallel Test Execution

```yaml
- name: Run Tests in Parallel
  run: npx playwright test --workers=4
```

### 3. Conditional Job Execution

```yaml
if: github.ref == 'refs/heads/main'
```

### 4. Slack/Email Notifications

```yaml
- name: Send Slack Notification
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 📝 Sample GitHub Actions Status Badge

Add to your README.md:

```markdown
[![Playwright Tests](https://github.com/your-username/e2e-playwright-typescript-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/your-username/e2e-playwright-typescript-framework/actions/workflows/playwright.yml)
```

---

## 🔐 Secrets Management

### Adding Secrets

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add secrets like:
   - `TEST_USERNAME`
   - `TEST_PASSWORD`
   - `API_KEY`

### Using Secrets in Workflow

```yaml
- name: Run Tests with Credentials
  env:
    USERNAME: ${{ secrets.TEST_USERNAME }}
    PASSWORD: ${{ secrets.TEST_PASSWORD }}
  run: npx playwright test
```

---

## 📊 Cost Considerations

### GitHub Actions Free Tier
- **Public Repositories:** Unlimited minutes
- **Private Repositories:** 
  - Free: 2,000 minutes/month
  - Pro: 3,000 minutes/month
  - Team: 10,000 minutes/month

### Optimization Tips
1. **Run smoke tests first** - Fail fast strategy
2. **Use matrix strategically** - Don't test everything everywhere
3. **Cache dependencies** - Faster runs = fewer minutes
4. **Install specific browsers** - Don't install all if not needed

---

## 🎯 Quick Start Checklist

- [ ] Verify `.github/workflows/playwright.yml` exists
- [ ] Verify `.github/workflows/scheduled-tests.yml` exists
- [ ] Commit and push workflow files to GitHub
- [ ] Enable GitHub Actions in repository settings
- [ ] Make a test push to trigger the workflow
- [ ] Navigate to Actions tab and view results
- [ ] Download artifacts to verify reports
- [ ] Add status badge to README.md
- [ ] Configure scheduled tests timing (if needed)
- [ ] Set up notifications (optional)

---

## 🆘 Getting Help

### Resources
- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **Playwright CI Docs:** https://playwright.dev/docs/ci
- **This Framework Docs:** See `docs/` folder

### Common Commands

```bash
# View workflow runs
gh run list

# View specific run details
gh run view <run-id>

# Watch run in real-time
gh run watch

# Cancel a run
gh run cancel <run-id>

# Re-run failed jobs
gh run rerun <run-id> --failed
```

---

## 📄 Example Workflow Run Output

```
🚀 Smoke Tests ✅ (2m 34s)
  ├── Checkout Code
  ├── Setup Node.js
  ├── Install Dependencies
  ├── Install Playwright Browsers
  ├── Run Smoke Tests (6 passed)
  └── Upload Artifacts

🔄 Regression Tests ✅ (18m 12s)
  ├── chromium ✅ (5m 45s)
  ├── firefox ✅ (6m 23s)
  └── webkit ✅ (6m 04s)

📱 Mobile Tests ✅ (4m 18s)
  ├── Run Mobile Tests (3 passed)
  └── Upload Screenshots

📋 Test Summary ✅ (15s)
  └── All Jobs Completed Successfully
```

---

## 🎉 Success!

Your GitHub Actions CI/CD pipeline is now set up! Every push or PR will automatically run your Playwright tests and provide detailed reports.

---

**Last Updated:** May 11, 2026  
**Framework Version:** 2.0.0  
**CI/CD Status:** ✅ Fully Configured
