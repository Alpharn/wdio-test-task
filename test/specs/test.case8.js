import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js'; 
import CheckoutPage from '../pageobjects/checkout.page.js';
import OverviewPage from '../pageobjects/overview.page.js';
import CompletePage from '../pageobjects/complete.page.js';

let addedProduct = null;

describe('Sauce Demo Shopping Test', () => {
  before(async () => {
      await LoginPage.open();
      await LoginPage.login('standard_user', 'secret_sauce');
      await expect(InventoryPage.inventoryList).toBeDisplayed();
  });

  it('should add a product to the cart', async () => {
      const allProducts = await InventoryPage.getProductList();
      addedProduct = allProducts[0];
      await InventoryPage.addToCart(0);
      await expect(InventoryPage.cartCounter).toHaveTextContaining('1');
  });

  it('should navigate to the Cart page', async () => {
      await InventoryPage.openCart();
      const productsInCart = await CartPage.getProductListInCart();
      expect(productsInCart).toEqual([addedProduct]);
  });

  it('should proceed to checkout', async () => {
      await CartPage.clickCheckout();
  });

  it('should fill in the checkout form', async () => {
      await CheckoutPage.fillFirstName('John');
      await CheckoutPage.fillLastName('Doe');
      await CheckoutPage.fillPostalCode('12345');
  });

  it('should continue to the Overview Page', async () => {
      await CheckoutPage.clickContinue();
      const overviewProducts = await OverviewPage.getProductList();
      expect(overviewProducts).toEqual([addedProduct]);
  });

  it('should complete the order', async () => {
      await OverviewPage.clickFinish();
      await expect(CompletePage.thankYouMessage).toBeDisplayed();
  });

  it('should go back to the inventory page and validate', async () => {
      await CompletePage.clickBackHome();
      await expect(InventoryPage.inventoryList).toBeDisplayed();
      const isCounterDisplayed = await InventoryPage.cartCounter.isDisplayed()
      if (isCounterDisplayed) {
          const counter = await InventoryPage.cartCounter.getText();
          expect(counter).toBe('');
      }
  });
});