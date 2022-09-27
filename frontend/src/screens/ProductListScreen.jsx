import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { listProductsAction, deleteProductAction } from '../actions/productActions'



const ProductListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams
  
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const deleteProduct = useSelector(state => state.deleteProduct)
    const { loading:loadingDelete, error:errorDelete, success:deleteSuccess } = deleteProduct
  
  
    
    useEffect(() => {
      if(userInfo && userInfo.isAdmin){
          dispatch(listProductsAction())
      }else{
          navigate('/login')
      }
    }, [dispatch, navigate, userInfo, deleteSuccess])
  
  
    const deleteHandler = (id) => {
     if(window.confirm(`Are you sure you want to DELETE`)){
        dispatch(deleteProductAction(id))
      }
    }

    const createProductHandler = (product) => {

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
                  <td> £{product.price}</td>
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