class CompletePage {
    get thankYouMessage() { return $('.complete-header'); }
    get backHomeButton() { return $('#back-to-products'); }

    async clickBackHome() {
        await this.backHomeButton.click();
    }
}

export default new CompletePage();