import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'



//@desc Fetch all products
//@route GET /api/products
//@access Public route
const getProducts = asyncHandler( async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : { }
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize)
    .skip(pageSize * (page - 1))
    res.json({products, page, pages:Math.ceil(count / pageSize)})
})


//@desc Fetch single products
//@route GET /api/products/:id
//@access Public route
const getProductById = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})


//@desc Delete product
//@route DELETE /api/products/:id
//@access Private/Admin route
const deleteProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message: 'Product Removed'})
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})



//@desc Create Product
//@route POST /api/products
//@access Private/Admin route
const createProduct = asyncHandler( async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})


//@desc Update Product
//@route PUT /api/products/:id
//@access Private/Admin route
const updateProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        product.name = req.body.name || product.name
        product.price = req.body.price || product.price
        product.image = req.body.image || product.image
        product.brand = req.body.brand || product.brand
        product.category = req.body.category || product.category
        product.countInStock = req.body.countInStock || product.countInStock
        product.description = req.body.description || product.description

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})


//@desc Create new review
//@route POST /api/products/:id/reviews
//@access Private route
const createProductReview = asyncHandler( async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)

    if(product){
       const alreadyReviewd = product.reviews.find(r => r.user.toString() === req.user._id.toString())

       if(alreadyReviewd){
        res.status(400)
        throw new Error('Product already reviewed')
       }

       const review = {
        name: req.user.firstName,
        rating: Number(rating),
        comment,
        user: req.user._id
       }

       product.reviews.push(review)
       product.numReviews = product.reviews.length
       product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

       await product.save()
       res.status(201).json({message:'Review added'})

    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})



//@desc Get Top Rated products
//@route POST /api/products/top
//@access Public route
const getTopProducts = asyncHandler( async (req, res) => {
     const products = await Product.find({}).sort({rating: -1}).limit(4)

     res.json(products)
})





export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
}