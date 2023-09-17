import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Sauce Demo Login Test', () => {
    it('should enter a valid username', async () => {
        await loginPage.open();
        await loginPage.usernameInput.setValue('standard_user');
        await expect(loginPage.usernameInput).toHaveValue('standard_user');
    });

    it('should enter a valid password', async () => {
        await loginPage.passwordInput.setValue('secret_sauce');
        await expect(loginPage.passwordInput).toHaveValue('secret_sauce');
        await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    });

    it('should click Login and redirect to the inventory page', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(inventoryPage.inventoryList).toBeDisplayed();
    });
});