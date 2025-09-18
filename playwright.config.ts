import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './src/tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [['list'], ['allure-playwright']],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'data-test',
  },

  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        headless: false, 
        viewport: null, // disables Playwright resizing to preserve --start-maximized
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },

    // {
    //   name: 'Firefox',
    //   use: {
    //     browserName: 'firefox',
    //     headless: false,
    //     viewport: null,
    //     launchOptions: {
    //       args: ['--start-maximized'],
    //     },
    //   },
    // },

    // {
    //   name: 'WebKit',
    //   use: {
    //     browserName: 'webkit',
    //     headless: false,
    //     viewport: null,
    //     launchOptions: {
    //       args: ['--start-maximized'],
    //     },
    //   },
    // },
  ],
});
