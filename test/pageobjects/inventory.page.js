import Page from './page.js';

class InventoryPage extends Page {
    get inventoryList() { return $('.inventory_list'); }
    get burgerButton() { return $('#react-burger-menu-btn'); }
    get logoutButton() { return $('#logout_sidebar_link'); }
    get addToCartButton() { return $('button[data-test="add-to-cart-sauce-labs-backpack"]'); }
    get cartCounter() { return $('.shopping_cart_badge'); }
    get cartButton() { return $('.shopping_cart_link'); }
    get sortingDropdown() { return $('select[data-test="product_sort_container"]'); }
    get productList() { return $$('.inventory_item'); } 

    async openBurgerMenu() {
        await this.burgerButton.click();
    }
    async logout() {
        await this.logoutButton.click();
    }
    async addToCart(productIndex = 0) {
        const items = await this.productList;
        const item = items[productIndex];
        const addToCartButton = await item.$('button');
        await addToCartButton.click();
    }
    async openCart() {
        await this.cartButton.click();
    } 
    async selectSortingOption(option) {
        await this.sortingDropdown.selectByVisibleText(option);
    }
    async getProductList(selector = '.inventory_item') {
        return super.getProductList(selector);
    }
    
}
export default new InventoryPage();