/* eslint-disable import/no-anonymous-default-export */
import { COUNT_CART_ACTION } from '../../actions/count-cart-action/CountCartAction'

const initialProps = {
    count: 0
}

export default function(state = initialProps, action) {
    switch (action.type) {
        case COUNT_CART_ACTION:
            return {
                ...state,
                count: action.payload
            }
    
        default:
            return state;
    }
}