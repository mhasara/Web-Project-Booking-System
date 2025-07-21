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
    USER_RESET_PASSWORD_RESET,

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


} from '../constants/userConstants'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/login/',
            { 'username': email, 'password': password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const activateUser = (uid, token) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ACTIVATION_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/auth/users/activation/',
            { 'uid': uid, 'token': token },
            config
        )

        dispatch({
            type: USER_ACTIVATION_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_ACTIVATION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getActivationLinkUser = (email) => async (dispatch) => {
    try {
        dispatch({
            type: GET_USER_ACTIVATION_LINK_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/auth/users/resend_activation/',
            { 'email': email },
            config
        )

        dispatch({
            type: GET_USER_ACTIVATION_LINK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_USER_ACTIVATION_LINK_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const resetForgotPassword = (uid, token,password, rePassword) => async (dispatch) => {
    try {
        dispatch({
            type: USER_RESET_PASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/auth/users/reset_password_confirm/',
            { 'uid': uid, 'token': token, 'new_password' : password, 're_new_password':rePassword },
            config
        )

        dispatch({
            type: USER_RESET_PASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_RESET_PASSWORD_FAIL,
            payload: 
                error.response && error.response.data.detail? 
                error.response.data.detail:
                error.response.data.uid?
                error.response.data.uid:
                error.response.data.token?
                error.response.data.token:
                error.response.data.new_password?
                error.response.data.new_password:
                error.response.data.non_field_errors?
                error.response.data.non_field_errors:
                error.message,
        })
    }
}


export const register = (email, password, re_password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        } 

        const { data } = await axios.post(
            '/auth/users/',
            { 'username': email, 'email': email, 'password': password, 're_password': re_password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.email || error.response.data.username || error.response.data.usernmae || error.response.data.password || error.response.data.non_field_errors
                ? error.response.data.email || error.response.data.username || error.response.data.password || error.response.data.non_field_errors
                : error.message,
        })
    }
}

export const getForgotLink = (email) => async (dispatch) => {
    try {
        dispatch({
            type: USER_FORGOT_PASSWORD_LINK_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/auth/users/reset_password/',
            { 'email': email },
            config
        )

        dispatch({
            type: USER_FORGOT_PASSWORD_LINK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_FORGOT_PASSWORD_LINK_FAIL,
            payload: error.response && error.response.data.email
                ? error.response.data.email:
                error.response.data?
                error.response.data
                : error.message,
        })
    }
}

export const addPaymentCard = (card_type, card_holder_name, card_number, card_expiry_date, card_cvv) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_PAYMENT_CARD_ADD_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.post(
            '/api/user/addPaymentCard/',
            { 'card_type': card_type, 'card_holder_name': card_holder_name, 'card_number': card_number, 'card_expiry_date': card_expiry_date, 'card_cvv':card_cvv },
            config
        )

        dispatch({
            type: USER_PAYMENT_CARD_ADD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_PAYMENT_CARD_ADD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const addShippingAddress = (address_line_1, address_line_2, address_line_3, distric, province, postalcode) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_SHIPPING_ADDRESS_ADD_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.post(
            '/api/user/addShippingAddress/',
            { 'address_line_1': address_line_1, 'address_line_2': address_line_2, 'address_line_3': address_line_3, 'distric': distric, 'province':province,
            'postalcode':postalcode },
            config
        )

        dispatch({
            type: USER_SHIPPING_ADDRESS_ADD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_SHIPPING_ADDRESS_ADD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getCardsList = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_PAYMENT_CARD_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(
            `/api/user/paymentCards/`,
            config
        )

        dispatch({
            type: USER_PAYMENT_CARD_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_PAYMENT_CARD_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getAddressList = (country, province, district, town) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_SHIPPING_ADDRESS_LIST_REQUEST
        })

        // const {
        //     userLogin: { userInfo },
        // } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                // Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(
            `/api/users/address/${country}/${province}/${district}/${town}`,
            config
        )

        dispatch({
            type: USER_SHIPPING_ADDRESS_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_SHIPPING_ADDRESS_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}





export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: USER_LOGOUT })
}

