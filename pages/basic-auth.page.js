/// <reference types="playwright"/>

import * as dotenv from 'dotenv';
dotenv.config();

// Page Object Model class for Basic Authentication Page
export default class BasicAuthPage {
    constructor(page) {
        this.page = page;
        this.heading = page.locator('h3'); 
        this.bodyText = page.locator('p'); 
    }

    //https://username:password@hostname/path

    // Navigates to the Basic Authentication page with credentials
    async goto() {
        // Retrieve username and password from .env file
        const username = process.env.BASIC_AUTH_USERNAME;
        const password = process.env.BASIC_AUTH_PASSWORD;

        // Throw an error if credentials are missing
        if (!username || !password) {
            throw new Error('BASIC_AUTH_USERNAME or BASIC_AUTH_PASSWORD not found in .env');
        }

        // Retrieve baseURL from Playwright config
        const baseUrl = this.page.context()._options.baseURL;
        if (!baseUrl) {
            throw new Error('baseURL is not defined in Playwright Config file');
        }

        // Construct the authentication URL
        const authUrl = `https://${username}:${password}@${new URL(baseUrl).host}/basic_auth`;
        console.log(`Navigating to: ${authUrl}`); // Log the URL for debugging

        // Visit the page with authentication credentials
        await this.page.goto(authUrl, { waitUntil: 'domcontentloaded' });
    }

    // Returns the text content of the heading
    async getHeadingText() {
        return await this.heading.textContent();
    }

    // Returns the text content of the body
    async getBodyText() {
        return await this.bodyText.textContent();
    }
}
