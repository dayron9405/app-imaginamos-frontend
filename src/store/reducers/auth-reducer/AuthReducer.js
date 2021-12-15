/* eslint-disable import/no-anonymous-default-export */
import { 
    AUTH_GOOGLE_ACTION, AUTH_FACEBOOK_ACTION, AUTH_MICROSOFT_ACTION, LOGIN_ACTION, SIGNOUT_ACTION, AUTH_ACTION_FAILED
} from '../../actions/auth-action/AuthAction';

const initialProps = {
    user: {},
    login: false,
    authError: null
}

export default function(state = initialProps, action) {
    console.log('action auth', action)
    switch (action.type) {
        case AUTH_GOOGLE_ACTION:
            return {
                ...state,
                user: action.payload ? action.payload : {}
            }

        case AUTH_FACEBOOK_ACTION:
            return {
                ...state,
                user: action.payload
            }
    
        case AUTH_MICROSOFT_ACTION:
            return {
                ...state,
                user: action.payload
            }

        case LOGIN_ACTION:
            return {
                ...state,
                login: action.payload
            }

        case SIGNOUT_ACTION:
            return {
                ...initialProps
            }

        case AUTH_ACTION_FAILED:
            return {
                ...state,
                authError: action.payload
            }

        default:
            return state;
    }
}