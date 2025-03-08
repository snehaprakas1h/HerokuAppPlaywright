/// <reference types="playwright" />

import { test, expect } from '@playwright/test';
import AddAndRenameTest from '../pages/add-and-rename-test.page';

test.describe('Add and remove test page', () => {
    /**@type{AddAndRenameTest} */
    let addAndRenameTest;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        addAndRenameTest = new AddAndRenameTest(page);
    })

    test.beforeEach(async () => {
        try {
            await addAndRenameTest.goto();
        } catch (error) {
            console.error('Error during navigation:', error);
            throw error;
        }
    });

    test('Verify "Add and remove elements" heading is displayed correctly', async () => {
        const headingText = await addAndRenameTest.getHeadingText();
        expect(headingText).toBe('Add/Remove Elements');
    });

    test('Verify the "Add Element" button can be clicked and "Delete" button becomes visible', async () => {
        expect(await addAndRenameTest.isAddElementButtonVisible()).toBeTruthy();
        await addAndRenameTest.clickAddElementButton();
        expect(await addAndRenameTest.getAddElementButton()).not.toBeDisabled();
        expect(await addAndRenameTest.isDeleteButtonVisible()).toBeTruthy();
        await addAndRenameTest.clickDeleteButton();
        expect(await addAndRenameTest.isDeleteButtonVisible()).toBeFalsy();
    });

    test('Verify the "Delete" button can be clicked and is hidden afterward', async () => {

        // Click the Add Element button multiple times
        const numberOfClicks = 4;
        for (let i = 0; i < numberOfClicks; i++) {
            await addAndRenameTest.clickAddElementButton();
            await addAndRenameTest.page.waitForTimeout(200);
        }


        // const deleteButtons = await addAndRenameTest.page.getByText('Delete').all();
        // let deleteButtonsCount = 0;
        // for (let i = 0; i < deleteButtons.length; i++) {
        //     const buttonText = await deleteButtons[i].textContent();
        //     if (buttonText === 'Delete') {
        //         deleteButtonsCount++;
        //     }
        // }
        // expect(deleteButtonsCount).toBe(numberOfClicks);

        // Verify that the number of delete buttons matches the number of clicks
        const deleteButtons = await addAndRenameTest.page.getByText('Delete');
        const deleteButtonsCount = await deleteButtons.count();
        expect(deleteButtonsCount).toBe(numberOfClicks);

        // Verify that each Delete button is clickable
        for (let i = deleteButtonsCount - 1; i >= 0; i--) {
            //const deleteButton = deleteButtons.locator(`nth=${i}`);
            const deleteButton = deleteButtons.nth(i);
            expect(await deleteButton.isEnabled()).toBeTruthy();
            await addAndRenameTest.page.waitForTimeout(200);
            await deleteButton.click();
            expect(await deleteButton.isVisible()).toBeFalsy();
        }

    })

    test.afterAll(async () => {
        await addAndRenameTest.page.close();
    })
})
