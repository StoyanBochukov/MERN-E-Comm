import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { listProductsAction, deleteProductAction, createProductAction } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'



const ProductListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const deleteProduct = useSelector(state => state.deleteProduct)
    const { loading:loadingDelete, error:errorDelete, success:deleteSuccess } = deleteProduct

    const createProduct = useSelector(state => state.createProduct)
    const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = createProduct
  
  
    
    useEffect(() => {
      dispatch({
        type: PRODUCT_CREATE_RESET
      })
      if(!userInfo.isAdmin){
        navigate('/login')
      }
      if(successCreate){
        navigate(`/admin/product/${createdProduct._id}/edit`)
      }else{
        dispatch(listProductsAction())
      }
    }, [dispatch, navigate, userInfo, deleteSuccess, successCreate, createdProduct])
  
  
    const deleteHandler = (id) => {
     if(window.confirm(`Are you sure you want to DELETE`)){
        dispatch(deleteProductAction(id))
      }
    }

    const createProductHandler = () => {
      dispatch(createProductAction())
    }
  
    return (
      <>
      <Row className='align-items-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-right'>
            <Button className='my-3' onClick={createProductHandler}>
                <i className='fas fa-plus'></i> Create Product
            </Button>
        </Col>
      </Row>

      {loadingDelete && <Loading/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loading/>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
       
       
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped hover responsive bordered className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td> ??{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>
    )
}

export default ProductListScreen