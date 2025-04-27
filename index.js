const puppeteer = require('puppeteer-extra')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// the first step to click the form submission is done 
// now need to figure out what to do after that and how to do that

async function run(){   
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

    await page.goto("https://vtop.vit.ac.in/vtop/login")

    let selector = "form[id='stdForm']";

    await page.waitForSelector(selector);
    await page.evaluate((selector) =>{
        document.querySelector(selector).submit();
    }, selector)

    // const pageNew = await browser.newPage();
    // await pageNew.goto(page)

    // second step done now i have done with the login button 
    // now i have to deal with the timings
    // how to deal with timings?


    await page.waitForNavigation();

    
    
    let select = "button[id='submitBtn']"

   await  page.waitForSelector(select);
   await page.evaluate((select)=>{
    document.querySelector(select).click();
   }, select)
}

run(); 