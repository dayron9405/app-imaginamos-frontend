/* eslint-disable import/no-anonymous-default-export */
import { ALERTS_ACTION } from '../../actions/alerts-action/AlertsAction';
const initialProps = {
    type: null,
    active: false,
    message: ''
}

export default function(state = initialProps, action) {
    switch (action.type) {
        case ALERTS_ACTION:
            return {
                ...state,
                type: action.payload.type,
                active: action.payload.active,
                message: action.payload.message,
            };
        default:
            return state;
    }
}