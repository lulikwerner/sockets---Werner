import { Router } from 'express';
import productManager from '../../managers/productManager.js';


const router = Router();
const ProductManager = new productManager();


router.get('/', async (req, res) => {
    const { limit } = req.query;
    const products = await ProductManager.getProducts();
    if (!limit) return res.status(200).send({ products });
    const limitedProducts = products.slice(0, limit);
    if (isNaN(limit)) return res.status(400).send({ status: 'error', message: 'Please enter a valid amount' });
    return res.status(200).send({ limitedProducts });
   
});



router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    const result = await ProductManager.getProductsById(Number(pid))
    if (isNaN(pid)) return res.status(400).send({ status: 'error', message: 'Please enter a valid id' });
    if (!result) return res.status(400).send({ status: 'error', message: 'Product not found' })

    return res.status(200).send({ result });
})

router.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category,  } = req.body;
    try {
       
        if (!title || !description || !code || !price || !status || !stock || !category) {
            return res.status(400).send({ status: "error", message: "One or more fields are incomplete" });
        }
        const product = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            code: req.body.code,
            price: req.body.price,
            status: true,
            stock: req.body.stock,
            category: req.body.category,
            thumbnails: req.body.thumbnails,
        }
        const addedProduct = await ProductManager.addProducts(product);
        if (!addedProduct) return res.status(400).send({ status: 'error', message: 'Product not found' });
        return res.status(200).send( { addedProduct } );
    } catch (error) {
        console.log(error);
    }
});


router.put('/:pid', async (req, res) => {
    try {
        // Datos obtenidos desde el cliente
        const { pid } = req.params
        const productUpdate = req.body

        const updateProduct = await ProductManager.updateProduct(pid, productUpdate)
        if (!updateProduct) return res.status(200).send({ status: "success", message: `The product with id ${pid} has been succesfully updated`})
        if (updateProduct.error) return res.status(400).send({ error:"Update product failed" })
        res.send({ updateProduct })
    }
    catch (err) {
        console.log(err);
    }

});


router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const resultDelete = await ProductManager.deleteProduct(pid)
        console.log(resultDelete)
        if (!resultDelete) return res.status(400).send({ status: 'error', message: 'Product not found' })
        return res.status(200).send({ status: 'success', message: {resultDelete} });
    }
    catch (err) {
        console.log(err);
    }
});



export default router;