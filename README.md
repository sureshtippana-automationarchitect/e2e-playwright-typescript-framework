Playwright TypeScript Automation Framework

A scalable and maintainable end-to-end (E2E) test automation framework built using **Playwright + TypeScript**, following best practices like **Page Object Model (POM)**, environment configuration, reusable utilities, and data-driven testing.

---

## 📌 Key Features

- ✅ Playwright with TypeScript
- ✅ Page Object Model (POM) design pattern
- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Environment-based configuration (dev, qa, prod)
- ✅ Data-driven testing using JSON
- ✅ Reusable utilities (click, fill, wait, assertions)
- ✅ API + UI automation support
- ✅ Custom reporting (HTML / Allure)
- ✅ CI/CD ready (GitHub Actions compatible)

📂 Project Structure

├── tests/ # Test specs
├── pages/ # Page Object classes
├── utils/ # Helper methods & reusable functions
├── test-data/ # JSON test data
├── api/ # API test methods (GET, POST, etc.)
├── config/ # Environment configs
├── playwright.config.ts # Playwright configuration
├── package.json

⚙️ Setup Instructions

1️⃣ Clone Repository
https://github.com/sureshtippana-automationarchitect/e2e-playwright-typescript-framework.git

2️⃣ Install Dependencies
npm install

3️⃣ Install Playwright Browsers
npx playwright install

▶️ Running Tests
Run all tests : npx playwright test
Run login test in dev: npm run login:dev

🌍 Environment Configuration
Supports multiple environments using environment variables:
Example: cross-env test_env=dev npx playwright test

----
🔧 Tech Stack:
Playwright
TypeScript
Node.js
Cross-env
-----
🚀 **CI/CD Integration:**
This framework can be integrated with:
GitHub Actions
Jenkins
Azure DevOps
-----------------------------
👨‍💻 **Author**
Suresh Tippana
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

