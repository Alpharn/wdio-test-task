class Page {
    async getProductList(selector = '.cart_item') {
      const items = await $$(selector);
      const productData = [];
  
      for (let item of items) {
        const name = await item.$('.inventory_item_name').getText();
        const priceText = await item.$('.inventory_item_price').getText();
        const price = parseFloat(priceText.replace('$', ''));
        productData.push({ name, price });
      }
  
      return productData;
    }
  }
  
export default Page;