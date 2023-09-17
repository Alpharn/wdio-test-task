import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Sauce Demo Inventory Test', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(inventoryPage.inventoryList).toBeDisplayed();
    });

    it('should open the burger menu', async () => {
        await inventoryPage.openBurgerMenu();
        const menuItems = await $$('.bm-item-list a');
        expect(menuItems).toHaveLength(4);
    });

    it('should logout and redirect to the login page', async () => {
        await inventoryPage.logout();
        await expect(loginPage.usernameInput).toBeDisplayed();
        await expect(loginPage.usernameInput).toHaveValue('');
        await expect(loginPage.passwordInput).toHaveValue('');
    });
});