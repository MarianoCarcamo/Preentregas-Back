import * as productManager from './products.repository.js'
import * as dataCarts from '../dao/mongoDB/cartsData.js'

const cartNotFound = new Error('Carrito no encontrado')
const productNotFoundInCart = new Error(
    'El producto no se encuentra en el carrito'
)

//Funciones Internas
async function getCartById(cartId) {
    try {
        const cart = await dataCarts.getCartById(cartId)
        if (!cart) {
            throw cartNotFound
        }
        return cart
    } catch (error) {
        throw error
    }
}

//Funciones Externas
export async function createCart() {
    try {
        const result = await dataCarts.createCart()
        return result
    } catch (error) {
        throw error
    }
}

export async function getProductsInCart(id) {
    try {
        const cart = await getCartById(id)
        return cart.products
    } catch (error) {
        throw error
    }
}

export async function getProductInCart(cartId, prodId) {
    try {
        const cart = await getCartById(cartId)
        const product = cart.products.find(
            (element) => element.product._id.toString() === prodId
        )
        if (!product) throw productNotFoundInCart
        return product
    } catch (error) {
        throw error
    }
}

export async function addProductInCart(cartId, prodId) {
    try {
        await productManager.getProductById(prodId) //Verifico la existencia del producto
        const cart = await getCartById(cartId)
        const prod_index = cart.products.findIndex(
            (element) => element.product._id.toString() === prodId
        )
        if (prod_index > -1) {
            cart.products[prod_index].quantity++
        } else {
            cart.products.push({
                product: prodId,
                quantity: 1,
            })
        }
        await dataCarts.updateCart(cartId, cart)
    } catch (error) {
        throw error
    }
}

export async function addProductsInCart(cartId, products) {
    try {
        products = products.map((product) => {
            return {
                product: product._id.toString(),
                quantity: 1,
            }
        })
        const cart = await getCartById(cartId)
        cart.products = products
        await dataCarts.updateCart(cartId, cart)
    } catch (error) {
        throw error
    }
}

export async function deleteProductInCart(cartId, prodId) {
    try {
        const cart = await getCartById(cartId)
        await getProductInCart(cartId, prodId) // Verifico si el producto esta en el carrito
        const products = cart.products.filter(
            (element) => element.product._id.toString() !== prodId
        )
        cart.products = products
        await dataCarts.updateCart(cartId, cart)
    } catch (error) {
        throw error
    }
}

export async function updateProductQuantity(cartId, prodId, newQuantity) {
    try {
        const cart = await getCartById(cartId)
        await getProductInCart(cartId, prodId) // Verifico si el producto esta en el carrito
        const product_object_index = cart.products.findIndex(
            (element) => element.product._id.toString() === prodId
        )
        cart.products[product_object_index].quantity = newQuantity
        await dataCarts.updateCart(cartId, cart)
    } catch (error) {
        throw error
    }
}

export async function deleteAllProductsInCart(cartId) {
    try {
        const cart = await getCartById(cartId)
        cart.products = []
        await dataCarts.updateCart(cartId, cart)
    } catch (error) {
        throw error
    }
}
