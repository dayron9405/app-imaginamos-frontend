/* eslint-disable import/no-anonymous-default-export */
import { NOTIFICATION_ACTION } from '../../actions/notification-action/NotificationAction';
const initialProps = {
    card: false
}

export default function(state = initialProps, action) {
    switch (action.type) {
        case NOTIFICATION_ACTION:
            return {
                ...state,
                card: action.payload
            };
        default:
            return state;
    }
}