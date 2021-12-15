import { all } from 'redux-saga/effects'

//Sagas
import authGoogle from './auth-google-sagas';
import authFacebook from './auth-facebook-sagas';
import authMicrosoft from './auth-microsoft-sagas';
import signOut from './sign-out';
import products from './products-sagas';

export default function* rootSaga() {
    yield all([
        authGoogle(),
        authFacebook(),
        authMicrosoft(),
        signOut(),
        products()
    ])
  }