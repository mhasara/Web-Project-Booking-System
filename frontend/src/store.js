import { combineReducers, applyMiddleware } from 'redux'
import  {thunk}  from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { paymentCardListReducer, shippingAddressListReducer, userActivationLinkReducer, userActivationReducer, userForgotPasswordLinkReducer, userLoginReducer, userPaymentCardAddReducer, userRegisterReducer, userResetPasswordReducer, userShippingAddressAddReducer } from './reducers/userReducers'
import { productDetailsReducer, productListReducer, productSearchReducer, productTopRatedReducer, productVariantCominationPriceReducer, productVariantsReducer, productVariantsTypeReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userActivation : userActivationReducer,
    userActivationLink : userActivationLinkReducer,
    userForgotPasswordLink : userForgotPasswordLinkReducer,
    userResetPassword : userResetPasswordReducer,
    userPaymentCardAdd : userPaymentCardAddReducer,
    userShippingAddressAdd : userShippingAddressAddReducer,
    shippingAddressList : shippingAddressListReducer,
    paymentCardList : paymentCardListReducer,

    productList : productListReducer,
    productTopRated : productTopRatedReducer,
    productDetails : productDetailsReducer,
    productVariants : productVariantsReducer,
    productSearch : productSearchReducer,
    productVariantsType : productVariantsTypeReducer,
    productVariantCominationPrice : productVariantCominationPriceReducer,


    cart: cartReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin : {userInfo : userInfoFromStorage}
}

const  middlwere = [thunk]

const store = configureStore({reducer, preloadedState:initialState}, applyMiddleware(...middlwere))

export default store