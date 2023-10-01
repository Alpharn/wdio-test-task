class LoginPage {
    get usernameInput() { return $('#user-name'); }
    get passwordInput() { return $('#password'); }
    get loginButton() { return $('.btn_action'); }
    get errorMessage() { return $('.error-message-container'); }
    get loginFieldError() { return $('.error_icon'); }
    get passwordFieldError() { return $('.error_icon'); }
    get loginErrorHighlight() { return $('#user-name.input_error.error'); }
    get passwordErrorHighlight() { return $('#password.input_error.error'); }

    async open() {
        await browser.url('https://www.saucedemo.com/');
    }
    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
    async hasErrorMessage(text) {
        return this.errorMessage.getText() === text;
    }
    async isLoginFieldErrorDisplayed() {
        return this.loginFieldError.isDisplayed();
    }
    async isPasswordFieldErrorDisplayed() {
        return this.passwordFieldError.isDisplayed();
    }
    async isLoginErrorHighlighted() {
        return this.loginErrorHighlight.isDisplayed();
    }
    async isPasswordErrorHighlighted() {
        return this.passwordErrorHighlight.isDisplayed();
    }
}

export default new LoginPage();