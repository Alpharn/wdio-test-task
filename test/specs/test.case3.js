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
        const errorMessage = await $('.error-message-container');
        const loginFieldError = await $('.error_icon');
        const passwordFieldError = await $('.error_icon');
        const loginErrorHighlight = $('#user-name.input_error.error');
        const passwordErrorHighlight = $('#password.input_error.error');
        await expect(errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
        await expect(loginFieldError).toBeDisplayed();
        await expect(passwordFieldError).toBeDisplayed();
        await expect(loginErrorHighlight).toBeDisplayed();
        await expect(passwordErrorHighlight).toBeDisplayed();
    });
});
