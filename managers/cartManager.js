import fs from 'fs';

export default class CartManager {

    constructor() {
        this.path = './files/Carts.json';

    }

    addCart = async ({ pid, qty }) => {
        try {
          const carts = await this.getCarts();
          const cid = carts.length > 0 ? carts[carts.length - 1].cid + 1 : 1;
          const newCart = { cid, pcart: {pid, qty}  };
            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            return newCart;
          
        } catch (err) {
          console.log(err);
        }
      }
      

    getCarts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const dataCart = await fs.promises.readFile(this.path, 'utf-8');
                const carts = JSON.parse(dataCart); //Lo convierto a objeto
                return carts;
            }
            return [];
        } catch (err) {
            console.log(err);
            return { status: "error", error: err }
        }
    };

    getCartsById = async (cid) => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(data);
            const cart = carts.find(c => c.cid === cid);
            if (!cart) {
                console.log(`The Cart with id ${cid} does not exist`);
                return null;
            }
            console.log(`The Cart with id ${cid} is: `, cart);
            return cart;
        } catch (error) {
            console.log('Error reading file:', error);
            return null;
        }
    }

    updateCart = async (cid, updatedCart) => {
      try {
        const data= await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(data);
          if (isNaN(Number(cid))) return { status: "error", message: 'It is not a valid id' };
          const cartIndex = carts.findIndex(c => c.cid === parseInt(cid));
          if (cartIndex === -1) {
            throw new Error(`We cannot make an update to the cart with id ${cid} because it does not exist`);
          }
          const cartToUpdate = { ...Number(carts[cartIndex]), ...updatedCart };
          carts[cartIndex] = cartToUpdate;
          await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
   
      }
      catch (err) {
          console.log(err);
      }

  }

}


 /*const carts = new CartManager()

 const cart = {
    pcart: [
      {
        pid: 1,
        qty: 2
      },
      {
        pid: 8,
        qty: 3
      }
    ]
  };
  await carts.addCart(cart);*/
  

