import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/formContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'



const PaymentMethodScreen = () => {

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    
    
    if(!shippingAddress){
        navigate('/login/shipping')
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
   

    

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckOutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
           <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
           
           <Col>
                <Form.Check type='radio' label='PayPal or Credit/Debit Card'
                 id='PayPal' name='paymentMethod' value='PayPal' checked
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                ></Form.Check>
            </Col>
            <Col className='mt-2'>
                <Form.Check type='radio' label='Stripe'
                 id='Stripe' name='paymentMethod' value='Stripe'
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                ></Form.Check>
           </Col>
           </Form.Group>
            <Button className='mt-4' type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentMethodScreen