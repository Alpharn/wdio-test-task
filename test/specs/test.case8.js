import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js'; 
import checkoutPage from '../pageobjects/checkout.page.js';
import overviewPage from '../pageobjects/overview.page.js';
import completePage from '../pageobjects/complete.page.js';

let addedProduct = null;

describe('Sauce Demo Shopping Test', () => {
  before(async () => {
      await loginPage.open();
      await loginPage.login('standard_user', 'secret_sauce');
      await expect(inventoryPage.inventoryList).toBeDisplayed();
  });

  it('should add a product to the cart', async () => {
      const allProducts = await inventoryPage.getProductList();
      addedProduct = allProducts[0];
      await inventoryPage.addToCart(0);
      await expect(inventoryPage.cartCounter).toHaveTextContaining('1');
  });

  it('should navigate to the Cart page', async () => {
      await inventoryPage.openCart();
      const productsInCart = await cartPage.getProductListInCart();
      expect(productsInCart).toEqual([addedProduct]);
  });

  it('should proceed to checkout', async () => {
      await cartPage.clickCheckout();
  });

  it('should fill in the checkout form', async () => {
      await checkoutPage.fillFirstName('John');
      await checkoutPage.fillLastName('Doe');
      await checkoutPage.fillPostalCode('12345');
  });

  it('should continue to the Overview Page', async () => {
      await checkoutPage.clickContinue();
      const overviewProducts = await overviewPage.getProductList();
      expect(overviewProducts).toEqual([addedProduct]);
  });

  it('should complete the order', async () => {
      await overviewPage.clickFinish();
      await expect(completePage.thankYouMessage).toBeDisplayed();
  });

  it('should go back to the inventory page and validate', async () => {
      await completePage.clickBackHome();
      await expect(inventoryPage.inventoryList).toBeDisplayed();
      const isCounterDisplayed = await inventoryPage.cartCounter.isDisplayed()
      if (isCounterDisplayed) {
          const counter = await inventoryPage.cartCounter.getText();
          expect(counter).toBe('');
      }
  });
});