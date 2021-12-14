/* eslint-disable import/no-anonymous-default-export */
const initialProps = {
    menu: false,
    cart: false
}

export default function(state = initialProps, action) {
    switch (action.type) {
        case 'MENU_ACTION':
            return {
                ...state,
                menu: action.payload
            };
        case 'CART_ACTION':
            return {
                ...state,
                cart: action.payload
            };
        default:
            return state;
    }
}