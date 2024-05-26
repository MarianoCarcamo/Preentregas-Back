import ProductManager from './productManager.js'
import cartModel from '../models/cart.model.js'

const cartNotFound = new Error('Carrito no encontrado')
const productNotFoundInCart = new Error(
    'El producto no se encuentra en el carrito'
)

const productManager = new ProductManager()

class CartManager {
    async addCart() {
        try {
            await cartModel.create({})
        } catch (error) {
            throw error
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await cartModel
                .findById({ _id: cartId })
                .populate('products.product')
            if (!cart) {
                throw cartNotFound
            }
            return cart
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

    async getProductInCart(cartId, prodId) {
        try {
            const cart = await this.getCartById(cartId)
            const product = cart.products.find(
                (element) => element.product._id.toString() === prodId
            )
            if (!product) throw productNotFoundInCart
            return product
        } catch (error) {
            throw error
        }
    }

    async addProductInCart(cartId, prodId) {
        try {
            await productManager.getProductById(prodId) //Verifico la existencia del producto
            const cart = await this.getCartById(cartId)
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
            await cartModel.updateOne({ _id: cartId }, cart)
        } catch (error) {
            throw error
        }
    }

    async addProductsInCart(cartId, products) {
        try {
            products = products.map((product) => {
                return {
                    product: product._id.toString(),
                    quantity: 1,
                }
            })
            const cart = await this.getCartById(cartId)
            cart.products = products
            await cartModel.updateOne({ _id: cartId }, cart)
        } catch (error) {
            throw error
        }
    }

    async deleteProductInCart(cartId, prodId) {
        try {
            const cart = await this.getCartById(cartId)
            await this.getProductInCart(cartId, prodId) // Verifico si el producto esta en el carrito
            const products = cart.products.filter(
                (element) => element.product._id.toString() !== prodId
            )
            cart.products = products
            await cartModel.updateOne({ _id: cartId }, cart)
        } catch (error) {
            throw error
        }
    }

    async updateProductQuantity(cartId, prodId, newQuantity) {
        try {
            const cart = await this.getCartById(cartId)
            await this.getProductInCart(cartId, prodId) // Verifico si el producto esta en el carrito
            const product_object_index = cart.products.findIndex(
                (element) => element.product._id.toString() === prodId
            )
            cart.products[product_object_index].quantity = newQuantity
            await cartModel.updateOne({ _id: cartId }, cart)
        } catch (error) {
            throw error
        }
    }

    async deleteAllProductsInCart(cartId) {
        try {
            const cart = await this.getCartById(cartId)
            cart.products = []
            await cartModel.updateOne({ _id: cartId }, cart)
        } catch (error) {
            throw error
        }
    }
}

export default CartManager
