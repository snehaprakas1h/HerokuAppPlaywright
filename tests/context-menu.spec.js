import { test, expect } from '@playwright/test';
import ContextMenuPage from '../pages/context-menu.page.js';

test.describe('Context Menu tests', () => {
    /** @type {ContextMenuPage} */
    let contextMenuPage;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        contextMenuPage = new ContextMenuPage(page);
    });

    test.beforeEach(async () => {
        try {
            contextMenuPage.goto();
        } catch(error){
            console.log('error during navigation', error);
            throw error;
        }
    })

    test('Should display an alert on right-clicking the box', async () => {
        const page = contextMenuPage.page;
        page.once('dialog', async (dialog) => {
            expect(dialog.message()).toBe('You selected a context menu');
            await dialog.accept()
        })

        await contextMenuPage.rightClickButton();
    })

    test('Verify heading is displayed correctly', async () => {
        const heading = await contextMenuPage.getHeadingText();
        expect(heading).toContain('Context');
    })

    test('Verify body test is displayed correctly', async () => {
        const bodyText = await contextMenuPage.getBodyText();
        expect(bodyText).toContain('Right-click in the box below to see one called \'the-internet\'.')
    })

    test.afterAll(async () => {
        await contextMenuPage.page.close();
    })
})