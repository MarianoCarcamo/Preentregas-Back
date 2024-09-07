import * as cartManager from '../repository/carts.repository.js'
import * as ticketManager from '../repository/tickets.repository.js'
import { sendTicket } from '../services/email.service.js'

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
        let ticket = {}

        const { purchase_products, remain_products } =
            await cartManager.getPurchasedProducts(cartId)

        if (purchase_products.length > 0) {
            ticket = await ticketManager.createTicket(
                req.session.user.email,
                purchase_products
            )
            await sendTicket(ticket)

            if (remain_products.length == 0) {
                res.json({
                    status: 'Success',
                    message: 'Operacion realizada con exito',
                    not_bought_products: null,
                })
            } else {
                res.json({
                    status: 'Success',
                    message: 'Se realizo una compra parcial',
                    not_bought_products: remain_products.map((obj) => obj._id),
                })
            }
        } else {
            res.json({
                status: 'Error',
                message:
                    'No se puede realizar la compra. Revise si hay stock disponible',
            })
        }
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
}
