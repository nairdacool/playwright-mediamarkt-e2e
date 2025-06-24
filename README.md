# 🧪 Playwright E2E Testing Framework with TypeScript & Allure Reporting

This repository contains a complete setup for **end-to-end (E2E) automated testing** using [Playwright](https://playwright.dev/) with **TypeScript**, integrated with **Allure** for rich reporting and debugging.

> Built for scalable, maintainable, and readable UI test automation.

---

## 📂 Project Structure

├── tests/ # Test specs
│ └── example.spec.ts
├── tests-examples/ # Optional additional test suites
├── allure-results/ # Raw test result files (ignored by Git)
├── allure-report/ # Generated Allure HTML report (ignored by Git)
├── playwright.config.ts # Playwright configuration
├── package.json # Project metadata & scripts
├── tsconfig.json # TypeScript configuration
└── README.md


---

## 🚀 Getting Started

### 📦 1. Install Dependencies

```bash
npm install

## 🧪 2. Run Tests

npm test
# or
npx playwright test

3. Generate and Open Allure Report

npm run test:allure

This will:

    Clean previous reports

    Run all Playwright tests

    Generate and open an Allure report in your browser

🧾 Scripts
Script	Description
npm test	Run all Playwright tests
npm run clean:reports	Delete allure-results and allure-report folders
npm run allure:generate	Generate HTML report from results
npm run allure:open	Open the generated HTML report
npm run test:allure	Full cycle: clean → test → report → open

🛠️ Configuration Highlights
playwright.config.ts

    Test timeout: 30 seconds

    Retry logic for CI

    Reporters: List + Allure

    Project runs in Chromium, Firefox, WebKit

    Traces, screenshots, and videos on failure

.gitignore

Excludes:

    node_modules/

    Allure folders

    VSCode settings

    OS artifacts

📸 Allure Report Features

    Full test history and statistics

    Screenshots and traces on failure

    Step-by-step breakdown

    Easily debuggable failures

    Allure helps you visualize test behavior and issues.

🧰 Tech Stack

    Playwright

    TypeScript

    Allure Reporter

💡 Tips

    Add your own test files under the tests/ folder.

    Update baseURL in playwright.config.ts to point to your target app.

    Use test hooks (beforeEach, afterEach) to manage setup/teardown.

🧪 Sample Test

import { test, expect } from '@playwright/test';

test('basic page title check', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});

🛡️ License

This project is licensed under the MIT License.
🙋‍♂️ Contribution

Feel free to fork and contribute with PRs or issues!