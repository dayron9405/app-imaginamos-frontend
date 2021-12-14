import { all } from 'redux-saga/effects'

//Sagas
import auth from './auth-sagas';
import products from './products-sagas';

export default function* rootSaga() {
    yield all([
        auth(),
        products()
    ])
  }