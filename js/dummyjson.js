import { arrayMenu } from "./arrayDatos.js";
 const contenedor = document.getElementById("contenedor-productos");


document.addEventListener('DOMContentLoaded', () => {
    const menuInteractivo = document.getElementById('menu-interactivo');
    let menuTabs = document.createElement('div');
    menuTabs.className = "menu-tabs" ;
    
    arrayMenu.forEach((menu)=>{
        const nuevoBoton = document.createElement('button');
        nuevoBoton.className="tab-btn";
        nuevoBoton.textContent = menu.categoria;
        menuTabs.appendChild(nuevoBoton);    
    });
    menuInteractivo.appendChild(menuTabs);
/*
    * genero tarjetas de productos en home
*/
const productosHome = document.getElementById('productos-home');

let tarjetasContainer = document.createElement('div');
tarjetasContainer.className = "contenedor-tarjetas" ;

  let urlCategoria = "https://dummyjson.com/products/category/smartphones";
  let url = "https://dummyjson.com/products";

  fetch(urlCategoria)
    .then((response) => response.json())
    .then((data) =>
      //Accedemos a la clave products
      data.products.forEach((producto) => {
            const artTarjeta = document.createElement('article');
            artTarjeta.className = 'tarjeta-producto';

            const imgElement = document.createElement('img');
            imgElement.alt = producto.category;
            imgElement.src = producto.images[0];

            const h3Element = document.createElement('h3');
            h3Element.textContent = producto.description;
            
            const pElementPrecio = document.createElement('p');
            pElementPrecio.textContent = `$${producto.price}`;

            //creo contenedor con botonera para agregar o quitar del carrito 
            let dElementoBotones = document.createElement('div');
            dElementoBotones.className = "contenedor-carrito";
            //botones + cantidad
            const btnMenos = document.createElement('button');
            btnMenos.className = "boton-carrito-menos";
            btnMenos.textContent= '-';
            //cantidad input
            const pElementCantidad = document.createElement('input');
            pElementCantidad.min = "0";
            pElementCantidad.step = "1";
            pElementCantidad.className = "cantidad-producto";
            pElementCantidad.value= '0';
            //boton agregar al carrito
            const btnMas = document.createElement('button');
            btnMas.className = "boton-carrito-mas";
            btnMas.textContent= '+';

            dElementoBotones.appendChild(btnMenos);
            dElementoBotones.appendChild(pElementCantidad); 
            dElementoBotones.appendChild(btnMas);   
    
            artTarjeta.append(imgElement, h3Element, pElementPrecio, dElementoBotones); 
            tarjetasContainer.appendChild(artTarjeta);
            productosHome.appendChild(tarjetasContainer);

      })
    );
});