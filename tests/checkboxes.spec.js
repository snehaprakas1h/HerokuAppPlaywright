///<reference types ="playwright"/>

import { test, expect } from '@playwright/test';
import CheckboxesPage from '../pages/checkboxes.page';

test.describe('Verify checkboxes page', () => {
    /** @type {CheckboxesPage} */
    let checkBoxesPage;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        checkBoxesPage = new CheckboxesPage(page);
    })

    test.beforeEach(async () => {
        try {
            await checkBoxesPage.goto();
        } catch (error) {
            console.log('Error during navigation', error);
            throw error;
        }
    })

    test('Should verify the default states of checkbox', async () => {
        await checkBoxesPage.verifyCheckBoxState(0, false);
        await checkBoxesPage.verifyCheckBoxState(1, true);
    })

    test('Should check and uncheck checkboxes', async () => {
        await checkBoxesPage.checkCheckBox(0);
        await checkBoxesPage.uncheckCheckBox(1);
    })

    test('Should toggle checkboxes', async () => {
        await checkBoxesPage.getCheckBox1().click();
        await expect(checkBoxesPage.getCheckBox1()).toBeChecked();
        await checkBoxesPage.getCheckBox1().click();
        await expect(checkBoxesPage.getCheckBox1()).not.toBeChecked();

        await checkBoxesPage.getCheckBox2().click();
        await expect(checkBoxesPage.getCheckBox2()).not.toBeChecked();
        await checkBoxesPage.getCheckBox2().click();
        await expect(checkBoxesPage.getCheckBox2()).toBeChecked();
    })

    test.afterAll(async () => {
        await checkBoxesPage.page.close();
    })
})