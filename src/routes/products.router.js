import { Router } from 'express';
import productManager from '../../managers/productManager.js';


const ProductManager = new productManager();

const router = Router();
router.get('/',async (req,res)=>{
    try {
      const products = await ProductManager.getProducts();
      console.log(products)
      res.render('home', { products });
    } catch (error) {
      console.error(error);
      res.render('error', { error });
    }
  })



/*router.get('/home', async (req, res) => {
    try {
         //Traigo todos los productos si no me envian ningun limit
         /*const products = await ProductManager.getProducts();
         console.log(products)
        
         if (products.error) return res.status(200).send({ status: 'Sin productos', valueReturned })*/
      



/*router.get('/', async (req, res) => {
    const { limit } = req.query;
    try {
        //Traigo todos los productos si no me envian ningun limit
        const products = await ProductManager.getProducts();
        //Si no me envian un numero envio mensaje de error
        if (isNaN(limit)) return res.status(400).send({ status: 'error', message: 'Please enter a valid amount' });
        if (!limit) return res.status(200).send({ products });
        //Si me envian un limit hago slice del array por el limite enviado y traigo solo esos productos
        const limitedProducts = products.slice(0, limit);
        return res.status(200).send({ limitedProducts });
     
    }
    catch (error) {
        console.log(error)
    }
});


router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const result = await ProductManager.getProductsById(Number(pid))
        //Si no me envian un numero envio mensaje de error
        if (isNaN(pid)) return res.status(400).send({ status: 'error', message: 'Please enter a valid id' });
        // Si no encuentro el id enviado en el array arrojo producto no encontrado
        if (!result) return res.status(400).send({ status: 'error', message: 'Product not found' })
        //Si lo encuentro devuelvo la informacion del producto solicitado
        return res.status(200).send({ result });
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category } = req.body;
    try {
        //Si no me envian alguno de estos campos a excepcion de thumbnails(que no es obligatorio) arrojo error
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
        //Agrego el producto con la informacion enviada
        const addedProduct = await ProductManager.addProducts(product);
        //Si no encuentra el producto a modificar envio un error
        if (!addedProduct) return res.status(400).send({ status: 'error', message: 'Product not found' });
        //Devuelo el producto agregado
        return res.status(200).send({ addedProduct });
    } catch (error) {
        console.log(error);
    }
});


router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const productUpdate = req.body;
    try {
        const updateProduct = await ProductManager.updateProduct(pid, productUpdate);
        //Si Modifico algo retorno que el producto fue modificado con exito
        if (updateProduct) return res.status(200).send({ status: "success", message: `The product with id ${pid} has been succesfully updated` });
        //Sino devuelvot que no se pudo modifica
        return res.status(400).send({ error: "Update product failed" });
        
    }
    catch (error) {
        console.log(error);
    }

});


router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const resultDelete = await ProductManager.deleteProduct(pid)
        //Busco el id del producto a eliminar si no lo encuentro devuelvo error sino devuelvo producto eliminado
        if (!resultDelete) return res.status(400).send({ status: 'error', message: 'Product not found' })
        return res.status(200).send({ status: 'success', message: { resultDelete } });
    }
    catch (error) {
        console.log(error);
    }
});*/



export default router;