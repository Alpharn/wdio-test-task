import loginPage from '../pageobjects/login.page.js';

describe('Sauce Demo Login Test for Invalid Username', () => {
    it('should enter an invalid username', async () => {
        await loginPage.open();
        const randomUsername = 'standarD_user';
        await loginPage.usernameInput.setValue(randomUsername);
        await expect(loginPage.usernameInput).toHaveValue(randomUsername);
    });

    it('should enter a valid password', async () => {
        await loginPage.passwordInput.setValue('secret_sauce');
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
