import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_FAIL,
    ORDER_ADMIN_LIST_REQUEST,
    ORDER_ADMIN_LIST_SUCCESS,
    ORDER_ADMIN_LIST_FAIL,
    ORDER_DELIVERY_REQUEST,
    ORDER_DELIVERY_SUCCESS,
    ORDER_DELIVERY_FAIL,
    
} from '../constants/orderConstants'
import axios from 'axios'



export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/api/orders', order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
}

export const getOrderDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        const { userLogin: {userInfo} } = getState()
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`, config)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
}


export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
}

export const myOrderList = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_MY_LIST_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/api/orders/myorders', config)

        dispatch({
            type: ORDER_MY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_MY_LIST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
}


export const getAllOrdersAction = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_ADMIN_LIST_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders`, config)
        dispatch({
            type: ORDER_ADMIN_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_ADMIN_LIST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
}


export const orderDeliveryAction = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVERY_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {}, config)
        dispatch({
            type: ORDER_DELIVERY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DELIVERY_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message : error.message
        })
    }
}