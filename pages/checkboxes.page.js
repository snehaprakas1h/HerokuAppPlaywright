///<reference types="playwright"/>
import { expect } from '@playwright/test';

export default class CheckboxesPage {
    constructor(page) {
        this.page = page;
        this.heading = 'h3';
        this.checkbox1 = page.locator("#checkboxes input").nth(0);
        this.checkbox2 = page.locator("#checkboxes input").nth(1);

        // this.checkbox1 = page.getByText('checkbox 1');
        // this.checkbox2 = page.getByText('checkbox 2');

        this.checkboxes = page.locator('#checkboxes input');
    }

    async goto() {
        await this.page.goto('/checkboxes');
    }

    async getHeadingText() {
        await this.heading.textContent();
    }

    async getCheckBox(index) {
        return this.checkboxes.nth(index);
    }

    async checkCheckBox(index) {
        const checkbox = await this.getCheckBox(index);
        if (!(await checkbox.isChecked())) {
            await checkbox.check();
        }
    }

    async uncheckCheckBox(index) {
        const checkbox = await this.getCheckBox(index);
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
        }
    }

    async verifyCheckBoxState(index, shouldBeChecked) {
        const checkbox = await this.getCheckBox(index);
        if (shouldBeChecked) {
            await expect(checkbox).toBeChecked();
        } else {
            await expect(checkbox).not.toBeChecked();
        }
    }

    getCheckBox1() {
        return this.checkbox1;
    }

    getCheckBox2() {
        return this.checkbox2;
    }
}