import { test, expect } from '@playwright/test';
import DynamicContentWithStaticContentPage from '../pages/dynamic-content-with-static-content.page';
import exp from 'constants';

test.describe('Dynamic and static content tests', async () => {

    /**@type {DynamicContentWithStaticContentPage} */
    let dynamicContentWithStaticContentPage;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        dynamicContentWithStaticContentPage = new DynamicContentWithStaticContentPage(page);
    });

    test.beforeEach(async () => {
        try {
            await dynamicContentWithStaticContentPage.goto();
        } catch (error) {
            console.log('Error during navigation', error);
            throw error;
        }
    });

    test('Verify the header text', async () => {
        const headerText = await dynamicContentWithStaticContentPage.getHeaderText();
        expect(headerText).toBe('Dynamic Content');
    });

    test('Verify body text', async () => {
        const bodyText = await dynamicContentWithStaticContentPage.getBodyText();
        expect(bodyText).toContain('new text and images');
    });

    test('Verify body text with static link', async () => {
        expect(await dynamicContentWithStaticContentPage.getStaticLink).toBeTruthy();
    })

    test('Verify dynamic content remains changed', async () => {

        const expectedText = await dynamicContentWithStaticContentPage.getTextContent(0);
        const expectedText2 = await dynamicContentWithStaticContentPage.getTextContent(1);

        await dynamicContentWithStaticContentPage.gotoStaticContent();

        const actualText = await dynamicContentWithStaticContentPage.getTextContent(0);
        const actualText1 = await dynamicContentWithStaticContentPage.getTextContent(1);

        expect(actualText).not.toContain(expectedText);
        expect(actualText1).not.toContain(expectedText2);
    });

    test('verify static content remains unchanged', async () => {
        const bodyTextExpected = await dynamicContentWithStaticContentPage.getBodyText();
        const bodyTextStaticExpected = await dynamicContentWithStaticContentPage.getStaticBodyText();

        await dynamicContentWithStaticContentPage.gotoStaticContent();

        const bodyTextActual = await dynamicContentWithStaticContentPage.getBodyText();
        const bodyTextStaticActual = await dynamicContentWithStaticContentPage.getStaticBodyText();


        expect(bodyTextActual).toEqual(bodyTextExpected);
        expect(bodyTextStaticActual).toEqual(bodyTextStaticExpected);
    });

    test('Verify text changes after reload', async () => {
        const initialText = await dynamicContentWithStaticContentPage.getTextContent(0);
        await dynamicContentWithStaticContentPage.reloadPage();
        const updatedText = await dynamicContentWithStaticContentPage.getTextContent(0);

        expect(updatedText).not.toBe(initialText);
    })

    test('Verify all blocks changes after reload', async () => {
        const initialTextBlocks = await dynamicContentWithStaticContentPage.getAllTextContents();
        await dynamicContentWithStaticContentPage.reloadPage();
        const updatedTextBlocks = await dynamicContentWithStaticContentPage.getAllTextContents();

        expect(updatedTextBlocks).not.toBe(initialTextBlocks);
    });

    test('Verify images change on page reload', async () => {
        const initialImages = await dynamicContentWithStaticContentPage.getAllImageSources();
        await dynamicContentWithStaticContentPage.reloadPage();
        const updatedImages = await dynamicContentWithStaticContentPage.getAllImageSources();
        expect(updatedImages).not.toEqual(initialImages);
    });

    test('Verify page contains exactly 3 content blocks',async()=>{
        const count = await dynamicContentWithStaticContentPage.getTextBlocks();
        expect(count-1).toBe(3);
    })


})