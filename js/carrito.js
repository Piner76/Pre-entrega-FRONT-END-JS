import { obtenerCarrito } from "./storage.js"; 




const carritoItems = document.getElementById('carrito-items');
const CarritoCubrir = document.getElementById('carrito-cubrir');
const carritoLateral = document.getElementById('carrito-lateral');


export const abrirCarrito = () => {
    carritoLateral.classList.add('active');
    CarritoCubrir.classList.add('active');
    document.body.style.overflow = 'hidden';
}

export const cerrarCarrito = () => {
    carritoLateral.classList.remove('active');
    CarritoCubrir.classList.remove('active');
    document.body.style.overflow = 'auto';
}

export const actualizarCarritoLateral = () => {
    const carritoCompra = obtenerCarrito();
    if (carritoCompra.length === 0) {
        carritoItems.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }
    //vaciar el contenido actual
    carritoItems.innerHTML = '';
    
      carritoCompra.forEach(producto => {
        let divItem = document.createElement('div');
        divItem.className = 'carrito-item';
        divItem.innerHTML = `
                <div class="item-info">
                    <h4>${producto.descripcion}</h4>
                    <p>$${producto.precio} c/u</p>
                </div>
        `;
        carritoItems.appendChild(divItem);
    } );  
    }
    



/*document.addEventListener('DOMContentLoaded', () => {


    let carritoCompra = obtenerCarrito();
    if (carritoCompra.length === 0) {
        carritoItems.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    carritoCompra.forEach(producto => {

        let divItem = document.createElement('div');
        carritoItems.innerHTML += `
        <div class="carrito-item">
                <div class="item-info">
                    <h4>${producto.descripcion}</h4>
                    <p>$${producto.precio} c/u</p>
                </div>
                
            </div>
        `;
        carritoItems.appendChild(divItem);
    }

        let divItem = document.createElement('div');
        carritoItems.innerHTML += `
        <div class="carrito-item">
                <div class="item-info">
                    <h4>${producto.descripcion}</h4>
                    <p>$${producto.precio} c/u</p>
                </div>
                
            </div>
        `;
        carritoItems.appendChild(divItem);
    }
    );

});*/
