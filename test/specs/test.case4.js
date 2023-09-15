import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Sauce Demo Inventory Test', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.inventoryList).toBeDisplayed();
    });

    it('should open the burger menu', async () => {
        await InventoryPage.openBurgerMenu();
        const menuItems = await $$('.bm-item-list a');
        expect(menuItems).toHaveLength(4);
    });

    it('should logout and redirect to the login page', async () => {
        await InventoryPage.logout();
        await expect(LoginPage.usernameInput).toBeDisplayed();
        await expect(LoginPage.usernameInput).toHaveValue('');
        await expect(LoginPage.passwordInput).toHaveValue('');
    });
});