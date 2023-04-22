import { Router } from 'express';
import cartManager from '../../managers/cartManager.js';


const router = Router();
const CartManager = new cartManager();




router.get('/:cid', async (req, res) => {

    const { cid } = req.params
    if (isNaN(cid)) return res.status(400).send({ status: 'error', message: 'Please enter a valid id' });
    try {
        const resultCart = await CartManager.getCartsById(Number(cid))

        if (!resultCart) return res.status(400).send({ status: 'error', message: 'Cart not found' })
        return res.status(200).send({ resultCart });
    } catch (error) {
        console.log(error)
    }
});

router.post('/', async (req, res) => {
    try {
        const cart = req.body
        console.log(cart)
        if (!cart.pid || !cart.qty) {
            return console.log('Error! one or more fields are incomplete');
        }
        const addedCart = await CartManager.addCart(cart);
        console.log(addedCart)
        if (!addedCart) return res.status(400).send({ status: 'error', message: 'Product not found' });
        return res.status(200).send({ addedCart });

    }
    catch (err) {
        console.log(err);
    }

});
router.post('/:cid/product/:pid', async (req, res) => {

    try {
        const { pcart } = req.body;
        const { cid, pid } = req.params;
        //pcart[0] es la cantidad del producto que quiero agregar
        console.log((pcart[0].qty))
        //traigo el cart por el id
        const cart = await CartManager.getCartsById(parseInt(cid));
        //Busco por index el producto que quiero agregar o actualizar sus cantidades
        const index = cart.pcart.findIndex(product => product.pid == pid);
        //Si lo encuentra en el carrito sumo la cantidad del producto que ya esta en el carrito con la nueva cantidad que le estoy pasando
            if (index !== -1){ cart.pcart[index].qty += Number(pcart[0].qty);
        //Si el producto no se encuentra en el carrito hago un push del producto con su cantidad
             } else{cart.pcart.push({ pid: Number(pid), qty: Number(pcart[0].qty) });}
        //Hago el update del producto    
            await CartManager.updateCart(cid, cart);
            return res.status(200).send({ status: 'success', message: 'producto agregado' });
      


    } catch (error) {
        return res.status(400).send({ status: 'failed', message: 'Cart not found'});
    }
});


export default router;