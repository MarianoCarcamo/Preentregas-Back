import ticketModel from '../models/ticket.model.js'
import { randomUUID } from 'crypto'

export async function createTicket(ticket) {
    ticket.code = randomUUID()
    return await ticketModel.create(ticket)
}
