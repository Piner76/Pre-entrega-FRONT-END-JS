import { guardarCarrito,vaciarCarritoStorage,obtenerCarrito } from "./storage.js";
import { mostrarMensajes,actualizarContador } from "./ui.js";


export const agregarAlCarrito =  (producto) => {
    //aca traigo los datos del localstorage
    const carrito = obtenerCarrito()
    carrito.push(producto)
    //actualizo el carritoa
    guardarCarrito(carrito)
    actualizarContador(carrito)
    //mostrarMensajes("Producto agregaro al carrito")
    

}
export const eliminarCarrito = (indice) => {
    const carrito = obtenerCarrito()
    carrito.splice(indice,1)
    guardarCarrito(carrito)
    actualizarContador(carrito)
    //mostrarMensajes("Producto eliminado del carrito")
} 

export const vaciarCarrito =() => {
    vaciarCarritoStorage()
    actualizarContador([])
    mostrarMensajes("Carrito vaciado")
}

export function soloEnteros(e) {
  const teclaPermitida = e.key;
  const caracteresAceptados = '0123456789\b'; // \b es para el backspace

  if (!caracteresAceptados.includes(teclaPermitida)) {
    e.preventDefault(); // Bloquea el carácter si no es un número o backspace
  }
}