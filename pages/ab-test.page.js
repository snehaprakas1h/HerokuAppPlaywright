export default class ABTestPage {
    constructor(page) {
        // Store the page object passed in to interact with the page
        this.page = page;
    
        this.heading = page.locator('h3');
        this.bodyText = page.locator('p');
    }

    // Method to navigate to the A/B test page
    async goto() {
        await this.page.goto('/abtest');
    }

    // Method to retrieve the text content of the heading
    async getHeadingText() {
        return await this.heading.textContent();
    }

    // Method to retrieve the text content of the body (p tag)
    async getBodyText() {
        return await this.bodyText.textContent();
    }
}
