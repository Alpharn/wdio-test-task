import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js'; 

describe('Sauce Demo Shopping Test', () => {
  before(async () => {
      await LoginPage.open();
      await LoginPage.login('standard_user', 'secret_sauce');
      await expect(InventoryPage.inventoryList).toBeDisplayed();
  });

  it('should display "Cart is empty" message when trying to checkout an empty cart', async () => {
    await InventoryPage.openCart();
    await CartPage.clickCheckout();
    // Check that the "Cart is empty" message is displayed (assuming it should be)
    const isErrorMessageDisplayed = await CartPage.isErrorMessageDisplayed('Cart is empty');
    expect(isErrorMessageDisplayed).toBe(true);    
    //Additionally: check that the user remains on the cart page
    const isOnCartPage = await CartPage.checkoutButton.isDisplayed();
    expect(isOnCartPage).toBe(true);
  });
});