import fs from 'fs/promises'

const cartNotFound = new Error('Carrito no encontrado')
const cartsFile = './src/db/carts.json'

//Funciones Internas
async function readCarts() {
    try {
        const data = await fs.readFile(cartsFile, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        if (error.code === 'ENOENT') {
            return []
        } else {
            throw error
        }
    }
}

async function nextId() {
    const ids = (await readCarts()).map((prod) => {
        return prod._id
    })
    return isFinite(Math.max(...ids)) ? Math.max(...ids) + 1 : 1
}

//Funciones Externas
export async function createCart() {
    try {
        let cart = {}
        let carts = await readCarts()
        cart._id = (await nextId()) ?? 1
        cart.products = []
        carts.push(cart)
        await fs.writeFile(cartsFile, JSON.stringify(carts, null, 2))
    } catch (error) {
        throw error
    }
}

export async function getCartById(id) {
    try {
        const cart = (await readCarts()).find((cart) => cart._id === id)
        if (cart) {
            return cart
        } else {
            throw cartNotFound
        }
    } catch (error) {
        throw error
    }
}

export async function updateCart(id, cart) {
    try {
        const carts = await readCarts()
        const cart_index = carts.findIndex((cart) => cart._id === id)
        if (!(cart_index > -1)) {
            throw cartNotFound
        } else {
            carts[cart_index] = cart
        }
        await fs.writeFile(cartsFile, JSON.stringify(carts, null, 2))
    } catch (error) {
        throw error
    }
}
