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

    // usernname filled and minimum length for the 10 characters
    // password filled and minimum length for the 10 chgaracters
    // after 2 seconds it will press login 

    await page.waitForNavigation();

    let username = await page.$eval("input[id='username']", el => el.value);
    let password = await page.$eval("input[id='password']", el => el.value);

    if((username.trim() !== "" && password.trim() === "") || username.trim()==="" && password.trim() !==""){
        console.log("either both username and password should be filled or both should be empty")
        await browser.close();
        return;
    }

    // if to maintain 10 character
    if(username.trim().length < 10 ||password.trim().length <10){
        console.log("username and passowrd is not right")
        await browser.close();
        return;
    }
    
    let select = "button[id='submitBtn']"

   await  page.waitForSelector(select);

   await page.evaluate((select)=>{
    document.querySelector(select).click();
   }, select)
}

run(); 