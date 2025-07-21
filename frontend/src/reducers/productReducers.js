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
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_VARIANTS_REQUEST,
    PRODUCT_VARIANTS_SUCCESS,
    PRODUCT_VARIANTS_FAIL,
    PRODUCT_VARIANTS_RESET,

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


export const productListReducer = (state = { }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true }

        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const productDetailsReducer = (state = {  }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }

        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}


export const productTopRatedReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload, }

        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productVariantsReducer = (state = { }, action) => {
    switch (action.type) {
        case PRODUCT_VARIANTS_REQUEST:
            return { loading: true }

        case PRODUCT_VARIANTS_SUCCESS:
            return { loading: false, variants: action.payload, }

        case PRODUCT_VARIANTS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productVariantsTypeReducer = (state = { }, action) => {
    switch (action.type) {
        case PRODUCT_VARIANTS_TYPE_REQUEST:
            return { loading: true }

        case PRODUCT_VARIANTS_TYPE_SUCCESS:
            return { loading: false, variantsType: action.payload, }

        case PRODUCT_VARIANTS_TYPE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productSearchReducer = (state = { }, action) => {
    switch (action.type) {
        case PRODUCT_SEARCH_REQUEST:
            return { loading: true }

        case PRODUCT_SEARCH_SUCCESS:
            return { loading: false, searchProducts: action.payload, }

        case PRODUCT_SEARCH_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productVariantCominationPriceReducer = (state = { }, action) => {
    switch (action.type) {
        case PRODUCT_VARIANT_COMINATION_PRICE_REQUEST:
            return { loading: true }

        case PRODUCT_VARIANT_COMINATION_PRICE_SUCCESS:
            return { loading: false, variantComination: action.payload, }

        case PRODUCT_VARIANT_COMINATION_PRICE_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_VARIANT_COMINATION_PRICE_RESET:
            return {}

        default:
            return state
    }
}

