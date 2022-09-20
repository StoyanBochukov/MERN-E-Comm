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


function App() {
  return (
    <>
    <Router>
      <Header />
       <main className='py-3'>
          <Container>

            <Routes>
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='/product/:id' element={<ProductScreens />} />
              <Route path='/cart' element={<CartScreen />} exact />
              <Route path='/cart/:id' element={<CartScreen />} exact />
            </Routes>

          </Container>
       </main>
      <Footer />
    </Router>
    </>
  )
}

export default App
