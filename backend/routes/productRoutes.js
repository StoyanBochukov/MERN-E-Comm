import express from 'express'
import { getProducts, getProductById } from '../controllers/productController.js'


const router = express.Router()


//@desc Fetch all products
//@route GET /api/products
//@access Public route
router.route('/').get(getProducts)


//@desc Fetch single products
//@route GET /api/products/:id
//@access Public route
router.route('/:id').get(getProductById)

export default router