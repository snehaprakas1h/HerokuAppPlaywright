///<reference types='playwright'/>
import {expect} from '@playwright/test';
import exp from 'constants';

export default class DisappearingElementsPage {
    constructor(page){
        this.page = page;
        this.heading = page.locator('h3');
        this.bodyText = page.locator('p');
        this.menuItems = page.locator('ul li a');
    }

    async goto(){
        await this.page.goto('/disappearing_elements');
    }

    async getHeading(){
        return await this.heading.textContent();
    }

    async getBodyText(){
        return await this.bodyText.textContent();
    }

    async getMenuItems(){
        return await this.menuItems.allTextContents();
    }

    async clickMenuItems(menuText){
        return await this.page.locator(`//li/a[text()=("${menuText}")]`).click();
    }

    async verifyMenuItems(expectedItems){
        const actualItems = await this.menuItems.allInnerTexts();
        console.log(actualItems);
        const isSubSet = actualItems.every(item=>expectedItems.includes(item));
        expect(isSubSet).toBeTruthy();
    }

    async reloadPageUntilItemAppears(itemText, maxAttempts =10){
        for(let i=0;i<maxAttempts;i++){
            const items = await this.getMenuItems();
            if(items.includes(itemText)){
                return true;
            }

            await this.page.reload();
            await this.page.waitForTimeout(1000);
        }

        throw new Error(`${itemText} did not appear after ${maxAttempts} attempts`);
    }
}