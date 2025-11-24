import { obtenerCarrito } from "./storage.js"; 
import {vaciarCarrito} from "./funcionesCarrito.js";



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

export const vacioCarrito = () => {
    const totalElemento = document.getElementById('carrito-total');
    totalElemento.textContent = `Total: $0.00`;
    vaciarCarrito();
    actualizarCarrito();
    actualizarContador([]);
}



export const actualizarCarrito = () => {
  const carritoCompra = obtenerCarrito();
    if (carritoCompra.length === 0) {
        carritoItems.innerHTML = '';
        let mensajevacio = document.createElement('p');
        mensajevacio.textContent = 'El carrito está vacío.';
        carritoItems.appendChild(mensajevacio);        
        return;
    }
    //vaciar el contenido actual
    carritoItems.innerHTML = '';
    
      carritoCompra.forEach(producto => {
        //recorro el carrito y agrupo los elementos iguales
        const existente = carritoItems.querySelector(`[data-id="${producto.id}"]`);
        if (existente) {
            const cantidadElem = existente.querySelector('.item-cantidad');
            cantidadElem.textContent = parseInt(cantidadElem.textContent) + 1;
            return;
        }

        let divItem = document.createElement('div');
        divItem.className = 'carrito-item';

        let itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';

        let h4Desc = document.createElement('h4');
        h4Desc.textContent = producto.title;

        let pPrecio = document.createElement('p');
        pPrecio.textContent = `$${producto.price}`;

        let pCantidad = document.createElement('p');
        pCantidad.className = 'item-cantidad';
        pCantidad.textContent = '1';



        itemInfo.appendChild(h4Desc);
        itemInfo.appendChild(pPrecio);
        divItem.appendChild(itemInfo);
        divItem.appendChild(pCantidad);
        divItem.setAttribute('data-id', producto.id);
        carritoItems.appendChild(divItem);
        mostrarTotalCarrito();
    } );  
    }
    

      //limpio las cantidades en las tarjetas
export const limpiarCantidadesTarjetas = () => {
        const cantidadesInputs = document.querySelectorAll('.cantidad-producto');
        cantidadesInputs.forEach(input => {
            input.value = '0';
        });
    }
    
export const totalCarrito = () => {
    const carritoCompra = obtenerCarrito();
    let total = 0;
    carritoCompra.forEach(producto => {
        total += producto.price;
    });
    return total;
}
export const mostrarTotalCarrito = () => {
    const total = totalCarrito();
    const totalElemento = document.getElementById('carrito-total'); 

    if (totalElemento) {
        totalElemento.textContent = `Total: $${total.toFixed(2)}`;
    }   
}