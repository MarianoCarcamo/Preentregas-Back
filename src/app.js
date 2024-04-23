import express from 'express'
import productsRouter from './routes/products.router.js'

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter)

app.listen(PORT, () => {
    console.log(`Server's up and running on port ${PORT}`)
})