///<reference types='playwright'/>
import { test, expect } from '@playwright/test';
import BasicAuthPage from '../pages/basic-auth.page';

test.describe('Verify Basic Authorization', () => {
    /**@type {BasicAuthPage} */
    let basicAuthPage;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        basicAuthPage = new BasicAuthPage(page);
    })

    test.beforeEach(async()=>{
        try{
            await basicAuthPage.goto();
        } catch(error){
            console.error('Error during navigation:',error);
            throw error;
        }
    })

    test('Verify the heading', async () => {
        const headingText = await basicAuthPage.getHeadingText();
        expect(headingText).toBe('Basic Auth');
    })

    test('Verify the Content', async () => {
        const bodyText = await basicAuthPage.getBodyText();
        expect(bodyText.trim()).toContain('Congratulations!');
    })

    test.afterAll(async () => {
        await basicAuthPage.page.close();
    })

})