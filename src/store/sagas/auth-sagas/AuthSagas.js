import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects';
import AuthService from '../../../services/auth/AuthService';

import { 
    AUTH_GOOGLE_ACTION, AUTH_FACEBOOK_ACTION, AUTH_MICROSOFT_ACTION, LOGIN_ACTION, SIGNOUT_ACTION, AUTH_ACTION_FAILED
} from '../../actions/auth-action/AuthAction';

function* authGoogle({ payload }){
    try {
        const authRes = yield call(AuthService.registerGoogle);
        const dataAuth = {
            uid: authRes.user.uid,
            accessToken: authRes.user.accessToken,
            name: authRes.user.displayName,
            email: authRes.user.email,
        }
        yield put({ type: LOGIN_ACTION, payload: true});
        yield put({ type: AUTH_GOOGLE_ACTION, payload: dataAuth});
        yield call(authRes);
    } catch (error) {
        yield put({ type: AUTH_ACTION_FAILED, payload: error.message });
    }
}

function* authFacebook({ payload }){
    try {
        const authRes = yield call(AuthService.registerFacebook);
        yield put({ type: AUTH_FACEBOOK_ACTION, payload: authRes});
        yield put({ type: LOGIN_ACTION, payload: true});
    } catch (error) {
        yield put({ type: AUTH_ACTION_FAILED, payload: error.message })
    }
}

function* authMicrosoft({ payload }){
    try {
        const authRes = yield call(AuthService.registerMicrosoft);
        yield put({ type: AUTH_MICROSOFT_ACTION, payload: authRes});
        yield put({ type: LOGIN_ACTION, payload: true});
    } catch (error) {
        yield put({ type: AUTH_ACTION_FAILED, payload: error.message })
    }
}

function* signOut(){
    try {
        const signOutRes = yield takeEvery(AuthService.signOutFirebase);
        yield put({ type: SIGNOUT_ACTION, payload: signOutRes });
    } catch (error) {
        yield put({ type: AUTH_ACTION_FAILED, payload: error.message })
    }
}

export default function* auth(){
    yield takeLatest(AUTH_GOOGLE_ACTION, authGoogle);
    yield takeLatest(AUTH_FACEBOOK_ACTION, authFacebook);
    yield takeLatest(AUTH_MICROSOFT_ACTION, authMicrosoft);
    yield takeLatest(SIGNOUT_ACTION, signOut);
}