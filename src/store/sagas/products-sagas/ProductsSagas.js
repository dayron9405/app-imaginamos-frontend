import { put, takeLatest, call, cancel, cancelled } from 'redux-saga/effects'
import ProductService from '../../../services/products/ProductsServices';
import { PRODUCTS_LIST_ACTION, PRODUCTS_LIST_ACTION_FAILED } from '../../actions/products-list-action/ProductsListAction';

function* getProductsList(){
    try {
        const products = yield call(ProductService.getProducts);
        const listProducts = [];
         products.forEach((doc) => {
            listProducts.push({
               uid: doc.id,
               ...doc.data()
            })
        });
        yield put({ type: PRODUCTS_LIST_ACTION, payload: listProducts})
    } catch (error) {
        yield put({ type: PRODUCTS_LIST_ACTION_FAILED, payload: error.message })
    }finally {
        yield cancelled(getProductsList)
        yield cancel(getProductsList)
    }
}

export default function* products(){
    yield takeLatest(PRODUCTS_LIST_ACTION, getProductsList);
}