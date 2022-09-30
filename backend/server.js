import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import uploadRoutes from './routes/uploadRoutes.js'


dotenv.config()
connectDB()
const app = express()


app.use(express.json())


app.get('/', (req, res) => {
    res.send('API is running')
})
//Connecting routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

//Making Upload folder a STATIC folder so it can be accessed by the browser
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


//PayPal Route setup
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

//Error Middleware

app.use(notFound)


app.use(errorHandler)


//PORT
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))