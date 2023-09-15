class LoginPage {
    get usernameInput() { return $('#user-name'); }
    get passwordInput() { return $('#password'); }
    get loginButton() { return $('.btn_action'); }

    async open() {
        await browser.url('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }
}

export default new LoginPage();