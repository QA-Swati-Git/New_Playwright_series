//const {test, expect}= require('@playwright/test');
import{test,expect} from '@playwright/test';

test('HomePage',async ({page})=>{
await page.goto('https://www.amazon.in');
const pageTitle=await page.title();
console.log("Page title is:"+pageTitle);
//await expect(page).toHaveTitle('STORE');

await expect(page).toHaveURL('https://www.amazon.in');
const pageURL=page.url();
console.log("Page url is:"+ pageURL);

await page.locator("//span[@id='nav-link-accountList-nav-line-1']").click();
//await expect(page.locator("///div[@class='a-box-inner a-padding-extra-large']").isVisible);
const Popuptitle = await page.locator("//h1[@class='a-spacing-small']").textContent();
console.log("Page title is:"+Popuptitle.trim());
expect(Popuptitle).toContain('Sign in');


await page.locator("//input[@id='ap_email']").fill("ranjanswati100@gmail.com");
await page.locator("//input[@id='continue']").click();

await page.locator("//input[@id='ap_password']").fill("Password@1989");
await page.locator("//input[@id='signInSubmit']").click();

const wlcm_text=await page.locator("//span[@id='nav-link-accountList-nav-line-1']").textContent();
expect(wlcm_text).toContain("Hello, swati");

await page.locator("//input[@id='twotabsearchtextbox']").fill("books");
await page.locator("//input[@id='nav-search-submit-button']").click();

//await page.locator("//div[@id='reviewsRefinements']//ul[2]");


let products= [
    "//li[@id='p_n_feature_three_browse-bin/9141482031']",
    "(//li[@id='p_n_feature_three_browse-bin/9141483031'])[1]"
];
for(const product of products)
{
    const productName= await page.locator(product).textContent();
    await page.locator(product).click();
    console.log(productName.trim());
}

const FilterResult= await page.locator("//span[@class='a-size-medium a-color-base a-text-normal']").textContent();
expect(FilterResult).toBe("World�s Greatest Books For Personal Growth & Wealth (Set of 4 Books) : Perfect Motivational Gift Set [Paperback] Dale Carnegie; Napoleon Hill; Dr. Joseph Murphy and George S. Clason");

page.waitForLoadState(5000);

await page.close();


})