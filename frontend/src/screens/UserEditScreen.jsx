import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { getUserDetails, userUpdateAction } from '../actions/userActions'
import FormContainer from '../components/formContainer'
import { USER_ADMIN_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userUpdateAction({_id: id, email, firstName, lastName, isAdmin}))
  }

  useEffect(() => {
    if(successUpdate){
        dispatch({ type: USER_ADMIN_UPDATE_RESET })
        navigate('/admin/userlist')
    }else{
        if(!user.firstName || user._id !== id){
            dispatch(getUserDetails(id))
        }else{
            setEmail(user.email)
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setIsAdmin(user.isAdmin)
        }
    }
    
  }, [dispatch, navigate, successUpdate, id, user])

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loading />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='lastName'>
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Surname'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen
