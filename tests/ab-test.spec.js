import { test, expect } from '@playwright/test';
import ABTestPage from '../pages/ab-test.page.js';

test.describe('A/B Test Page', () => {
    /** @type {ABTestPage} */
    let abTestPage;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        abTestPage = new ABTestPage(page);
    })

    test.beforeEach(async () => {
        try { await abTestPage.goto() }
        catch (error) {
            console.error('Error during navigation:', error);
            throw error;
        };
    })

    test('Verify A/B test heading is displayed correctly', async () => {
        const headingText = await abTestPage.getHeadingText();
        expect(headingText).toMatch(/A\/B Test/);
    })

    test('Verify body text explaining the test is displayed and has enough length', async () => {
        const bodyText = await abTestPage.getBodyText();
        expect(bodyText.length).toBeGreaterThan(10);
    })

    test.afterAll(async () => {
        await abTestPage.page.close();
    })
})
