import { arrayCategorias } from "./arrayDatos.js";
//import {  } from "./producto.js";

/*
    * genero menu interactivo de bebidas 
*/

document.addEventListener('DOMContentLoaded', () => {
    const section_categoria = document.getElementById('categorias');

    let h2categorias = document.createElement('h2');
    h2categorias.textContent = 'categorías-destacadas';

    let div_cards = document.createElement('div');
    div_cards.className = 'cards';

    arrayCategorias.forEach((categoria) => {
        
        let div_card = document.createElement('article');
        div_card.className = 'card';

        const imgElement = document.createElement('img');
        imgElement.src = categoria.img;
        imgElement.alt = categoria.nombre;

        const h3Element = document.createElement('h3');
        h3Element.textContent = categoria.nombre;

        const pElement = document.createElement('p');
        pElement.textContent = categoria.descripcion;

        div_card.appendChild(imgElement);
        div_card.appendChild(h3Element);
        div_card.appendChild(pElement);
        div_cards.appendChild(div_card);
    
});
    section_categoria.appendChild(h2categorias);
    section_categoria.appendChild(div_cards);
});
