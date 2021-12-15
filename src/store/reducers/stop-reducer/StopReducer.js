/* eslint-disable import/no-anonymous-default-export */
import { STOP } from '../../actions/stop-action/StopAction';

const initialProps = {
    stop: true
}

export default function(state = initialProps, action) {
    switch (action.type) {
        case STOP:
            return {
                ...state,
                stop: action.payload
            }
    
        default:
            return state;
    }
}