import express from 'express'
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'



const router = express.Router()


//@desc Fetch all products
//@route GET /api/products
//@access Public route
router.route('/').get(getProducts).post(protect, admin, createProduct)


//@desc Fetch single products
//@route GET /api/products/:id
//@access Public route
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)





export default router