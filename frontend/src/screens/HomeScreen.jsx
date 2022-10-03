import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProductsAction } from '../actions/productActions'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { useLocation } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
  
 const location = useLocation()
 const keyword = location.pathname && location.pathname.split('/')[2]
 const pageNumber = location.pathname && location.pathname


//  console.log(pageNumber)
//  console.log(keyword)


  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProductsAction(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
    {!keyword && <ProductCarousel /> }
      <h1>Latest Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger' >{error}</Message>
      ) : (
        <>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
        </>
      )}
    </>
  )
}

export default HomeScreen
