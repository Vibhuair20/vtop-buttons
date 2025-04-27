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

    // i have made the first function that will submit the form 
    await page.waitForNavigation();

    // now the second will fill in my login page form and also fill in the captcha for the box and click the login button

    // step1: fill in the information for the username

    selector = "input[id='username']"
    await page.waitForSelector(selector);
    await page.type(selector, "VIBHUAIR204")

    selector = "input[id='password']"
    await page.type(selector, "Gulabsadan204")
    
    let select = "button[id='submitBtn']"

   await  page.waitForSelector(select);

   await page.evaluate((select)=>{
    document.querySelector(select).click();
   }, select)
}

run(); 