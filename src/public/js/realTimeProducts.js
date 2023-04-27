
const socket = io()

const products = document.getElementById('products');
const linkCSS = document.getElementsByTagName('link')
const formulario = document.getElementById('formulario')

socket.on('products', data =>{
    console.log('mensaje del servidor');

    let desProducts = ''
    data.data.forEach(product => {
        desProducts += `<div class="producto"> 
                    <h1>title:${product.title}</h1><br>
                    description:${product.description}<br>
                    price:${product.price}<br>
                    status:${product.status}<br>
                    category:${product.category}<br>
                    thumbnail:${product.thumbnail}<br>
                    code:${product.code}<br>
                    stock:${product.stock}<br>
                    id:${product.id}<br>
                </div>`
    });
    products.innerHTML=desProducts;
    

})


formulario.addEventListener('submit', (event) =>{
    event.preventDefault()
    
    const data = Object.fromEntries(new FormData(event.target))
    data['thumbnail'] = ['empty']
    console.log(data);
    
    socket.emit('product', data)
    formulario.reset()
})




boton.addEventListener('click', () => {

    console.log('click')


})