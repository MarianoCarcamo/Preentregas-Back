import fs from 'fs/promises'
import ProductManager from './ProductManager.js'

const cartNotFound = new Error('Carrito no encontrado')

const productManager = new ProductManager()

class CartManager {
    constructor() {
        this.carritosFile = './src/carrito.json'
    }

    async addCart() {
        try {
            let cart = {}
            let carts = await this.readCarts()
            cart.id = (await this.nextId()) ?? 1
            cart.products = []
            carts.push(cart)
            await fs.writeFile(
                this.carritosFile,
                JSON.stringify(carts, null, 2)
            )
        } catch (error) {
            throw error
        }
    }

    async getCartById(cartId) {
        try {
            const cart = (await this.readCarts()).find((c) => c.id === cartId)
            if (cart) {
                return cart
            } else {
                throw cartNotFound
            }
        } catch (error) {
            throw error
        }
    }

    async getProductsInCart(id) {
        try {
            const cart = await this.getCartById(id)
            return cart.products
        } catch (error) {
            throw error
        }
    }

    async addProductInCart(cartId, prodId) {
        try {
            await productManager.getProductById(prodId) //Verifico la existencia del producto
            const carts = await this.readCarts()
            const cart_index = carts.findIndex((c) => c.id === cartId)
            if (!(cart_index > -1)) {
                throw cartNotFound
            } else {
                const prod_index = carts[cart_index].products.findIndex(
                    (p) => p.product === prodId
                )
                if (prod_index > -1) {
                    carts[cart_index].products[prod_index].quantity++
                } else {
                    carts[cart_index].products.push({
                        product: prodId,
                        quantity: 1,
                    })
                }
            }
            await fs.writeFile(
                this.carritosFile,
                JSON.stringify(carts, null, 2)
            )
        } catch (error) {
            throw error
        }
    }

    async readCarts() {
        try {
            const data = await fs.readFile(this.carritosFile, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []
            } else {
                throw error
            }
        }
    }

    async nextId() {
        const ids = (await this.readCarts()).map((p) => {
            return p.id
        })
        return isFinite(Math.max(...ids)) ? Math.max(...ids) + 1 : 1
    }
}

export default CartManager
