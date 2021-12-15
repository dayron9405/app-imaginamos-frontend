import { put, takeLatest, call, cancel, cancelled, takeEvery, fork, take } from 'redux-saga/effects'
import ProductService from '../../../services/products/ProductsServices';
import { PRODUCTS_LIST_ACTION, PRODUCTS_LIST_ACTION_FAILED } from '../../actions/products-list-action/ProductsListAction';
import { STOP } from '../../actions/stop-action/StopAction';

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
    } finally {
        yield put({ type: STOP, payload: true })
    }
}

export default function* products(){
    try {
        while(yield take(PRODUCTS_LIST_ACTION)){
            yield put({ type: STOP, payload: false})
            const workerTask = yield fork(getProductsList);
            yield take(STOP);
            yield cancel(workerTask);
        }
    } finally {
        if (yield cancelled()) {
            yield put({ type: STOP, payload: true })
        }
    }
}