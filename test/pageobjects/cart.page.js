import Page from './page.js';

class CartPage extends Page {
    get productNames() { return $$('.cart_item_label'); }
    get checkoutButton() { return $('button[data-test="checkout"]'); }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
    async getProductListInCart() {
        return super.getProductList('.cart_item');
    }
    async isErrorMessageDisplayed(expectedMessage) {
        const errorMessageElement = await $('.cart-empty-message');
        if (await errorMessageElement.isDisplayed()) {
          const actualMessage = await errorMessageElement.getText();
          return actualMessage === expectedMessage;
        }
        return false;
    }
}
const cartPage = new CartPage();
export default cartPage;