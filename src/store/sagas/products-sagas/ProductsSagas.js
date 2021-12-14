import { put, takeEvery, takeLatest, all, call, cancel, cancelled, take, fork, delay } from 'redux-saga/effects'
import ProductService from '../../../services/products/ProductsServices';
import { PRODUCTS_LIST_ACTION, PRODUCTS_LIST_ACTION_FAILED } from '../../actions/products-list-action/ProductsListAction';

function* getProductsList(){
    // try {
    //     while (true) {
    //     //   yield put(actions.requestStart())
    //         const products = yield call(ProductService.getProducts)
    //         const listProducts = [];
    //         products.forEach((doc) => {
    //             listProducts.push({
    //             uid: doc.id,
    //             ...doc.data()
    //             })
    //         });
    //         yield put({ type: PRODUCTS_LIST_ACTION, payload: listProducts})
    //         yield delay(5000)
    //     }
    // } finally {
    //     if (yield cancelled()){
    //         console.log('canceled')
    //     }
    //     //   yield put(actions.requestFailure('Sync cancelled!'))
    // }
    try {
        const products = yield call(ProductService.getProducts);
        console.log('products', products)
        const listProducts = [];
         products.forEach((doc) => {
            listProducts.push({
               uid: doc.id,
               ...doc.data()
            })
        });
        console.log('listProducts', listProducts)
        yield put({ type: PRODUCTS_LIST_ACTION, payload: listProducts})
    } catch (error) {
        yield put({ type: PRODUCTS_LIST_ACTION_FAILED, payload: error.message })
    }finally {
        yield cancelled(getProductsList)
        yield cancel(getProductsList)
    }
}

function* cancelWorkerSaga (task) {
    yield cancel(task)
}

export default function* products(){
    // while ( yield take(PRODUCTS_LIST_ACTION) ) {
    //     // starts the task in the background
    //     const bgSyncTask = yield fork(getProductsList)
    
    //     // wait for the user stop action
    //     // yield take('STOP_BACKGROUND_SYNC')
    //     // user clicked stop. cancel the background task
    //     // this will cause the forked bgSync task to jump into its finally block
    //     yield cancel(bgSyncTask)
    // }
    // yield* takeEvery([PRODUCTS_LIST_ACTION], getProductsList)
    yield takeLatest(PRODUCTS_LIST_ACTION, getProductsList);
}