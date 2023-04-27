import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars'
import cartRouter from './routes/carts.router.js';
import createFormRouter from './routes/createForm.routes.js'
import productsRouter from './routes/products.router.js';
import ProductManager from '../managers/productManager.js'
import __dirname from './utils.js';

const app = express();
const productManager = new ProductManager();

const server = app.listen(8080, () => console.log('Listening on Port 8080'));
const io = new Server(server);

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/realTimeProducts', createFormRouter)
app.use('/', productsRouter);


io.on('connection', async socket => {
    console.log('New client connected');
    const data = await productManager.getProducts()
   
    socket.emit('home', {data, style:'index.css'})
    socket.on('product', async data => {
        try {
            const {
                id,
                title,
                description,
                price,
                status,
                category,
                thumbnail,
                code,
                stock }
                = data
console.log('evaluando')
        const prod = await productManager.addProduct(title, description,price,status,category,thumbnail,code,stock) 
        console.log(prod)

        }catch(error){
            console.log(error)
        }
        
            })
            console.log('Socket.IO event listener registered');
})