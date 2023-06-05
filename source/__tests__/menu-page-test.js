/**
 * @file Contains puppeteer E2E tests for the menu page of the web app - Last Modified: 06/04/2023
 * @author Abijit Jayachandran
 */

describe('Basic user flow for Menu Page', () => {

    beforeAll(async () => { 
        console.log("Menu page tests starting...");
        //await page.goto('http://127.0.0.1:8000/source/prototyping/menu-prototype.html');
    });

    beforeEach(async () => {
        await page.goto('http://127.0.0.1:8000/source/prototyping/menu-prototype.html');
    });

    test("Check if all buttons show hover animation", async () => {
        const buttons = await page.$$('button');
        console.log(buttons.length);

        prevBoxShadows = page.$$('button', el => {
            return getComputedStyle(el).getPropertyValue('box-shadow');
        }); 
        
        for(let i = 0; i < buttons.length; i++){

            console.log("Before hover..."); 
            console.log(prevBoxShadow); 

            const button = await page.$('button'); 
            await button.hover();

            const newBoxShadow = await page.$eval('button', el => {
                return getComputedStyle(el).getPropertyValue('background-color');
            }); 
        
            console.log("After hover...");
            console.log(newBoxShadow);

            expect(prevBoxShadow).not.toMatch(newBoxShadow); 
        }
    });

    test("Check if back button takes you back to landing page on click", async () => {
        console.log("Checking if back button takes you back to landing page on click...")
        const button = await page.$('#back'); 
        //console.log(await(await button.getProperty('innerText')).jsonValue());
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
        console.log("Checking if saved readings button takes you to the saved readings page on click...");

        const button = await page.$('#savedReadings'); 
        await button.click(); 
        await page.waitForNavigation(); 

        const page2URL = await page.url(); 
        //console.log(page2URL); 
        const page2Title = await page.title(); 
        //console.log(page2Title);

        expect(page2Title).toBe('This is the prototype history page'); 
        expect(page2URL).toBe('http://127.0.0.1:8000/source/prototyping/saved-readings-prototype.html'); 
    });

    test("Check if all the category buttons take you to the card reading page on click", async () => {
        console.log("Checking if all category buttons take you to the card reading page on click...");

        const button = await page.$('.categoryButton'); 

        await button.click(); 
        await page.waitForNavigation(); 

        const page2URL = await page.url(); 
        //console.log(page2URL); 
        const page2Title = await page.title(); 
        //console.log(page2Title);

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