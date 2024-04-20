import express from 'express'
import ProductManager from '../ProductManager.js'

const router = express.Router()

const productManager = new ProductManager()

// FUNCIONES
async function getProducts(quantity) {
    if (quantity) {
        return (await productManager.getProducts()).slice(0, quantity)
    } else {
        return await productManager.getProducts()
    }
}

// ENDPOINTS
router.get('/', (req, res) => {
    const { limit } = req.query
    getProducts(limit).then((p) => {
        res.send(p)
    })
})

router.get('/:idProduct', (req, res) => {
    const pid = Number(req.params.idProduct)
    productManager
        .getProductById(pid)
        .then((p) => res.send(p))
        .catch((e) => {
            res.status(404).json({
                ERROR: `${e.message}`,
            })
        })
})

router.post('/', (req, res) => {
    const newProduct = req.body
    productManager
        .addProduct(newProduct)
        .then(() => {
            res.json({ message: 'Producto agregado con exito' })
        })
        .catch((e) => {
            res.status(400).json({ ERROR: `${e.message}` })
        })
})

router.put('/:productId', (req, res) => {
    const id = parseInt(req.params.productId)
    const updatedProduct = req.body
    productManager
        .upDateProduct(id, updatedProduct)
        .then(() => res.json({ message: 'Producto actualizado con exito' }))
        .catch((e) => res.status(400).json({ ERROR: `${e.message}` }))
})

router.delete('/:productId', (req, res) => {
    const id = parseInt(req.params.productId)
    productManager
        .deleteProduct(id)
        .then(() => {
            res.json({ message: 'Producto eliminado con exito' })
        })
        .catch((e) => {
            res.status(404).json({ ERROR: `${(e, message)}` })
        })
})

export default router
