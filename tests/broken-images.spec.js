import { test, expect } from '@playwright/test';
import BrokenImagesPage from '../pages/broken-images.page';

test.describe.serial('Broken Images Page', () => { //Forces tests to run sequentially in this block
    /** @type {BrokenImagesPage} */
    let brokenImagesPage;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        brokenImagesPage = new BrokenImagesPage(page);
    })

    test.beforeEach(async () => {
        try {
            await brokenImagesPage.goto();
        } catch (error) {
            console.error('Error during navigation', error);
            throw error;
        }
    })

    test('Verify heading text is displayed correctly', async () => {
        const headingText = await brokenImagesPage.getHeadingText();
        expect(headingText).toBe('Broken Images');
    })

    test('Verify images are present on the page', async () => {
        const imageCount = await brokenImagesPage.getImageCount();
        expect(imageCount).toBeGreaterThan(0);
    })

    test('Verify broken images on the page', async () => {
        const brokenImages = await brokenImagesPage.getBrokenImages();
        console.log(`Broken Images Count: ${brokenImages.length}`);
        expect(brokenImages.length).toBeGreaterThan(0); // Expect at least one broken image
    })

    //Instead of serial test.step can be used to group tests to sure broken images on page test executes only if first one passes 

    test('Verify images and check for broken ones', async ({ page }) => {
        await test.step('Verify images are present on the page', async () => {
            const imageCount = await brokenImagesPage.getImageCount();
            expect(imageCount).toBeGreaterThan(0);
        });

        await test.step('Verify broken images on the page', async () => {
            const brokenImages = await brokenImagesPage.getBrokenImages();
            console.log(`Broken Images Count: ${brokenImages.length}`);
            expect(brokenImages.length).toBeGreaterThan(0); // Expect at least one broken image
        });
    });


    test.afterAll(async () => {
        await brokenImagesPage.page.close();
    });
})