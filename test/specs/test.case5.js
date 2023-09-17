import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
let addedProduct = null;

describe('Sauce Demo Inventory Test', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(inventoryPage.inventoryList).toBeDisplayed();
    });

    it('should add a product to cart and validate the cart count', async () => {
        const allProducts = await inventoryPage.getProductList();
        addedProduct = allProducts[0];  
        await inventoryPage.addToCart(0);
        const counter = await inventoryPage.cartCounter.getText();
        expect(counter).toBe('1');
    });

    it('should open the burger menu', async () => {
        await inventoryPage.openBurgerMenu();
        const menuItems = await $$('.bm-item-list a');
        expect(menuItems).toHaveLength(4);
    });

    it('should logout and redirect to the login page', async () => {
        await inventoryPage.logout();
        await expect(loginPage.usernameInput).toBeDisplayed();
        await expect(loginPage.usernameInput).toHaveValue('');
        await expect(loginPage.passwordInput).toHaveValue('');
    });

    it('should login again and validate the cart', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(inventoryPage.inventoryList).toBeDisplayed();
        const counter = await inventoryPage.cartCounter.getText();
        expect(counter).toBe('1');
    });

    it('should validate the cart page and products', async () => {
        await inventoryPage.openCart();
        const cartTitle = await $('.header_secondary_container .title').getText();
        expect(cartTitle).toBe('Your Cart');
        const cartProducts = await inventoryPage.getProductList('.cart_item');
        expect(cartProducts).toEqual([addedProduct]);
    });
});