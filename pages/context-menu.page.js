///<reference types="playwright"/>

export default class ContextMenuPage {
    constructor(page) {
        this.page = page;
        this.heading=page.locator('h3');
        this.bodyText = page.locator('p');
        this.heading = page.locator('h3');
        this.contextbox = page.locator('#hot-spot');
    }

    async goto() {
        await this.page.goto('/context_menu');
    }

    async getHeadingText(){
        return await this.heading.textContent();
    }

    async getBodyText(){
        return await this.bodyText.last().textContent();
    }

    async rightClickButton(){
        await this.contextbox.click({button:'right'});
    }

    async getAlertText(){
        return this.page.on('dialog',async(dialog)=>{
            const message = dialog.message();
            await dialog.accept();
            return message;
        })
    }



}