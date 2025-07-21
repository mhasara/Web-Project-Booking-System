import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,

    PRODUCT_VARIANTS_REQUEST,
    PRODUCT_VARIANTS_SUCCESS,
    PRODUCT_VARIANTS_FAIL,

    PRODUCT_VARIANTS_TYPE_REQUEST,
    PRODUCT_VARIANTS_TYPE_SUCCESS,
    PRODUCT_VARIANTS_TYPE_FAIL,
    PRODUCT_VARIANTS_TYPE_RESET,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,

    PRODUCT_SEARCH_REQUEST,
    PRODUCT_SEARCH_SUCCESS,
    PRODUCT_SEARCH_FAIL,

    PRODUCT_VARIANT_COMINATION_PRICE_REQUEST,
    PRODUCT_VARIANT_COMINATION_PRICE_SUCCESS,
    PRODUCT_VARIANT_COMINATION_PRICE_FAIL,
    PRODUCT_VARIANT_COMINATION_PRICE_RESET,

} from '../constants/productConstants'


export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`/api/products`)

        dispatch({ 
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })

        const { data } = await axios.get(`/api/products/top/`)

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listProductDetails = (slug) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${slug}/`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getProductVariants = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_VARIANTS_REQUEST })

        const { data } = await axios.get(`/api/products/variants/${id}/`)

        dispatch({
            type: PRODUCT_VARIANTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_VARIANTS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getProductVariantsTypes = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_VARIANTS_TYPE_REQUEST })

        const { data } = await axios.get(`/api/products/VARIANTSTypes/`)

        dispatch({
            type: PRODUCT_VARIANTS_TYPE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_VARIANTS_TYPE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        )
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })



    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const searchProduct = (product) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_SEARCH_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const { data } = await axios.get(
            `/api/products/search/${product}/`,
            config
        )
        dispatch({
            type: PRODUCT_SEARCH_SUCCESS,
            payload: data,
        })



    } catch (error) { 
        dispatch({
            type: PRODUCT_SEARCH_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getProductVariantPrice = (product, v1, v2, v3) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_VARIANT_COMINATION_PRICE_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const { data } = await axios.get(
            `/api/products/${product}/${v1}/${v2}/${v3}`,
            config
        )
        dispatch({
            type: PRODUCT_VARIANT_COMINATION_PRICE_SUCCESS,
            payload: data,
        })



    } catch (error) { 
        dispatch({
            type: PRODUCT_VARIANT_COMINATION_PRICE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}