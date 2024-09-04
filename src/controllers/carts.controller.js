import * as cartManager from '../repository/carts.repository.js'
import * as ticketManager from '../repository/tickets.repository.js'
import { sendEmail } from '../services/email.service.js'

export async function getProductsInCart(req, res) {
    const id = req.params.cartId
    try {
        const products = await cartManager.getProductsInCart(id)
        res.send({ status: 'Success', payload: products })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
}

export async function addProductInCart(req, res) {
    const { cartId, productId } = req.params
    try {
        const result = await cartManager.addProductInCart(cartId, productId)
        if (result.status === 'Success') {
            res.redirect(`/carts/${cartId}`)
        } else {
            throw error
        }
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
}

export async function createCart(req, res) {
    try {
        const result = await cartManager.createCart()
        res.json({
            status: 'Success',
            message: 'Carrito creado con exito',
            result,
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
}

export async function deleteProductInCart(req, res) {
    const { cartId, productId } = req.params
    try {
        await cartManager.deleteProductInCart(cartId, productId)
        res.json({
            status: 'Success',
            message: 'Producto eliminado con exito del carrito',
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
}

export async function updateProductQuantity(req, res) {
    const { cartId, productId } = req.params
    const { quantity } = req.body
    try {
        await cartManager.updateProductQuantity(cartId, productId, quantity)
        res.json({
            status: 'Success',
            message: 'Operacion realizada con exito',
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
}

export async function deleteAllProductsInCart(req, res) {
    const { cartId } = req.params
    try {
        await cartManager.deleteAllProductsInCart(cartId)
        res.json({
            status: 'Success',
            message: 'Productos eliminados del carrito correctamente',
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
}

export async function addProductsInCart(req, res) {
    const { cartId } = req.params
    const { payload } = req.body
    try {
        await cartManager.addProductsInCart(cartId, payload)
        res.json({
            status: 'Success',
            message: 'Productos agregados al carrito correctamente',
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
}

export async function purchaser(req, res) {
    const { cartId } = req.params
    try {
        const ticket = await ticketManager.createTicket(
            cartId,
            req.session.user.email
        )
        await sendEmail(ticket)
        res.json({
            status: 'Success',
            message: 'Operacion realizada con exito',
        })
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
}
