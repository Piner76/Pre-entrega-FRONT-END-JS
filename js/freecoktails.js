import { arrayMenu } from "./arrayDatos.js";
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

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    .then((res) => res.json())
    .then((data)=> 
        data.drinks.forEach(producto => {
            const artTarjeta = document.createElement('article');
            artTarjeta.className = 'tarjeta-producto';
            const imgElement = document.createElement('img');
            imgElement.alt = producto.strCategory;
            imgElement.src = producto.strDrinkThumb;
            const h3Element = document.createElement('h3');
            h3Element.textContent = producto.strInstructionsES;
            const pElementPrecio = document.createElement('p');
            pElementPrecio.textContent = `Category: ${producto.strCategory}`;
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
    )
    .catch();
});


   