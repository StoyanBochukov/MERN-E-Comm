import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from  'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { myOrderList } from '../actions/orderAction'
import { USER_UPDATE_RESET } from '../constants/userConstants'



const ProfileScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userProfileUpdate = useSelector(state => state.userProfileUpdate)
    const { success } = userProfileUpdate

    const myOrders = useSelector(state => state.myOrders)
    const { loading:lodingOrders, error:errorOrders, orders } = myOrders

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserProfile({id: user._id, firstName, lastName, email, password}))
        }
    } 


    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user.firstName && !user.lastName && !success){
                dispatch({type: USER_UPDATE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(myOrderList())
            }else{
                setFirstName(user.firstName)
                setLastName(user.lastName)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success])
    

  return (
    <Row>
        <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loading /> }
        <Form onSubmit={submitHandler}>

            <Form.Group controlId='firstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control type='name' placeholder='Enter First Name'
                value={firstName} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='lastName'>
                <Form.Label>Surname</Form.Label>
                <Form.Control type='name' placeholder='Enter Surname'
                value={lastName} onChange={(e) => setLastName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email'
                value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password'
                value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm Password'
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button className='mt-4' type='submit' variant='primary'>Update</Button>
        </Form>
        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
            {lodingOrders ? <Loading /> : errorOrders ? <Message variant='danget'>{errorOrders}</Message> 
            : (
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td>
                                 <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`} >
                                        <Button variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
  )
}

export default ProfileScreen