import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Sauce Demo Login Test', () => {
    it('should enter a valid username', async () => {
        await LoginPage.open();
        await LoginPage.usernameInput.setValue('standard_user');
        await expect(LoginPage.usernameInput).toHaveValue('standard_user');
    });

    it('should enter a valid password', async () => {
        await LoginPage.passwordInput.setValue('secret_sauce');
        await expect(LoginPage.passwordInput).toHaveValue('secret_sauce');
        await expect(LoginPage.passwordInput).toHaveAttribute('type', 'password');
    });

    it('should click Login and redirect to the inventory page', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.inventoryList).toBeDisplayed();
    });
});
