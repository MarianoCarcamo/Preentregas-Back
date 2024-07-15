import * as productManager from '../repository/products.repository.js'

export async function getAllProducts(req, res) {
    try {
        const response = await productManager.getProducts(req)
        res.send(response)
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
}

export async function getProductById(req, res) {
    const pid = req.params.idProduct
    try {
        const product = await productManager.getProductById(pid)
        res.send(product)
    } catch (error) {
        res.status(404).json({
            status: 'Error',
            ERROR: `${error.message}`,
        })
    }
}

export async function createProduct(req, res) {
    const newProduct = req.body
    try {
        const result = await productManager.createProduct(newProduct)
        res.send({ result: 'success', payload: result })
    } catch (error) {
        res.status(400).json({ ERROR: `${error.message}` })
    }
}

export async function updateProduct(req, res) {
    const id = req.params.productId
    const updatedProduct = req.body
    try {
        await productManager.updateProduct(id, updatedProduct)
        res.json({ message: 'Producto actualizado con exito' })
    } catch (error) {
        res.status(400).json({ ERROR: `${error.message}` })
    }
}

export async function deleteProduct(req, res) {
    const id = req.params.productId
    try {
        await productManager.deleteProduct(id)
        res.json({ message: 'Producto eliminado con exito' })
    } catch (error) {
        res.status(404).json({ ERROR: `${error.message}` })
    }
}
