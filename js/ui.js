export const actualizarContador = (carrito) => {
    let contador = document.getElementById('contador-carrito');
    if (contador){
        contador.textContent= carrito.length.toString();
    }
}

export const mostrarMensajes =(texto) =>  {
    alert (texto)
} 
