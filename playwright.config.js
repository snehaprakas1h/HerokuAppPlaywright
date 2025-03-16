import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://the-internet.herokuapp.com', // Configurable Base URL
    headless: true, // Run tests in headless mode
    screenshot: 'only-on-failure', // Capture screenshot on failure
    video: 'retain-on-failure', // Capture video on failure
    trace: 'on',
    launchOptions: {
      args: ['--start-maximized'], // For full screen
    },
  },
  reporter: [
    ['line'],
    ['allure-playwright', { resultsDir: 'allure-results' }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  projects: [
    {
      name: "chromium",
      use: {
        // 2 (Make sure device is not set)
        // ...devices["Desktop Chrome"],

        // 3
        viewport: null, //for full view
      },
    },
  ],
});
