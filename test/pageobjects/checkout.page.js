class CheckoutPage {
    get firstNameField() { return $('#first-name'); }
    get lastNameField() { return $('#last-name'); }
    get postalCodeField() { return $('#postal-code'); }
    get continueButton() { return $('#continue'); }

    async fillFirstName(firstName) {
        await this.firstNameField.setValue(firstName);
    }
    async fillLastName(lastName) {
        await this.lastNameField.setValue(lastName);
    }
    async fillPostalCode(postalCode) {
        await this.postalCodeField.setValue(postalCode);
    }
    async clickContinue() {
        await this.continueButton.click();
    }
    async isDisplayed() {
        return await this.firstNameField.isDisplayed();
    }
}

export default new CheckoutPage();