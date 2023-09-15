import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Sauce Demo Social Media Navigation Test', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.inventoryList).toBeDisplayed();
    });

    it('should navigate to Twitter when Twitter icon is clicked', async () => {
        const twitterIcon = await $('.social_twitter');
        await twitterIcon.click();
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        const url = await browser.getUrl();
        expect(url).toContain('https://twitter.com/saucelabs');
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    });

    it('should navigate to Facebook when Facebook icon is clicked', async () => {
        const facebookIcon = await $('.social_facebook'); 
        await facebookIcon.click();
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        const url = await browser.getUrl();
        expect(url).toContain('https://www.facebook.com/saucelabs');
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);;
    });

    it('should navigate to LinkedIn when LinkedIn icon is clicked', async () => {
        const linkedinIcon = await $('.social_linkedin');
        await linkedinIcon.click();
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[1]);
        const url = await browser.getUrl();
        expect(url).toContain('https://www.linkedin.com/company/sauce-labs/');
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    });
});