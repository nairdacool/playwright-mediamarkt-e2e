# 🧪 Playwright E2E Testing Framework with TypeScript & Allure Reporting

This repository contains a complete setup for **end-to-end (E2E) automated testing** using [Playwright](https://playwright.dev/) with **TypeScript**, integrated with **Allure** for rich reporting and debugging.

> Built for scalable, maintainable, and readable UI test automation.

---

## 📂 Project Structure
```ts
├── tests/ # Test specs
│ └── example.spec.ts
├── tests-examples/ # Optional additional test suites
├── allure-results/ # Raw test result files (ignored by Git)
├── allure-report/ # Generated Allure HTML report (ignored by Git)
├── playwright.config.ts # Playwright configuration
├── package.json # Project metadata & scripts
├── tsconfig.json # TypeScript configuration
└── README.md
```

---

## 🚀 Getting Started

### 📦 1. Install Dependencies

```bash
npm install
```
### 🔐 2. Environment Variables
This project uses `dotenv` to manage environment-specific values such as credentials and base URLs.

### ✅ Setup
```ts
Create a .env file in the root of the project:

cp .env.example .env
Add your environment variables to .env:
```
```bash
BASE_URL=https://www.mediamarkt.es/es
LOGIN_EMAIL=your@email.com
LOGIN_PASSWORD=your-secure-password
```
### 🧪 3. Run Tests

```bash
npm test
# or
npx playwright test
```

### 📊 4. Generate and Open Allure Report
```ts
npm run test:allure

This will:

    Clean previous reports

    Run all Playwright tests

    Generate and open an Allure report in your browser
```
### 🧾 5. Scripts
```ts
Script	                     Description
npm test	             Run all Playwright tests
npm run clean:reports	     Delete allure-results and allure-report folders
npm run allure:generate	     Generate HTML report from results
npm run allure:open	     Open the generated HTML report
npm run test:allure	     Full cycle: clean → test → report → open
```
### 🛠️ 6. Configuration Highlights

#### playwright.config.ts
```ts
    Test timeout: 30 seconds

    Retry logic for CI

    Reporters: List + Allure

    Project runs in Chromium, Firefox, WebKit

    Traces, screenshots, and videos on failure
```
#### .gitignore

Excludes:
```ts
    node_modules/

    Allure folders

    VSCode settings

    OS artifacts
```
📸 Allure Report Features
```ts
    Full test history and statistics

    Screenshots and traces on failure

    Step-by-step breakdown

    Easily debuggable failures

    Allure helps you visualize test behavior and issues.
```
🧰 Tech Stack
```ts
    Playwright

    TypeScript

    Allure Reporter
```
💡 Tips
```ts
    Add your own test files under the tests/ folder.

    Update baseURL in playwright.config.ts to point to your target app.

    Use test hooks (beforeEach, afterEach) to manage setup/teardown.
```
### 🧪 Sample Test
```ts
import { test, expect } from '@playwright/test';

test('basic page title check', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});
```
### 🛡️ License

This project is licensed under the MIT License.
### 🙋‍♂️ Contribution

Feel free to fork and contribute with PRs or issues!