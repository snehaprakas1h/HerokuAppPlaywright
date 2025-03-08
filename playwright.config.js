import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    use: {
        baseURL: 'https://the-internet.herokuapp.com', // Configurable Base URL
        headless: false, // Run tests in headless mode
        screenshot: 'only-on-failure', // Capture screenshot on failure
        video: 'retain-on-failure' // Capture video on failure
    },
    reporter: [['html', { outputFolder: 'reports' }]], // HTML report
});
