import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_ACTIVATION_REQUEST,
    USER_ACTIVATION_SUCCESS,
    USER_ACTIVATION_FAIL,

    GET_USER_ACTIVATION_LINK_REQUEST,
    GET_USER_ACTIVATION_LINK_SUCCESS,
    GET_USER_ACTIVATION_LINK_FAIL,
    GET_USER_ACTIVATION_LINK_RESET,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

    USER_FORGOT_PASSWORD_LINK_REQUEST,
    USER_FORGOT_PASSWORD_LINK_SUCCESS,
    USER_FORGOT_PASSWORD_LINK_FAIL,
    USER_FORGOT_PASSWORD_LINK_RESET,

    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_RESET_PASSWORD_FAIL,
    USER_FORGOT_PASSWORD_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_PAYMENT_CARD_ADD_REQUEST,
    USER_PAYMENT_CARD_ADD_SUCCESS,
    USER_PAYMENT_CARD_ADD_FAIL,
    USER_PAYMENT_CARD_ADD_RESET,

    USER_SHIPPING_ADDRESS_ADD_REQUEST,
    USER_SHIPPING_ADDRESS_ADD_SUCCESS,
    USER_SHIPPING_ADDRESS_ADD_FAIL,
    USER_SHIPPING_ADDRESS_ADD_RESET,

    USER_PAYMENT_CARD_LIST_REQUEST,
    USER_PAYMENT_CARD_LIST_SUCCESS,
    USER_PAYMENT_CARD_LIST_FAIL,
    USER_PAYMENT_CARD_LIST_RESET,

    USER_SHIPPING_ADDRESS_LIST_REQUEST,
    USER_SHIPPING_ADDRESS_LIST_SUCCESS,
    USER_SHIPPING_ADDRESS_LIST_FAIL,
    USER_SHIPPING_ADDRESS_LIST_RESET,
    USER_REGISTER_RESET,


} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userLogoutReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGOUT_REQUEST:
            return { loading: true }

        case USER_LOGOUT_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGOUT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, user: action.payload, success:true }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        
        case USER_REGISTER_RESET:
            return { }

        default:
            return state
    }
}

export const userForgotPasswordLinkReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_FORGOT_PASSWORD_LINK_REQUEST:
            return { loading: true }

        case USER_FORGOT_PASSWORD_LINK_SUCCESS:
            return { loading: false, message: action.payload, success:true }

        case USER_FORGOT_PASSWORD_LINK_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
} 

export const userResetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_RESET_PASSWORD_REQUEST:
            return { loading: true }

        case USER_RESET_PASSWORD_SUCCESS:
            return { loading: false, message: action.payload, success:true }

        case USER_RESET_PASSWORD_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const userActivationReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ACTIVATION_REQUEST:
            return { loading: true }

        case USER_ACTIVATION_SUCCESS:
            return { loading: false, message: action.payload, success:true }

        case USER_ACTIVATION_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const userActivationLinkReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_ACTIVATION_LINK_REQUEST:
            return { loading: true }

        case GET_USER_ACTIVATION_LINK_SUCCESS:
            return { loading: false, message: action.payload, success:true }

        case GET_USER_ACTIVATION_LINK_FAIL:
            return { loading: false, error: action.payload }

        case GET_USER_ACTIVATION_LINK_RESET:
            return { }

        default:
            return state
    }
}


export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case USER_DETAILS_RESET:
            return { user: {} }

        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }

        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }

        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }

        case USER_DELETE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }

        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
            
        default:
            return state
    }
}

export const userPaymentCardAddReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PAYMENT_CARD_ADD_REQUEST:
            return { loading: true }

        case USER_PAYMENT_CARD_ADD_SUCCESS:
            return { loading: false, success: true, shippingAddress: action.payload }

        case USER_PAYMENT_CARD_ADD_FAIL:
            return { loading: false, error: action.payload }
        
        case USER_PAYMENT_CARD_ADD_RESET:
            return {}
        
        default:
            return state
    }
}

export const userShippingAddressAddReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SHIPPING_ADDRESS_ADD_REQUEST:
            return { loading: true }

        case USER_SHIPPING_ADDRESS_ADD_SUCCESS:
            return { loading: false, success: true, shippingAddressAdd: action.payload }

        case USER_SHIPPING_ADDRESS_ADD_FAIL:
            return { loading: false, error: action.payload }

        case USER_SHIPPING_ADDRESS_ADD_RESET:
            return {}
            
        default:
            return state
    }
}


export const paymentCardListReducer = (state = { }, action) => {
    switch (action.type) {
        case USER_PAYMENT_CARD_LIST_REQUEST:
            return { loading: true,  }

        case USER_PAYMENT_CARD_LIST_SUCCESS:
            return {
                loading: false,
                cards: action.payload,
            }

        case USER_PAYMENT_CARD_LIST_FAIL:
            return { loading: false, error: action.payload }

        case USER_PAYMENT_CARD_LIST_RESET:
            return {}

        default:
            return state
    }
}

export const shippingAddressListReducer = (state = {  }, action) => {
    switch (action.type) {
        case USER_SHIPPING_ADDRESS_LIST_REQUEST:
            return { loading: true } 

        case USER_SHIPPING_ADDRESS_LIST_SUCCESS:
            return {
                loading: false,
                addresses: action.payload,
            }

        case USER_SHIPPING_ADDRESS_LIST_FAIL:
            return { loading: false, error: action.payload }

        case USER_SHIPPING_ADDRESS_LIST_RESET:
            return { }

        default:
            return state
    }
}





