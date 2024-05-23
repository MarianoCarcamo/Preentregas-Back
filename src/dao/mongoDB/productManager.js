import productModel from '../models/product.model.js'

const productNotFound = new Error('Producto no encontrado')

// Funciones internas
function getResponse(req, data) {
    const response = {
        status: 'success',
        payload: data.docs,
        totalPages: data.totalPages,
        page: data.page,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
    }
    if (data.hasPrevPage) {
        const prevURL = req.originalUrl.includes('page=')
            ? req.originalUrl.replace(
                  `page=${data.page}`,
                  `page=${data.prevPage}`
              )
            : `${req.originalUrl}&page=${data.prevPage}`
        response.prevLink = `${req.protocol}://${req.get('host')}${prevURL}`
    } else {
        response.prevLink = null
    }
    if (data.hasNextPage) {
        const nextURL = req.originalUrl.includes('page=')
            ? req.originalUrl.replace(
                  `page=${data.page}`,
                  `page=${data.nextPage}`
              )
            : `${req.originalUrl}&page=${data.nextPage}`
        response.nextLink = `${req.protocol}://${req.get('host')}${nextURL}`
    } else {
        response.nextLink = null
    }
    return response
}

class ProductManager {
    async addProduct(product) {
        try {
            if (!this.isProductValid(product)) {
                throw new Error('Producto invalido')
            } else if (await this.isCodeDuplicate(product.code)) {
                throw new Error(
                    `El código del producto "${product.title}" ya está en uso`
                )
            } else {
                await productModel.create(product)
            }
        } catch (error) {
            throw error
        }
    }

    async getProducts(req) {
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
                await productModel.paginate(queryObj, options)
            )
            return response
        } catch (error) {
            throw error
        }
    }

    async getProductById(id) {
        try {
            const product = await productModel.findById({ _id: id })
            if (product) {
                return product
            } else {
                throw productNotFound
            }
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(id) {
        try {
            const product = await productModel.findByIdAndDelete({ _id: id })
            if (!product) {
                throw productNotFound
            }
        } catch (error) {
            throw error
        }
    }

    async upDateProduct(id, product) {
        try {
            if (product.id !== undefined) {
                throw new Error('No se permite actualizar el id')
            }
            const old_product = await productModel.findById({ _id: id })
            if (!old_product) {
                throw productNotFound
            }
            const updated_product = this.updateByField(old_product, product)
            await productModel.updateOne({ _id: id }, updated_product)
        } catch (error) {
            throw error
        }
    }

    isProductValid(product) {
        return (
            product.title &&
            product.description &&
            product.code &&
            product.price &&
            product.category &&
            product.stock !== undefined
        )
    }

    async isCodeDuplicate(code) {
        const products = await productModel.find()
        return products.some((product) => product.code === code)
    }

    updateByField(product, updatedProduct) {
        for (const key of Object.keys(updatedProduct)) {
            product[key] = updatedProduct[key]
        }
        return product
    }
}

export default ProductManager
