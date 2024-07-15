export function isProductValid(product) {
    return (
        product.title &&
        product.description &&
        product.code &&
        product.price &&
        product.category &&
        product.stock !== undefined
    )
}

export function getResponse(req, data) {
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
