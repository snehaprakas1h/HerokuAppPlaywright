///<reference types='playwright'/>

import { test, expect } from '@playwright/test';
import DragAndDropPage from '../pages/drag-and-drop.page';

test.describe('Drag and drop tests', async () => {

    /**@type {DragAndDropPage} */
    let dragAndDropPage;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage()
        dragAndDropPage = new DragAndDropPage(page);
    });

    test.beforeEach(async()=>{
        try{
            await dragAndDropPage.goto();
        }catch(error){
            console.log('Error in navigation',error);
            throw error;
        }
    });

    test('Verify heading text',async()=>{
        const headingText = await dragAndDropPage.getHeadingText();
        expect(headingText).toBe('Drag and Drop');
    });

    test('Should drag and drop using dragTo()',async()=>{
        await dragAndDropPage.dragUsingDragTo();
        expect(await dragAndDropPage.getColumnHeader('column-a')).toBe('B');
        expect(await dragAndDropPage.getColumnHeader('column-b')).toBe('A');
    })

    test('Should drag and drop using mouse movements()',async()=>{
        await dragAndDropPage.dragUsingMouse();
        expect(await dragAndDropPage.getColumnHeader('column-a')).toBe('B');
        expect(await dragAndDropPage.getColumnHeader('column-b')).toBe('A');
    });

    test.skip('Should drag and drop using evaluate()',async()=>{
        await dragAndDropPage.dragUsingEvaluate();
        expect(await dragAndDropPage.getColumnHeader('column-a')).toBe('B');
        expect(await dragAndDropPage.getColumnHeader('column-b')).toBe('A');
    });

    test.skip('Should drag and drop using dispatchEvent()',async()=>{
        await dragAndDropPage.dragUsingDispatchEvent();
        expect(await dragAndDropPage.getColumnHeader('column-a')).toBe('B');
        expect(await dragAndDropPage.getColumnHeader('column-b')).toBe('A');
    });

    test('Should drag and drop using hover() and mouse events',async()=>{
        await dragAndDropPage.drapUsingHoverAndMouse();
        expect(await dragAndDropPage.getColumnHeader('column-a')).toBe('B');
        expect(await dragAndDropPage.getColumnHeader('column-b')).toBe('A');
    });

    test.afterAll(async()=>{
        await dragAndDropPage.page.close();
    })
})