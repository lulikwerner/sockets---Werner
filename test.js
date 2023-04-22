addCart = async ({ cid, pcart }) => {
    try {
      const carts = await this.getCarts();
      const existingProductIndex = carts.findIndex(cart => cart.pid === pcart.pid);
  
      if (existingProductIndex !== -1) {
        const existingProduct = carts[existingProductIndex];
        const totalQuantity = existingProduct.quantity + pcart.quantity;
        const inventory = await getInventory(pcart.pid); // suponiendo que haya una función `getInventory` que obtenga la cantidad disponible del inventario
        if (totalQuantity > inventory) {
          throw new Error(`No hay suficientes existencias para el producto ${pcart.pid}`);
        } else {
          existingProduct.quantity += pcart.quantity;
          await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
          return existingProduct;
        }
      } else {
        if (carts.length === 0) {
          pcart.cid = 1;
        } else {
          pcart.cid = carts[carts.length - 1].cid + 1;
        }
        carts.push(pcart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return pcart;
      }
    } catch (err) {
      console.log(err);
    }
  }
  