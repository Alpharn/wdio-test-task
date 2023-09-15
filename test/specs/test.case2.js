import LoginPage from '../pageobjects/login.page.js';

describe('Sauce Demo Login Test for Invalid Password', () => {
    it('should enter a valid username', async () => {
        await LoginPage.open();
        await LoginPage.usernameInput.setValue('standard_user');
        await expect(LoginPage.usernameInput).toHaveValue('standard_user');
    });

    it('should enter an invalid password', async () => {
        const randomPassword = Math.random().toString(36).substring(7);
        await LoginPage.passwordInput.setValue(randomPassword);
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