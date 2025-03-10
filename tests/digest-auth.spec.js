import { test, expect } from '@playwright/test';
import DigestAuthPage from '../pages/digest-auth.page';


test.describe('Verify Digest Auth', () => {
    /** @type {DigestAuthPage} */
    let digestAuthPage;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        digestAuthPage = new DigestAuthPage(page);
    })

    test.beforeEach(async () => {
        try {
            digestAuthPage.goto();
        } catch (error) {
            console.log('Error during navigation', error);
            throw error;
        }
    })

    test('Verify the heading',async()=>{
        const headingText = await digestAuthPage.getHeadingText();
        expect(headingText).toMatch('Digest Auth');
    });

    test('Verify the body text',async()=>{
        const bodyText = await digestAuthPage.getBodyText();
        expect(bodyText).toContain('Congratulations!');
    });

    test.afterAll(async () => {
        await digestAuthPage.page.close();
    })
})