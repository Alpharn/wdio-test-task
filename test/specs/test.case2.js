import loginPage from '../pageobjects/login.page.js';

describe('Sauce Demo Login Test for Invalid Password', () => {
    it('should enter a valid username', async () => {
        await loginPage.open();
        await loginPage.usernameInput.setValue('standard_user');
        await expect(loginPage.usernameInput).toHaveValue('standard_user');
    });

    it('should enter an invalid password', async () => {
        const randomPassword = Math.random().toString(36).substring(7);
        await loginPage.passwordInput.setValue(randomPassword);
        await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    });

    it('should click Login and show error messages', async () => {
        await loginPage.loginButton.click();
        await expect(loginPage.hasErrorMessage("Epic sadface: Username and password do not match any user in this service")).toBeTruthy();
        await expect(loginPage.isLoginFieldErrorDisplayed()).toBeTruthy();
        await expect(loginPage.isPasswordFieldErrorDisplayed()).toBeTruthy();
        await expect(loginPage.isLoginErrorHighlighted()).toBeTruthy();
        await expect(loginPage.isPasswordErrorHighlighted()).toBeTruthy();
    });
});