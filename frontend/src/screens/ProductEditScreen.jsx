import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { listProductDetailsAction, updateProductAction } from '../actions/productActions'
import FormContainer from '../components/formContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstant'


const ProductEditScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
  
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const updateProduct = useSelector(state => state.updateProduct)
    const { loading:updateLoading, error:updateError, success:updateSuccess } = updateProduct
  
    const submitHandler = (e) => {
      e.preventDefault()
     dispatch(updateProductAction({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description
     }))
    }

    const uploadFileHandler = async (e) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      setUploading(true)
      try {
        const config = {
          headers:{
            'Content-Type': 'multipart/form-data'
            // 'Content-Type': 'application/json'
          }
        }
        const { data } = await axios.post('/api/upload', formData, config)
        setImage(data)
        setUploading(false)
      } catch (error) {
        console.log(error)
        setUploading(false)
      }
    }
  
    useEffect(() => {
        if(updateSuccess){
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        }else{
            if(!product.name || product._id !== id){
                dispatch(listProductDetailsAction(id))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)    
            }
        }
          
    }, [dispatch, navigate, id, product, updateSuccess])
  
    return (
      <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
          Go Back
        </Link>
  
        <FormContainer>
          <h1>Edit Product</h1>
          {updateLoading && <Loading />}
          {updateError && <Message variant='danger'>{updateError}</Message>}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label> Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
  
              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Eter Pice'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
  
              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Image url'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                
                 <Form.Control type='file' label='Choose File'
                  onClick={uploadFileHandler} />
                 {uploading && <Loading />}
              </Form.Group>
  
              <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>


              <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter Count In Stock'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>


              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
  
              
  
              <Button className='mt-4' type='submit' variant='primary'>
                Update
              </Button>
            </Form>
          )}
        </FormContainer>
      </>
    )
}

export default ProductEditScreen