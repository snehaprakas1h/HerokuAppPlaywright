///<reference types ="playwright"/>

export default class DropdownPage {
    constructor(page) {
        this.page = page;
        this.dropdown = page.locator('#dropdown');
        this.heading = page.locator('h3');
    }

    async goto() {
        await this.page.goto('/dropdown');
    }

    async getHeaderText() {
        return await this.heading.textContent();
    }

    async selectOptionByValue(value) {
        await this.page.waitForSelector('#dropdown');
        const option = this.dropdown.locator(`option[value="${value}"]`);

        // Check if the option exists
        const optionExists = await option.count();
        console.log(optionExists)
        if (optionExists === 0) {
            console.log(`Option with value "${value}" does not exist`);
            return; // Prevents selecting an invalid option
        }

        // Select the option if it exists
        await this.dropdown.selectOption(value);
    }

    async selectOptionByLabel(label) {
        await this.dropdown.selectOption({ label });
    }

    async getSelectedOption() {
        return await this.dropdown.inputValue();
    }

    async getSelectedOptions() {
        return await this.dropdown.locator('option').allTextContents();
    }

    async isDropdownVisible() {
        return await this.dropdown.isVisible();
    }

    async isDropdownEnabled() {
        return await this.dropdown.isEnabled();
    }

    async isOptionDisabled(value) {
        return await this.dropdown.locator(`option[value="${value}"]`).getAttribute('disabled') !== null;
    }
}