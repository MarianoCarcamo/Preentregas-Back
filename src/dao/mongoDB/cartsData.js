import cartModel from '../models/cart.model.js'

const cartNotFound = new Error('Carrito no encontrado')

export async function getCartById(id) {
    try {
        const cart = await cartModel.findById({ _id: id }).populate('products.product')
        if (!cart) {
            throw cartNotFound
        }
        return cart
    } catch (error) {
        throw error
    }
}

export async function updateCart(id,cart) {
    try {
        return await cartModel.updateOne({ _id: id }, cart)
    } catch (error) {
        throw error
    }
}

export async function createCart() {
    try{
        return await cartModel.create({})
    } catch (error) {
        throw error
    }
}
