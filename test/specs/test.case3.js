import LoginPage from '../pageobjects/login.page.js';

describe('Sauce Demo Login Test for Invalid Username', () => {
    it('should enter an invalid username', async () => {
        await LoginPage.open();
        const randomUsername = 'standarD_user';
        await LoginPage.usernameInput.setValue(randomUsername);
        await expect(LoginPage.usernameInput).toHaveValue(randomUsername);
    });

    it('should enter a valid password', async () => {
        await LoginPage.passwordInput.setValue('secret_sauce');
        await expect(LoginPage.passwordInput).toHaveAttribute('type', 'password');
    });

    it('should click Login and show error messages', async () => {
        await LoginPage.loginButton.click();
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
