/* eslint-disable import/no-anonymous-default-export */
import { PRODUCTS_LIST_ACTION, PRODUCTS_LIST_ACTION_FAILED } from '../../actions/products-list-action/ProductsListAction';

const initialProps = {
    list: [],
    productsError: null
}

export default function(state = initialProps, action) {
    switch (action.type) {
        case PRODUCTS_LIST_ACTION:
            return {
                ...state,
                list: action.payload
            }

        case PRODUCTS_LIST_ACTION_FAILED:
            return {
                ...state,
                productsError: action.payload
            }
    
        default:
            return state;
    }
}