import { getProductById } from '../dao/mongoDB/productsData.js'

export async function isOwner(req, res, next) {
    const { productId } = req.params
    const user = req.session.user
    try {
        const product = await getProductById(productId)
        if (user._id === product.owner || user._id === '0') {
            next()
        } else {
            res.send({
                status: 'Error',
                message: 'Este producto no te pertenece',
            })
        }
    } catch (error) {}
}

export async function isNotOwner(req, res, next) {
    const { productId } = req.params
    const user = req.session.user
    try {
        const product = await getProductById(productId)
        if (user._id !== product.owner) {
            next()
        } else {
            res.send({
                status: 'Error',
                message: 'No podes agregar tus productos a tu Carrito!!',
            })
        }
    } catch (error) {}
}
