/// <reference types="playwright" />

export default class AddAndRenameTest {
    constructor(page) {
        // Store the page object to interact with the page
        this.page = page;

        this.heading = page.locator('h3');
        this.addElementButton = page.getByText('Add Element');
        this.deleteButton = page.getByText('Delete');
    }

    // Navigate to the "Add/Remove Elements" page
    async goto() {
        await this.page.goto('/add_remove_elements/');
    }

    // Retrieve the text content of the heading
    async getHeadingText() {
        return await this.heading.textContent();
    }

    // Click on the "Add Element" button
    async clickAddElementButton() {
        return await this.addElementButton.click();
    }

    // Click on the "Delete" button
    async clickDeleteButton() {
        return await this.deleteButton.click();
    }

    // Check if the "Delete" button is visible
    async isDeleteButtonVisible() {
        return await this.deleteButton.isVisible();
    }

    // Check if the "Add Element" button is visible
    async isAddElementButtonVisible() {
        return await this.addElementButton.isVisible();
    }

    // Retrieve the "Add Element" button locator
    async getAddElementButton() {
        return this.addElementButton;
    }
}
