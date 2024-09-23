import * as dataProducts from '../dao/mongoDB/productsData.js'
import { findUserById } from '../dao/mongoDB/userData.js'
import { isProductValid, getResponse } from '../dao/dtos/products.dto.js'
import { sendDeleteProductConfirmation } from '../services/email.service.js'

const productNotFound = new Error('Producto no encontrado')

// Funciones Internas
function updateByField(product, updatedProduct) {
    for (const key of Object.keys(updatedProduct)) {
        product[key] = updatedProduct[key]
    }
    return product
}

async function isCodeDuplicate(code) {
    try {
        const products = await dataProducts.getAllProducts()
        return products.some((product) => product.code === code)
    } catch (error) {
        throw error
    }
}

//Funciones Externas
export async function createProduct(product) {
    try {
        if (!isProductValid(product)) {
            throw new Error('Producto invalido')
        } else if (await isCodeDuplicate(product.code)) {
            throw new Error(
                `El código del producto "${product.title}" ya está en uso`
            )
        } else {
            await dataProducts.createProduct(product)
        }
    } catch (error) {
        throw error
    }
}

export async function getProducts(req) {
    try {
        const { limit = 10, page = 1, sort, query } = req.query
        const queryObj = query ? JSON.parse(`{${query}}`) : {}
        const options = {
            limit: limit,
            page: page,
        }
        if (sort) options.sort = { price: sort }
        const response = getResponse(
            req,
            await dataProducts.getProductsPaginated(queryObj, options)
        )
        return response
    } catch (error) {
        throw error
    }
}

export async function getProductById(id) {
    try {
        const product = await dataProducts.getProductById(id)
        if (product) {
            return product
        } else {
            throw productNotFound
        }
    } catch (error) {
        throw error
    }
}

export async function deleteProduct(id) {
    try {
        const product = await dataProducts.deleteProduct(id)
        if (product.owner !== '0') {
            await sendDeleteProductConfirmation(
                await findUserById(product.owner),
                product
            )
        }
        if (!product) {
            throw productNotFound
        }
    } catch (error) {
        throw error
    }
}

export async function updateProduct(id, product) {
    try {
        if ((product.id !== undefined) | (product._id !== undefined)) {
            throw new Error('No se permite actualizar el id')
        }
        const old_product = await dataProducts.getProductById(id)
        if (!old_product) {
            throw productNotFound
        }
        const updated_product = updateByField(old_product, product)
        await dataProducts.updateProduct(id, updated_product)
    } catch (error) {
        throw error
    }
}
