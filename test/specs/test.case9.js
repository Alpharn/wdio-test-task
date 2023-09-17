import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js'; 

describe('Sauce Demo Shopping Test', () => {
  before(async () => {
      await loginPage.open();
      await loginPage.login('standard_user', 'secret_sauce');
      await expect(inventoryPage.inventoryList).toBeDisplayed();
  });

  it('should display "Cart is empty" message when trying to checkout an empty cart', async () => {
    await inventoryPage.openCart();
    await cartPage.clickCheckout();
    // Check that the "Cart is empty" message is displayed (assuming it should be)
    const isErrorMessageDisplayed = await cartPage.isErrorMessageDisplayed('Cart is empty');
    expect(isErrorMessageDisplayed).toBe(true);    
    //Additionally: check that the user remains on the cart page
    const isOnCartPage = await cartPage.checkoutButton.isDisplayed();
    expect(isOnCartPage).toBe(true);
  });
});