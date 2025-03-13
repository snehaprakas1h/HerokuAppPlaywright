import {test,expect} from '@playwright/test';
import DisappearingElementsPage from '../pages/disappearing-elements.page';

test.describe('Disappearing elements tests',async()=>{

    /** @type {DisappearingElementsPage} */
    let disappearingElementsPage

    test.beforeAll(async({browser})=>{
        const page = await browser.newPage();
        disappearingElementsPage = new DisappearingElementsPage(page);
    });

    test.beforeEach(async()=>{
        try{
            await disappearingElementsPage.goto();
        }
        catch(error){
            console.log('Error during navigation',error);
            throw error;
        }
    })

    test('Verify the header text',async()=>{
        const headerText = await disappearingElementsPage.getHeading();
        expect(headerText).toBe('Disappearing Elements');
    });

    test('Verigy body text',async()=>{
        const bodyText = await disappearingElementsPage.getBodyText();
        expect(bodyText).toContain('disappearing/reappearing');
    });

    test('Verify menu items appear correctly',async()=>{
        const expectedItems = ['Home','About','Contact Us','Portfolio','Gallery'];
        await disappearingElementsPage.verifyMenuItems(expectedItems);
    })

    test('Ensure missing element appears after reload',async()=>{
        const missingItem = 'Gallery';
        await disappearingElementsPage.reloadPageUntilItemAppears(missingItem);
        const items = await disappearingElementsPage.menuItems.allTextContents();
        expect(items).toContain(missingItem);
    })

    test('Click on menu items and verify navigation',async()=>{
        const page = await disappearingElementsPage.page;
        await disappearingElementsPage.clickMenuItems('Home');
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/');
    })

    test.afterAll(async()=>{
        await disappearingElementsPage.page.close();
    })
})