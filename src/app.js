
//El servidor debe contar con los siguientes endpoints:
//ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
//Si no se recibe query de límite, se devolverán todos los productos
//Si se recibe un límite, sólo devolver el número de productos solicitados
//ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 
import express from 'express';
import ProductManager from '../managers/productManager.js';


const app =express();
const productManager = new ProductManager();
app.get('/products/',async(req,res)  =>{
    const { limit } = req.query;
    const products = await productManager.getProducts();
    if (!limit) return res.status(200).send({ products });
    const limitedProducts = products.slice(0,limit);
    if(isNaN(limit)) return res.status(400).send({ status: 'error', message: 'Please enter a valid amount' });
    return res.status(200).send({limitedProducts});
});





app.get('/products/:pid',async(req,res)=>{
    const { pid } = req.params
    const result = await productManager.getProductsById(Number(pid))
    if(isNaN(pid)) return res.status(400).send({ status: 'error', message: 'Please enter a valid id' });
    if(!result) return res.status(400).send({status: 'error', message:'Product not found'})
    
    return res.status(200).send({result});
})


app.listen(8080,()=>console.log('Listening on Port 8080'))

    