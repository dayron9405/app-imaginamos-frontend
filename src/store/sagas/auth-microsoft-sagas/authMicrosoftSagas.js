import { put, call, take, cancel, fork, cancelled } from 'redux-saga/effects';
import AuthService from '../../../services/auth/AuthService';
import {
    AUTH_MICROSOFT_ACTION, LOGIN_ACTION, AUTH_ACTION_FAILED
} from '../../actions/auth-action/AuthAction';
import { ALERTS_ACTION } from '../../actions/alerts-action/AlertsAction';
import { STOP } from '../../actions/stop-action/StopAction';

function* authMicrosoft(){
    try {
        const authRes = yield call(AuthService.registerMicrosoft);
        yield put({ type: LOGIN_ACTION, payload: true});
        yield put({ 
            type: ALERTS_ACTION, 
            payload: { 
                type: 'succes', 
                active: true, 
                message: 'Autenticado con Microsoft Exitosamente!!!' 
            } 
        });
        yield put({ type: AUTH_MICROSOFT_ACTION, payload: authRes});
    } catch (error) {
        yield put({ type: AUTH_ACTION_FAILED, payload: error.message })
    } finally {
        yield put({ type: STOP, payload: true })
    }
}

export default function* auth(){
    try {
        while(yield take(AUTH_MICROSOFT_ACTION)){
            yield put({ type: STOP, payload: false})
            const workerTask = yield fork(authMicrosoft);
            yield take(STOP);
            yield cancel(workerTask);
        }
    } finally {
        if (yield cancelled()) {
            yield put({ type: STOP, payload: true })
        }
    }
}