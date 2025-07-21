import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import Header from './componets/Header'
import Footer from './componets/Footer'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProductsScreen from './screens/ProductsScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import AboutUsScreen from './screens/AboutUsScreen'
import PrivateRoutes from './utilities/PrivateRoutes'
import ProfileScreen from './screens/ProfileScreen'
import CheckOutScreen from './screens/CheckOutScreen'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
import ForgotPasswordResetScreen from './screens/ForgotPasswordResetScreen'
import UserActivationLinkScreen from './screens/UserActivationLinkScreen'


const App = () => {
  return (
    <Router>
      <Header/>
      <Routes> 
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/login' element={<LoginScreen/>} />
        <Route path='/password/reset/confirm/:uid/:token' element={<ForgotPasswordResetScreen/>} />
        <Route path='/forgot/password' element={<ForgotPasswordScreen/>} />
        <Route path='/create/activation/link' element={<UserActivationLinkScreen/>} />
        <Route path='/register' element={<RegisterScreen/>} />
        <Route path='/shop' element={<ProductsScreen/>} />
        <Route path='/shop/:category' element={<ProductsScreen/>} /> 
        <Route path='/shop/:category/:pName' element={<ProductScreen/>} />
        <Route path='/cart' element={<CartScreen/>} />
        <Route path='/aboutus' element={<AboutUsScreen/>} />
        <Route path='/'  element={<PrivateRoutes/>} >
          <Route path='/profile' element={<ProfileScreen/>} />
          <Route path='/cart/checkout' element={<CheckOutScreen/>}/>
        </Route>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App