import fs from 'fs';

export default class ProductManager {

    constructor() {
        this.path = './files/Products.json';

    }
    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data); //Lo convierto a objeto
            return products;
        }
        return [];
    }
    addProducts = async ({title, description, price, thumbnail, code, stock}) => {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log('Error! one or more fields are incomplete');
        }
        const products = await this.getProducts();
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        if (products.length === 0) {
            product.id = 1;
        } else {
            product.id = products[products.length - 1].id + 1;
        }
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return product;

    }

    getProductsById = async (id) => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            const product = products.find(p => p.id === id);
            if (!product) {
                console.log(`The product with id ${id} does not exist`);
                return null;
            }
            console.log(`The product with id ${id} is: `, product);
            return product;
        } catch (error) {
            console.log('Error reading file:', error);
            return null;
        }
    }

    updateProduct = async (id, updatedProduct) => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex === -1) {
                throw new Error(`We can not make an update to the product with ${id} because it does not exist`);
              
            }
            //e esta manera Lo que va a pasar es que js va a decir: Okey quiero agregar la propiedad title al objeto que ya tiene esta propiedad, entonces le voy a modificar sus contenidos.Y lo mismo con el price En el caso que quiera cambiar el price y el title
          
            const productToUpdate = { ...products[productIndex], ...updatedProduct };
             products[productIndex] = productToUpdate;
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                console.log(`The product with id ${id} has succefully been modified`)
                console.log(`The new values for the product with id ${id}`, products[productIndex])
            
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    deleteProduct = async (id) => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(data)
            const productf = products.find(p => p.id === id)
            if (!productf) {
                console.log(`We could not find a product that matches the id: ${id}`)
            } else {
                const productNotEliminated = products.filter(p => p.id != id)
                await fs.promises.writeFile(this.path, JSON.stringify(productNotEliminated, null, '\t'))
                console.log(`The product with id ${id} has been eliminated`)
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}



