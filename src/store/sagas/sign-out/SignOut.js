import { put, takeEvery, take, cancel, fork, cancelled } from 'redux-saga/effects';
import AuthService from '../../../services/auth/AuthService';
import {
    SIGNOUT_ACTION, AUTH_ACTION_FAILED
} from '../../actions/auth-action/AuthAction';
import { ALERTS_ACTION } from '../../actions/alerts-action/AlertsAction';
import { STOP } from '../../actions/stop-action/StopAction';

function* signOut(){
    try {
        yield put({ type: ALERTS_ACTION, payload: { type: 'info', active: true, message: 'Cerro Sesión Exitosamente!!!' } })
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