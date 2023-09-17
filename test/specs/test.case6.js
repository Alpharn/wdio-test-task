import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Sauce Demo Inventory Test', () => {
    before(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(inventoryPage.inventoryList).toBeDisplayed();
    });

    const sortingOptions = ['Price (low to high)', 'Price (high to low)', 'Name (A to Z)', 'Name (Z to A)'];
    sortingOptions.forEach((option) => {
        it(`should sort products by ${option}`, async () => {
            await inventoryPage.selectSortingOption(option);
            const products = await inventoryPage.getProductList();
            let sorted;
            switch (option) {
                case 'Price (low to high)':
                    sorted = [...products].sort((a, b) => a.price - b.price);
                    break;
                case 'Price (high to low)':
                    sorted = [...products].sort((a, b) => b.price - a.price);
                    break;
                case 'Name (A to Z)':
                    sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'Name (Z to A)':
                    sorted = [...products].sort((a, b) => b.name.localeCompare(a.name));
                    break;
            }
            expect(products).toEqual(sorted);
        });
    });
});