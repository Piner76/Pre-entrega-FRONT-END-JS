// genero menu interacticvo de bebidas 
import { agregarAlCarrito, eliminarCarrito} from "./funcionesCarrito.js";
import { guardarCarrito,obtenerCarrito} from "./storage.js";
import { actualizarContador } from "./ui.js";
import { arrayMenu ,arrayProductos} from "./arrayDatos.js";
import {cerrarCarrito,abrirCarrito,actualizarCarritoLateral} from "./carrito.js";

const menuInteractivo = document.getElementById('menu-interactivo');
let menuTabs = document.createElement('div');
menuTabs.className = "menu-tabs" ;

arrayMenu.forEach((menu)=>{
    const nuevoBoton = document.createElement('button');
    nuevoBoton.className="tab-btn";
    nuevoBoton.textContent = menu.categoria;
    menuTabs.appendChild(nuevoBoton);    
});

const btnAbrir = document.getElementById("contador-carrito");
if (btnAbrir) {
     btnAbrir.addEventListener("click", () => {
    if (btnAbrir)    
    actualizarCarritoLateral();
    abrirCarrito();
});
} else {
    console.warn('contador-carrito no encontrado en el DOM');
}


const btnCerrar = document.getElementById("cerrar-carrito");
if (btnCerrar){
    btnCerrar.addEventListener("click", () => {
    cerrarCarrito();
});
} else {
    console.warn('cerrar-carrito no encontrado en el DOM');
}

const carrito = obtenerCarrito();
actualizarContador(carrito);


/*
    * genero tarjetas de productos en home
*/
export const productosHome = document.getElementById('productos-home');

let tarjetasContainer = document.createElement('div');
tarjetasContainer.className = "contenedor-tarjetas" ;

arrayProductos.forEach((productosHome) => {

    let artTarjeta = document.createElement('article');
    artTarjeta.className = 'tarjeta-producto';

    const imgElement = document.createElement('img');
    imgElement.src = productosHome.img;
    imgElement.alt = productosHome.categoria;

    const h3Element = document.createElement('h3');
    h3Element.textContent = productosHome.descripcion;

    const pElement = document.createElement('p');
    pElement.textContent = `Precio :${productosHome.precio}`;


    //creo contenedor con botonera para agregar o quitar del carrito 
    let dElementoBotones = document.createElement('div');
    dElementoBotones.className = "contenedor-carrito";
    //botones + cantidad
    const btnMenos = document.createElement('button');
    btnMenos.className = "boton-carrito-menos";
    btnMenos.textContent= '-';
    
    const pElementCantidad = document.createElement('input');
    pElementCantidad.min = "0";
    pElementCantidad.step = "1";
    pElementCantidad.className = "cantidad-producto";
    pElementCantidad.value= '0';

    const btnMas = document.createElement('button');
    btnMas.className = "boton-carrito-mas";
    btnMas.textContent= '+';

    // --- cambiado: inicializar cantidad desde el carrito guardado ---
    // usar id si existe o descripcion como clave
    const productoKey = productosHome.id ?? productosHome.descripcion;
    const initCarrito = obtenerCarrito();
    const initItem = initCarrito.find(it => (it.id ?? it.descripcion) === productoKey);
    if (initItem && typeof initItem.cantidad === 'number') {
        pElementCantidad.value = String(initItem.cantidad);
    }
    
    // ---------------------------------------------------------------
    //Botones + y - para agregar o quitar del carrito
    // ---------------------------------------------------------------
    btnMas.addEventListener('click', () => {
        let cantidad = parseInt(pElementCantidad.value);
        cantidad += 1;
        pElementCantidad.value = cantidad.toString();
        
        agregarAlCarrito(productosHome); //agrego al carrito
        // obtener el carrito actualizado 
        let carritoActual = obtenerCarrito();
        // sincronizo cantidad en el carrito guardado
        let item = carritoActual.find(it => (it.id ?? it.descripcion) === productoKey);
        if (item) {
            // si no tiene cantidad, la inicializo/actualizo
            if (typeof item.cantidad !== 'number') item.cantidad = cantidad;
            else item.cantidad = cantidad;
        } else {
            // si no existe en el carrito, lo agrego con la cantidad actual
            carritoActual.push({ ...productosHome, cantidad });
        }
        guardarCarrito(carritoActual);
        actualizarContador(carritoActual);
    });

    btnMenos.addEventListener('click', () => {
        let cantidad = parseInt(pElementCantidad.value);
        if (cantidad > 0) {
            cantidad -= 1;
            pElementCantidad.value = cantidad.toString();
        
            // elimino una unidad del carrito (función existente)
            eliminarCarrito(productosHome);
            // sincronizo cantidad en el carrito guardado
            let carritoActual = obtenerCarrito();
            let item = carritoActual.find(it => (it.id ?? it.descripcion) === productoKey);
            if (item) {
                if (cantidad > 0) {
                    item.cantidad = cantidad;
                } else {
                    // si la cantidad llegó a 0, lo elimino del array
                    carritoActual = carritoActual.filter(it => (it.id ?? it.descripcion) !== productoKey);
                }
            }
            guardarCarrito(carritoActual);
            actualizarContador(carritoActual);
        }
 
        let valor = isnumeric(pElementCantidad.value) ? parseInt(pElementCantidad.value) : 0;
        if (valor > 0) {
            pElementCantidad.value = valor.toString();
            const carritoActual = obtenerCarrito();
            guardarCarrito(carritoActual);
            actualizarContador(carritoActual);
        }
    });

    //desplego carrito de compras

    dElementoBotones.appendChild(btnMenos);
    dElementoBotones.appendChild(pElementCantidad); 
    dElementoBotones.appendChild(btnMas);   
    artTarjeta.appendChild(imgElement);
    artTarjeta.appendChild(h3Element);
    artTarjeta.appendChild(pElement);
    artTarjeta.appendChild(dElementoBotones)
    tarjetasContainer.appendChild(artTarjeta);   
});

    document.addEventListener('DOMContentLoaded', () => {
        menuInteractivo.appendChild(menuTabs);
        productosHome.appendChild(tarjetasContainer);
        
    });


