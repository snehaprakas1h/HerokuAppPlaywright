import { test, expect } from '@playwright/test';
import ChallengingDOMPage from '../pages/challenging-dom.page';

test.describe('Challenging DOM Page', () => {
    /**@type {ChallengingDOMPage} */
    let challengingDOMPage;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        challengingDOMPage = new ChallengingDOMPage(page);
    })

    test.beforeEach(async () => {
        try {
            await challengingDOMPage.goto();
        } catch (error) {
            console.error('Error during Navigation', error);
            throw error;
        }
    })

    test('Verify page title and structure', async () => {
        // Verify heading
        const headingText = await challengingDOMPage.getHeadingText();
        expect(headingText).toBe('Challenging DOM');

        // Verify body text
        const bodyText = await challengingDOMPage.getBodyText();
        expect(bodyText).toContain('example demonstrates that with unique');
    })

    test('Verify colored buttons are present and clickable', async () => {
        // Store the button text before clicking
        const blueButtonTextBefore = await challengingDOMPage.getBlueButtonText();
        const redButtonTextBefore = await challengingDOMPage.getRedButtonText();
        const greenButtonTextBefore = await challengingDOMPage.getGreenButtonText();

        // Click blue button and verify page updated
        await challengingDOMPage.clickBlueButton();
        await expect.poll(async () => {
            return await challengingDOMPage.getBlueButtonText();
        }).not.toEqual(blueButtonTextBefore);

        // Click red button and verify page updated
        await challengingDOMPage.clickRedButton();
        await expect.poll(async () => {
            return await challengingDOMPage.getRedButtonText();
        }).not.toEqual(redButtonTextBefore);

        // Click green button and verify page updated
        await challengingDOMPage.clickGreenButton();
        await expect.poll(async () => {
            return await challengingDOMPage.getGreenButtonText();
        }).not.toEqual(greenButtonTextBefore);
    });

    test('Verify table structure and content', async () => {
        // Check table headers
        const headers = await challengingDOMPage.getTableHeadersText();
        expect(headers).toEqual(['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Diceret', 'Action']);

        // Verify table has 10 rows
        const rowCount = await challengingDOMPage.getRowCount();
        expect(rowCount).toEqual(10);

        // Verify content of first row, first cell
        const firstCellText = await challengingDOMPage.getCellText(0, 0);
        expect(firstCellText).not.toBe("");
    });

    test('Verify edit and delete links', async () => {

        const page = await challengingDOMPage.page;

        await challengingDOMPage.clickEditLink(0);
        await page.waitForLoadState('networkidle');

        console.log('Current URL:', await page.url());

        await expect(page).toHaveURL(/#edit/);

        await page.reload();

        await challengingDOMPage.clickDeleteLink(0);
        await page.waitForLoadState('networkidle');

        console.log('Current URL:', await page.url());
        await expect(page).toHaveURL(/#delete/); // Use Playwright's built-in URL assertion
    });

    test('Verify canvas element properties', async () => {
        const canvasProps = await challengingDOMPage.getCanvasProperties();
        expect(canvasProps.id).toBe('canvas');
        expect(canvasProps.width).toBeGreaterThan(0);
        expect(canvasProps.height).toBeGreaterThan(0);
    });

    test.skip('Canvas content changes when buttons are clicked', async () => {
        const canvasSelector = '#canvas';

        // Ensure the canvas is present
        await challengingDOMPage.page.waitForSelector(canvasSelector);

        // Capture screenshot before click
        await challengingDOMPage.page.screenshot({ path: 'canvas_before_click.png' });

        // Get canvas image data before click
        const beforeImageData = await challengingDOMPage.page.evaluate(() => {
            const canvas = document.querySelector('#canvas'); // Use the selector directly
            if (!canvas) return null;
            const ctx = canvas.getContext('2d');
            return JSON.stringify(Array.from(ctx.getImageData(0, 0, 100, 100).data)); // Convert to JSON string
        });

        console.log("Before Image Data:", beforeImageData.slice(0, 50)); // Log a sample

        // Click a button
        await challengingDOMPage.clickBlueButton();

        // Wait until the canvas content updates
        await challengingDOMPage.page.waitForFunction((beforeDataString) => {
            const canvas = document.querySelector('#canvas'); // Use the selector directly
            if (!canvas) return false;
            const ctx = canvas.getContext('2d');
            const afterData = Array.from(ctx.getImageData(0, 0, 100, 100).data);
            return JSON.stringify(afterData) !== beforeDataString;
        }, {}, beforeImageData);

        // Capture screenshot after click
        await challengingDOMPage.page.screenshot({ path: 'canvas_after_click.png' });

        // Get canvas image data after click
        const afterImageData = await challengingDOMPage.page.evaluate(() => {
            const canvas = document.querySelector('#canvas'); // Use the selector directly
            if (!canvas) return null;
            const ctx = canvas.getContext('2d');
            return JSON.stringify(Array.from(ctx.getImageData(0, 0, 100, 100).data)); // Convert to JSON string
        });

        console.log("After Image Data:", afterImageData.slice(0, 50)); // Log a sample

        // Ensure the canvas content actually changed
        expect(beforeImageData).not.toEqual(afterImageData);
    });

    test.afterAll(async () => {
        await brokenImagesPage.page.close();
    });

});
