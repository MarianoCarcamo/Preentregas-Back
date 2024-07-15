import * as dataTickets from '../dao/mongoDB/ticketsData.js'
import { getProductsInCart } from '../repository/carts.repository.js'

//Funciones Externas
export async function createTicket(cartId, email) {
    try {
        const amount = (await getProductsInCart(cartId))
            .map((prod) => prod.product.price * prod.quantity)
            .reduce((a, b) => a + b)
        let purchase = {
            amount,
            purchaser: email,
        }
        const result = await dataTickets.createTicket(purchase)
        return result
    } catch (error) {
        throw error
    }
}
