import { put, takeEvery, call, take, cancel, fork, cancelled } from 'redux-saga/effects';
import AuthService from '../../../services/auth/AuthService';
import {
    AUTH_GOOGLE_ACTION, AUTH_FACEBOOK_ACTION, AUTH_MICROSOFT_ACTION, LOGIN_ACTION, SIGNOUT_ACTION, AUTH_ACTION_FAILED
} from '../../actions/auth-action/AuthAction';
import { STOP } from '../../actions/stop-action/StopAction';

function* authFacebook(){
    try {
        const authRes = yield call(AuthService.registerFacebook);
        yield put({ type: AUTH_FACEBOOK_ACTION, payload: authRes});
        yield put({ type: LOGIN_ACTION, payload: true});
    } catch (error) {
        yield put({ type: AUTH_ACTION_FAILED, payload: error.message })
    } finally {
        yield put({ type: STOP, payload: true })
    }
}

function* authGoogle(){
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
    } catch (error) {
        yield put({ type: AUTH_ACTION_FAILED, payload: error.message })
    } finally {
        yield put({ type: STOP, payload: true })
    }
}

function* authMicrosoft(){
    try {
        const authRes = yield call(AuthService.registerMicrosoft);
        yield put({ type: AUTH_MICROSOFT_ACTION, payload: authRes});
        yield put({ type: LOGIN_ACTION, payload: true});
    } catch (error) {
        yield put({ type: AUTH_ACTION_FAILED, payload: error.message })
    } finally {
        yield put({ type: STOP, payload: true })
    }
}

function* signOut(){
    try {
        const signOutRes = yield takeEvery(AuthService.signOutFirebase);
        yield put({ type: SIGNOUT_ACTION, payload: signOutRes });
    } catch (error) {
        yield put({ type: AUTH_ACTION_FAILED, payload: error.message })
    } finally {
        yield put({ type: STOP, payload: true })
    }
}

export default function* auth(){
    try {
        while(yield take(AUTH_FACEBOOK_ACTION)){
            yield put({ type: STOP, payload: false})
            const workerTask = yield fork(authFacebook);
            yield take(STOP);
            yield cancel(workerTask);
        }
        while(yield take(AUTH_GOOGLE_ACTION)){
            yield put({ type: STOP, payload: false})
            const workerTask = yield fork(authGoogle);
            yield take(STOP);
            yield cancel(workerTask);
        }
        while(yield take(AUTH_MICROSOFT_ACTION)){
            yield put({ type: STOP, payload: false})
            const workerTask = yield fork(authMicrosoft);
            yield take(STOP);
            yield cancel(workerTask);
        }
        while(yield take(SIGNOUT_ACTION)){
            yield put({ type: STOP, payload: false})
            const workerTask = yield fork(signOut);
            yield take(STOP);
            yield cancel(workerTask);
        }
    } finally {
        if (yield cancelled()) {
            yield put({ type: STOP, payload: true })
        }
    }
}