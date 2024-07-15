import mongoose from 'mongoose'
import { randomUUID } from 'crypto'

const ticketCollection = 'tickets'

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        default: randomUUID(),
        unique: true,
    },
    purchase_datetime: {
        type: String,
        required: true,
        default: new Date(Date.now()).toLocaleString('es-AR', {
            timeZone: 'America/Argentina/Tucuman',
        }),
    },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
})

const firstCollection = mongoose.model(ticketCollection, ticketSchema)

export default firstCollection
