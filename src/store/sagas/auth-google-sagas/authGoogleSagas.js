import { put, call, take, cancel, fork, cancelled } from 'redux-saga/effects';
import AuthService from '../../../services/auth/AuthService';
import {
    AUTH_GOOGLE_ACTION, LOGIN_ACTION, AUTH_ACTION_FAILED
} from '../../actions/auth-action/AuthAction';
import { STOP } from '../../actions/stop-action/StopAction';


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

export default function* auth(){
    try {
        while(yield take(AUTH_GOOGLE_ACTION)){
            yield put({ type: STOP, payload: false})
            const workerTask = yield fork(authGoogle);
            yield take(STOP);
            yield cancel(workerTask);
        }
    } finally {
        if (yield cancelled()) {
            yield put({ type: STOP, payload: true })
        }
    }
}