
import express from 'express';
import ProductManager from '../managers/productManager.js';


const app = express();


const productManager = new ProductManager();
app.get('/products/', async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    if (!limit) return res.status(200).send({ products });
    const limitedProducts = products.slice(0, limit);
    if (isNaN(limit)) return res.status(400).send({ status: 'error', message: 'Please enter a valid amount' });
    return res.status(200).send({ limitedProducts });
});



app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params
    const result = await productManager.getProductsById(Number(pid))
    if (isNaN(pid)) return res.status(400).send({ status: 'error', message: 'Please enter a valid id' });
    if (!result) return res.status(400).send({ status: 'error', message: 'Product not found' })

    return res.status(200).send({ result });
})


app.listen(8080, () => console.log('Listening on Port 8080'))

