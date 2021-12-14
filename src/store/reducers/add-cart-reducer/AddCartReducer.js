/* eslint-disable import/no-anonymous-default-export */
const initialProps = {
    listProductsCart: [] 
}

export default function(state = initialProps, action) {
    switch (action.type) {
        case 'ADD_CART_ACTION':
            return {
                ...state,
                listProductsCart: action.payload
            }
    
        default:
            return state;
    }
}