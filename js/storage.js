const KEY = "carrito"

export const guardarCarrito = (carrito) => {
    localStorage.setItem(KEY,JSON.stringify(carrito))
}

export const obtenerCarrito = () => {
    //si no existe datos en el carrito devuelve el array vacio
    return JSON.parse(localStorage.getItem(KEY))|| []
}
export const vaciarCarritoStorage = () => {
    localStorage.removeItem(KEY)
}
