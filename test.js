import ProductManager from './managers/productManager.js';

const productManager = new ProductManager();

(async () => {
  const products = await productManager.getProducts();
  console.log(products);
})();
