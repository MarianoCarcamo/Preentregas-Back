import * as dataTickets from '../dao/mongoDB/ticketsData.js'

//Funciones Externas
export async function createTicket(email, products) {
    try {
        const amount = products
            .map((obj) => obj.product.price * obj.quantity)
            .reduce((a, b) => a + b)
        let purchase = {
            products,
            amount,
            purchaser: email,
        }
        return await dataTickets.createTicket(purchase)
    } catch (error) {
        throw error
    }
}
