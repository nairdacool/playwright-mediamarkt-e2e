# 🧪 Playwright E2E Testing Framework with TypeScript & Allure Reporting

This repository contains a complete setup for **end-to-end (E2E) automated testing** using [Playwright](https://playwright.dev/) with **TypeScript**, integrated with [Allure](https://docs.qameta.io/allure/) for rich reporting and debugging.

> Built for scalable, maintainable, and readable UI test automation.

---

## 📂 Project Structure
```plaintext
├── src/                 # Source folder containing core project files
│   ├── Enums/           # Enums used across the project
│   ├── pages/           # Page Object Models (POMs)
│   ├── tests/           # Test specs
│   ├── Utils/           # Utility functions and helpers
├── allure-results/      # Raw test result files (ignored by Git)
├── allure-report/       # Generated Allure HTML report (ignored by Git)
├── node_modules/        # Installed dependencies (ignored by Git)
├── playwright.config.ts # Playwright configuration
├── package.json         # Project metadata & scripts
├── tsconfig.json        # TypeScript configuration
├── .gitignore           # Git ignore rules
└── README.md            # Project documentation
```

---

## 🚀 Getting Started

### 📦 1. Install Dependencies

### a. Install Node.js and npm

Before installing dependencies, ensure that Node.js and npm are installed on your system.
#### ✅ Check if Node.js and npm are already installed:

Open your terminal and run:
```bash
node -v
npm -v
```
If both commands return version numbers, you're good to go! Otherwise, follow these steps:
    Open Terminal (found in Applications > Utilities).
    Install Homebrew (if not already installed):
    
🧰 Install Node.js using Homebrew (macOS):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
   Install Node.js via Homebrew:
   ```bash
   brew install node
   ```
   Verify installation:
   ```bash
   node -v
   npm -v
   ```

b. Install Project Dependencies

Once Node.js and npm are installed, navigate to your project directory and run:
```bash
npm install
npx playwright install
```
This will install all required packages and set up Playwright for browser automation.

c. Install Dotenv for Credential Management

To securely manage environment variables (like credentials), install dotenv:
```bash
npm install dotenv
```

---

### 🔐 2. Environment Variables
This project uses `dotenv` to manage environment-specific values such as credentials and base URLs.

#### Setup
1. Create a `.env` file in the root of the project:
   ```bash
   cp .env.example .env
   ```
2. Add your environment variables to `.env`:
   ```bash
   BASE_URL=https://www.mediamarkt.es/es
   LOGIN_EMAIL=your@email.com
   LOGIN_PASSWORD=your-secure-password
   ```

> **Note**: Ensure your `.env` file is not committed to version control by keeping it in `.gitignore`.

---

### 🧪 3. Run Tests
Run all tests using:

```bash
npm test
# or
npx playwright test
```

---

### 📊 4. Generate and Open Allure Report
Generate and view the Allure report with:

```bash
npm run test:allure
```

This will:
- Clean previous reports
- Run all Playwright tests
- Generate and open an Allure report in your browser

---

### 🛠️ 5. Available Scripts
| Script                | Description                                      |
|-----------------------|--------------------------------------------------|
| `npm test`            | Run all Playwright tests                         |
| `npm run clean:reports` | Delete `allure-results` and `allure-report` folders |
| `npm run allure:generate` | Generate HTML report from results              |
| `npm run allure:open` | Open the generated HTML report                   |
| `npm run test:allure` | Full cycle: clean → test → report → open         |

---

### ⚙️ 6. Configuration Highlights

#### `playwright.config.ts`
- Test timeout: 30 seconds
- Retry logic for CI
- Reporters: List + Allure
- Project runs in Chromium, Firefox, WebKit
- Traces, screenshots, and videos on failure

#### `.gitignore`
Excludes:
- `node_modules/`
- Allure folders
- VSCode settings
- OS artifacts

---

### 🧰 Tech Stack
- [Playwright](https://playwright.dev/): For browser automation
- [TypeScript](https://www.typescriptlang.org/): For type-safe scripting
- [Allure Reporter](https://docs.qameta.io/allure/): For detailed test reporting

---

### 🧪 Sample Test
```ts
import { test, expect } from '@playwright/test';

test('basic page title check', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});
```

---

### 🛡️ License
This project is licensed under the [MIT License](LICENSE).

---

### 🙋‍♂️ Contribution
Feel free to fork and contribute with PRs or issues! For major changes, please open an issue first to discuss what you would like to change.

---

### 📸 Allure Report Features
- Full test history and statistics
- Screenshots and traces on failure
- Step-by-step breakdown
- Easily debuggable failures

Allure helps you visualize test behavior and issues effectively.
