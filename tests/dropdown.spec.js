import { test, expect } from '@playwright/test';
import DropdownPage from '../pages/dropdown.page';

test.describe('Dropdown tests', () => {
    /** @type {DropdownPage} */
    let dropdownPage;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        dropdownPage = new DropdownPage(page);
    })

    test.beforeEach(async () => {
        try {
            await dropdownPage.goto();
        } catch (error) {
            console.log('Error during navigation', error);
            throw error;
        }
    })

    test('Verify header text', async () => {
        const headingText = await dropdownPage.getHeaderText();
        expect(headingText).toContain('Dropdown List');
    });

    test('should have "Please select an option" as default', async () => {
        const defaultOption = await dropdownPage.getSelectedOption();
        expect(defaultOption).toBe('');
    });

    test('should select an option from the dropdown', async () => {
        await dropdownPage.selectOptionByValue('1');
        expect(await dropdownPage.getSelectedOption()).toBe('1');

        await dropdownPage.selectOptionByValue('2');
        expect(await dropdownPage.getSelectedOption()).toBe('2');
    })

    test('should verify available options', async () => {
        const options = await dropdownPage.getSelectedOptions();
        expect(options).toEqual(['Please select an option', 'Option 1', 'Option 2']);
    });

    test('should not change selection for invalid option', async () => {
        try {
            await dropdownPage.selectOptionByValue('3');
        }
        catch (error) {
            console.log("Expected error: trying to select am invalid option that does not exist!!");
        }
        expect(await dropdownPage.getSelectedOption()).not.toBe('3');
    });

    test('should check if dropdown is visible and enabled', async () => {
        expect(await dropdownPage.isDropdownEnabled()).toBeTruthy();
        expect(await dropdownPage.isDropdownVisible()).toBeTruthy();
    })

    test('should select option by visible text', async () => {
        await dropdownPage.selectOptionByLabel('Option 1');
        expect(await dropdownPage.getSelectedOption()).toBe('1');
    })

    test('should verify that default option is disabled', async () => {
        expect(await dropdownPage.isOptionDisabled("")).toBeTruthy();
    });

    test.afterAll(async () => {
        await dropdownPage.page.close();
    })
})