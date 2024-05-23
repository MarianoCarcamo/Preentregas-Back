import ProductManager from './productManager.js'
import cartModel from '../models/cart.model.js'

const cartNotFound = new Error('Carrito no encontrado')

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
            const cart = await cartModel.findById({_id:cartId})
            if(!cart){
                throw cartNotFound
            }
            return  cart
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
            const cart = await this.getCartById(cartId)
            const prod_index = cart.products.findIndex(
                (element) => element.product === prodId
            )
            if (prod_index > -1) {
                cart.products[prod_index].quantity++
            } else {
                cart.products.push({
                    product: prodId,
                    quantity: 1,
                })  
            }
            await cartModel.updateOne({_id:cartId},cart)
        } catch (error) {
            throw error
        }
    }
}

export default CartManager
