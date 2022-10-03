import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreens from './screens/ProductScreens'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/loginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UsersListScreen from './screens/UsersListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'


function App() {
  return (
    <>
    <Router>
      <Header />
       <main className='py-3'>
          <Container>

            <Routes>
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route path='/login/shipping' element={<ShippingScreen />} />
              <Route path='/payment' element={<PaymentMethodScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/product/:id' element={<ProductScreens />} />
              <Route path='/cart' element={<CartScreen />} exact />
              <Route path='/cart/:id' element={<CartScreen />} exact />
              <Route path='/admin/orderlist' element={<OrderListScreen />} />
              <Route path='/admin/userlist' element={<UsersListScreen />} />
              <Route path='admin/productlist' element={<ProductListScreen />} />
              <Route path='admin/product/:id/edit' element={<ProductEditScreen />} />
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
              <Route path='/search/:keyword' element={<HomeScreen />}  />
              <Route path='/page/:pageNumber' element={<HomeScreen />} />
              <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
              <Route path='/' element={<HomeScreen />} />
            </Routes>

          </Container>
       </main>
      <Footer />
    </Router>
    </>
  )
}

export default App
