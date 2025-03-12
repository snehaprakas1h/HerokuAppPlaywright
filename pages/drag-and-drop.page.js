///<reference types ="playwright"/>


export default class DragAndDropPage {
    constructor(page) {
        this.page = page;
        this.heading = page.locator('h3');
        this.source = page.locator('#column-a');
        this.target = page.locator('#column-b');
    }

    async goto(){
        await this.page.goto('/drag_and_drop');
    }

    async getHeadingText(){
        return await this.heading.textContent();
    }

    async dragUsingDragTo(){
        await this.source.dragTo(this.target);
    }

    async dragUsingMouse(){
        const sourceBox = await this.source.boundingBox();
        const targetBox = await this.target.boundingBox();

        if(sourceBox && targetBox){
            await this.page.mouse.move(sourceBox.x + sourceBox.width/2, sourceBox.y+sourceBox.height /2);
            await this.page.mouse.down();

            await this.page.mouse.move(targetBox.x+targetBox.width/2,targetBox.y+targetBox.height/2);
            await this.page.mouse.up();  
        }
    }

    async dragUsingEvaluate() {
        await this.page.evaluate(() => {
            const source = document.getElementById('column-a');
            const target = document.getElementById('column-b');
    
            const dragStartEvent = new DragEvent('dragstart', { bubbles: true });
            source.dispatchEvent(dragStartEvent);
    
            const dragEnterEvent = new DragEvent('dragenter', { bubbles: true });
            target.dispatchEvent(dragEnterEvent);
    
            const dragOverEvent = new DragEvent('dragover', { bubbles: true });
            target.dispatchEvent(dragOverEvent);
    
            const dropEvent = new DragEvent('drop', { bubbles: true });
            target.dispatchEvent(dropEvent);
    
            const dragEndEvent = new DragEvent('dragend', { bubbles: true });
            source.dispatchEvent(dragEndEvent);
        });
    }
    

    async dragUsingDispatchEvent() {
        await this.page.dispatchEvent('#column-a', 'dragstart');
        await this.page.dispatchEvent('#column-b', 'dragenter');
        await this.page.dispatchEvent('#column-b', 'dragover');
        await this.page.dispatchEvent('#column-b', 'drop');
        await this.page.dispatchEvent('#column-a', 'dragend');
    }
    

    async drapUsingHoverAndMouse(){
        await this.source.hover();
        await this.page.mouse.down();
        await this.target.hover();
        await this.page.mouse.up();
    }

    async getColumnHeader(columnId){
        return await this.page.locator(`#${columnId} header`).textContent();
    }


}












