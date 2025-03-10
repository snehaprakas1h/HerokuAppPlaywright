///<reference types='playwright'/>

export default class ChallengingDOMPage {
    constructor(page) {
        // Store the page object passed in to interact with the page
        this.page = page;

        // Define page elements
        this.heading = page.locator('h3');
        this.bodyText = page.locator('p');
        this.blueButton = page.locator('.large-2 a:nth-child(1)');
        this.redButton = page.locator('.button.alert');
        this.greenButton = page.locator('.button.success');
        this.tableHeaders = page.locator('tr th');
        this.tableRows = page.locator('tbody tr');
        this.editLinks = page.locator('tbody tr td:nth-child(7) a:nth-child(1)');
        this.deleteLinks = page.locator('tbody tr td:nth-child(7) a:nth-child(2)');
        this.canvas = page.locator('canvas#canvas');
        this.answerScript = page.locator('div.large-10 script');
    }

    // Method to navigate to the Challenging DOM page
    async goto() {
        await this.page.goto('/challenging_dom');
    }

    // Methods to retrieve text content
    async getHeadingText() {
        return await this.heading.textContent();
    }

    async getBodyText() {
        return await this.bodyText.textContent();
    }

    // Methods to interact with buttons
    async clickBlueButton() {
        await this.blueButton.click();
    }

    async clickRedButton() {
        await this.redButton.click();
    }

    async clickGreenButton() {
        await this.greenButton.click();
    }

    // Methods to retrieve button text
    async getBlueButtonText() {
        const text = this.blueButton.textContent();
        await this.page.waitForTimeout(1000);
        return text;
    }

    async getRedButtonText() {
        const text = this.redButton.textContent();
        await this.page.waitForTimeout(1000);
        return text;
    }

    async getGreenButtonText() {
        const text = this.greenButton.textContent();
        await this.page.waitForTimeout(1000);
        return text;
    }

    // Methods for table operations
    async getTableHeadersText() {
        return await this.tableHeaders.allTextContents();
    }

    async getRowCount() {
        return await this.tableRows.count();
    }

    async getCellText(rowIndex, columnIndex) {
        return await this.page.locator(`tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${columnIndex + 1})`).textContent();
    }

    // Methods for action links
    async clickEditLink(rowIndex) {
        //await this.page.locator(`tbody tr:nth-child(${rowIndex + 1}) td:nth-child(7) a:nth-child(1)`).click();
        const editLink = this.page.locator(`tbody tr:nth-child(${rowIndex + 1}) td:nth-child(7) a:nth-child(1)`);
        await editLink.click();
    }

    async clickDeleteLink(rowIndex) {
        await this.page.locator(`tbody tr:nth-child(${rowIndex + 1}) td:nth-child(7) a:nth-child(2)`).click();
    }

    // Methods for canvas operations
    async getCanvasProperties() {
        return await this.page.evaluate(() => {
            const canvas = document.querySelector('canvas#canvas');
            return {
                width: canvas.width,
                height: canvas.height,
                id: canvas.id
            };
        })
    }

    async takeScreenshot() {
        return await this.canvas.screenshot();
    }

}