import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
let addedProduct = null;

describe('Sauce Demo Inventory Test', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.inventoryList).toBeDisplayed();
    });

    it('should add a product to cart and validate the cart count', async () => {
        const allProducts = await InventoryPage.getProductList();
        addedProduct = allProducts[0];  
        await InventoryPage.addToCart(0);
        const counter = await InventoryPage.cartCounter.getText();
        expect(counter).toBe('1');
    });

    it('should open the burger menu', async () => {
        await InventoryPage.openBurgerMenu();
        const menuItems = await $$('.bm-item-list a');
        expect(menuItems).toHaveLength(4);
    });

    it('should logout and redirect to the login page', async () => {
        await InventoryPage.logout();
        await expect(LoginPage.usernameInput).toBeDisplayed();
        await expect(LoginPage.usernameInput).toHaveValue('');
        await expect(LoginPage.passwordInput).toHaveValue('');
    });

    it('should login again and validate the cart', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(InventoryPage.inventoryList).toBeDisplayed();
        const counter = await InventoryPage.cartCounter.getText();
        expect(counter).toBe('1');
    });

    it('should validate the cart page and products', async () => {
        await InventoryPage.openCart();
        const cartTitle = await $('.header_secondary_container .title').getText();
        expect(cartTitle).toBe('Your Cart');
        const cartProducts = await InventoryPage.getProductList('.cart_item');
        expect(cartProducts).toEqual([addedProduct]);
    });
});