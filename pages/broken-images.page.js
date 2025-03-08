///<reference types="playwright"/>

// Page Object Model class for Broken Images Page
export default class BrokenImagesPage {
    constructor(page) {
        this.page = page;
        this.heading = page.locator('h3'); 
        this.images = page.locator('.example img'); 
    }

    // Navigates to the Broken Images page
    async goto() {
        await this.page.goto('/broken_images'); // Uses the baseURL from Playwright config
        console.log(this.page.context()._options.baseURL); 
    }

    // Returns the text content of the heading
    async getHeadingText() {
        return await this.heading.textContent();
    }

    // Returns the count of all images present on the page
    async getImageCount() {
        return await this.images.count();
    }

    // Identifies broken images on the page
    async getBrokenImages() {
        const brokenImages = []; // Array to store broken image locators
        const imageCount = await this.getImageCount(); // Get the total number of images

        // Loop through all images on the page
        for (let i = 0; i < imageCount; i++) {
            const img = this.images.nth(i); // Select each image using nth(i)

            // Check if the image is broken using JavaScript's Image() object
            const status = await img.evaluate(async (img) => {
                return new Promise((resolve) => {
                    const testImg = new Image(); // Create a new Image object
                    testImg.src = img.src; // Assign the src attribute from the existing image

                    testImg.onload = () => {
                        resolve(false); // If the image loads successfully, it's not broken
                    };
                    testImg.onerror = () => {
                        resolve(true); // If an error occurs, the image is broken
                    };
                });
            });

            // If status is true (broken), add the image to the brokenImages array
            if (status) {
                brokenImages.push(img);
            }
        }

        return brokenImages; // Return the array of broken images
    }
}
