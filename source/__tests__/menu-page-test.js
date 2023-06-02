/**
 * @file Contains puppeteer tests for the menu page of the web app
 * @author Abijit Jayachandran
 */

describe('Basic user flow for Menu Page', () => {

    beforeAll(async () => {
        //Note this is a personal Live Server link. So, it may not work in general. 
        console.log("Menu page tests...")
        await page.goto('http://127.0.0.1:8000/source/prototyping/menu-prototype.html');
    });

    test("Check if back button takes you back to landing page on click", async () => {
        console.log("Checking if back button takes you back to landing page on click...")
        const button = await page.$('#back'); 
        //console.log(await(await button.getProperty('innerText')).jsonValue())
        await button.click(); 
        await page.waitForNavigation(); 

        const page2URL = await page.url(); 
        //console.log(page2URL); 
        const page2Title = await page.title(); 
        //console.log(page2Title);

        expect(page2Title).toBe('The Fortune Hut'); 
        expect(page2URL).toBe('http://127.0.0.1:8000/source/prototyping/landing-prototype.html'); 
    });

    test("Check if saved readings button takes you to the saved readings page on click", async () => {
        console.log("Checking if saved readings button takes you to the saved readings page on click...")

        const button = await page.$('#savedReadings'); 
        await button.click(); 
        await page.waitForNavigation(); 

        const page2URL = await page.url(); 
        console.log(page2URL); 
        const page2Title = await page.title(); 
        console.log(page2Title);

        expect(page2Title).toBe('The Fortune Hut'); 
        expect(page2URL).toBe('http://127.0.0.1:8000/source/prototyping/saved-readings-prototype.html'); 
    });

    test("Check if all the category buttons take you to the card reading page on click", async () => {
        console.log("Checking if all category buttons take you to the card reading page on click...")

        const buttons = await page.$('categoryButton').toArray(); 

        for(let i = 0; i < buttons.length; i++){
            await button.click(); 
            await page.waitForNavigation(); 
    
            const page2URL = await page.url(); 
            //console.log(page2URL); 
            const page2Title = await page.title(); 
            //console.log(page2Title);
    
            expect(page2Title).toBe('The Fortune Hut'); 
            expect(page2URL).toBe('http://127.0.0.1:8000/source/prototyping/card-prototype.html'); 
        }        
    });
});
