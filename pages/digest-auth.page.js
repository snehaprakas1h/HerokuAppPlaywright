///<reference types ='playwright'/>

export default class DigestAuthPage {
    constructor(page) {
        this.page = page;
        this.heading = page.locator('h3');
        this.bodyText = page.locator('p');
    }

    //https://username:password@hostname/path

    async goto() {
        const username = process.env.BASIC_AUTH_USERNAME;
        const password = process.env.BASIC_AUTH_PASSWORD;

        if (!username || !password) {
            throw new Error('BASIC_AUTH_USERNAME or BASIC_AUTH_PASSWORD not found in .env');
        }

        const baseUrl = this.page.context()._options.baseURL;
        if (!baseUrl) {
            throw new Error('naseURL is not defined in Playwright config file');
        }

        const authUrl = `https://${username}:${password}@${new URL(baseUrl).host}/digest_auth`;
        console.log(`Navigating to: ${authUrl}`);

        await this.page.goto(authUrl, { waitUntil: 'domcontentloaded' });
    }

    async getHeadingText(){
        return await this.heading.textContent();
    }

    async getBodyText(){
        return await this.bodyText.textContent();
    }
}