import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { PayPalButton } from "react-paypal-button-v2"
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loading from '../components/Loading'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getOrderDetails, payOrder, orderDeliveryAction } from '../actions/orderAction'
import { ORDER_PAY_RESET, ORDER_DELIVERY_RESET } from '../constants/orderConstants'
// import { bindActionCreators } from 'redux'

const OrderScreen = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()


    const [sdkReady, setSdkReady] = useState(false)
    
   const orderDetails = useSelector(state => state.orderDetails)
   const { order, loading, error } = orderDetails

   const userLogin = useSelector(state => state.userLogin)
   const { userInfo } = userLogin

   const orderPay = useSelector(state => state.orderPay)
   const { loading:loadingPay, success:successPay } = orderPay

   const orderDelivery = useSelector(state => state.orderDelivery)
   const { loading:deliveryLoading, success:deliverySuccess } = orderDelivery


   
if(!loading){
    order.orderPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
}


   useEffect(() => {

    if(!userInfo){
        navigate('/login')
    }

    const addPayPalScript = async () => {
        const { data: payPalclientId } = await axios.get('/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${payPalclientId}`
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
        if(!order || successPay || deliverySuccess){
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVERY_RESET })
            dispatch(getOrderDetails(id))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
    }, [dispatch, navigate, id, successPay, order, deliverySuccess])

    useEffect(() => {
        if(!order || order._id !== id){
            dispatch(getOrderDetails(id))
        }
    }, [order, id, dispatch])


    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(id, paymentResult))
        
    }

    const deliverHandler = () => {
        dispatch(orderDeliveryAction(order))
        dispatch({ type: ORDER_DELIVERY_RESET })
    }

  return loading ? <Loading /> : error ? <Message variant='danger'>{error}</Message> 
  : <>
    <h1>Order {order._id}</h1>

    <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <strong>Name: </strong> {order.user.firstName} {order.user.lastName}
                        <br />
                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address}, {order.shippingAddress.postCode},
                            {order.shippingAddress.city}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt.substring(0, 10)}</Message> : 
                        <Message variant='danger'>Not Delivered</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                        <strong>Method:</strong>
                        {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant='success'>Paid on {order.paidAt.substring(0, 10)}</Message> : 
                        <Message variant='danger'>Not Paid</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                            <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`product/${item.product}`} >
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x £{item.price} = £{item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>

                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>£{order.orderPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>£{order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>£{order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>£{order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                            
                       {!order.isPaid && userInfo && userInfo._id === order.user._id &&(
                        <ListGroup.Item>
                            {/* {loadingPay && <Loading />}
                            {!sdkReady ? <Loading /> : (
                                <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                            )} */}
                        </ListGroup.Item>
                       )}

                        {deliveryLoading && <Loading />}
                       {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <ListGroup.Item>
                            <Button type='button' className='btn btn-block' 
                            onClick={deliverHandler} >
                                Mark as Delivered
                            </Button>
                        </ListGroup.Item>
                       )}

                    </ListGroup>
                </Card>
            </Col>
        </Row>

  </>
        
    
  
}

export default OrderScreen