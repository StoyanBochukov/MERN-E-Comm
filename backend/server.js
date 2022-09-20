import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'



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

//Error Middleware

app.use(notFound)


app.use(errorHandler)


//PORT
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))