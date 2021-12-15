import { put, call, take, cancel, fork, cancelled } from 'redux-saga/effects';
import AuthService from '../../../services/auth/AuthService';
import {
    AUTH_FACEBOOK_ACTION, LOGIN_ACTION, AUTH_ACTION_FAILED
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

export default function* auth(){
    try {
        while(yield take(AUTH_FACEBOOK_ACTION)){
            yield put({ type: STOP, payload: false})
            const workerTask = yield fork(authFacebook);
            yield take(STOP);
            yield cancel(workerTask);
        }
    } finally {
        if (yield cancelled()) {
            yield put({ type: STOP, payload: true })
        }
    }
}