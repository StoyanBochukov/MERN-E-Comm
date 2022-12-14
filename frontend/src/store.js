import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer,
         productDetailsReducer,
         deleteProductReducer,
         createProductReducer,
         updateProductReducer,
         productReviewReducer,
         topRatedProductsReducer
     } from './reducers/productReducer'

import { cartReducer } from './reducers/cartReducers'

// import { configureStore } from '@reduxjs/toolkit'

import { userLoginReducer,
        userRegisterReducer,
        userDetailsReducer,
        userUpdateProfileReducer,
        usersListReducer,
        userDeleteReducer,
        userUpdateReducer
    } from './reducers/userReducers'

import { orderCreateReducer,
        orderDetailsReducer,
        orderPayReducer,
        myOrderListReducer,
        getOrdersAdminReducer,
        orderDeliveryReducer,
     } from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    deleteProduct: deleteProductReducer,
    createProduct: createProductReducer,
    updateProduct: updateProductReducer,
    createReview: productReviewReducer,
    topRatedProducts: topRatedProductsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userProfileUpdate: userUpdateProfileReducer,
    usersList: usersListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderDelivery: orderDeliveryReducer,
    getAllOrders: getOrdersAdminReducer,
    orderPay: orderPayReducer,
    myOrders: myOrderListReducer,
})



const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]



const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
// const store = configureStore({reducer, initialState, middleware})


export default store