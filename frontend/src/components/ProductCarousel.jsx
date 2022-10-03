import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loading from './Loading'
import Message from './Message'
import { topRatedProductsAction } from '../actions/productActions'

const ProductCarousel = () => {
    const dispatch = useDispatch()
    const topRatedProducts = useSelector(state => state.topRatedProducts)
    const { products, loading, error } = topRatedProducts

    useEffect(() => {
        dispatch(topRatedProductsAction())
    }, [dispatch])

  return loading ? <Loading /> : error ? <Message variant='danger'>{error}</Message> : 
  (
    <Carousel pause='hover' className='bg-dark'>
        {products.map((product) => (
            <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} fluid />
                    <Carousel.Caption className='carousel-caption'>
                        <h2>{product.name} (£{product.price})</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  )
}

export default ProductCarousel