export const PRODUCTS_LIST_ACTION = 'PRODUCTS_LIST_ACTION';
export const ProductListAction = (state) => {
    return {
        type: PRODUCTS_LIST_ACTION,
        payload: state
    };
};

export const PRODUCTS_LIST_ACTION_FAILED = 'PRODUCTS_LIST_ACTION_FAILED';
export const ProductsFailedAction = (state) => {
    return {
        type: PRODUCTS_LIST_ACTION_FAILED,
        payload: state
    };
};