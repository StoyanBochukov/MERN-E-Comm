import express from 'express'
import { getProducts,
     getProductById,
     deleteProduct,
     createProduct,
     updateProduct,
     createProductReview,
     getTopProducts
         } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'



const router = express.Router()


//@desc Fetch all products
//@route GET /api/products
//@access Public route
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)


//@desc Get Top Products
//@route GET /api/products/top
//@access Public route
router.get('/top', getTopProducts)


//@desc Fetch single products
//@route GET /api/products/:id
//@access Public route
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)




export default router