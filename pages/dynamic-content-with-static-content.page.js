///<reference types="playwright"/>

export default class DynamicContentWithStaticContentPage {
    constructor(page) {
        this.page = page;
        this.heading = page.locator('h3');
        this.bodyText = page.locator('.example p:nth-of-type(1)');
        this.staticText = page.locator('.example p:nth-of-type(1)');
        this.contentSection = page.locator('div#content');
        this.textBlocks = page.locator('div#content div.row');
        this.images = page.locator('div#content img');
        this.staticContentLink = page.locator('.example a');
    }

    async goto(){
        await this.page.goto('/dynamic_content');
    };

    async getHeaderText(){
        return await this.heading.textContent();
    }

    async getBodyText(){
        return await this.bodyText.textContent();
    }

    async getStaticBodyText(){
        return await this.staticText.textContent();
    }

    async getStaticLink(){
        return await this.staticContentLink;
    }

    async gotoStaticContent(){
        await this.staticContentLink.click();
    };

    async getTextContent(index){
        return await this.textBlocks.nth(index).textContent();
    };

    async getAllTextContents(){
        return await this.textBlocks.allTextContents();
    }

    async getAllImageSources(){
        return await this.images.evaluateAll(imgs=>imgs.map(img=>img.src));
    }

    async reloadPage(){
        await this.page.reload();
    }

    async getTextBlocks(){
        return await this.textBlocks.count();
    }
}