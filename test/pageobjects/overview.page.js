import Page from './page.js';

class OverviewPage extends Page {
    get productNames() { return $$('.cart_item_label'); }
    get finishButton() { return $('#finish'); }

    async clickFinish() {
        await this.finishButton.click();
    }
    async getProductList() {
        return super.getProductList('.cart_item');
    }
}

export default new OverviewPage();