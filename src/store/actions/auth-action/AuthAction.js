export const AUTH_GOOGLE_ACTION = 'AUTH_GOOGLE_ACTION';
export const AuthGoogleAction = (state) => {
    return {
        type: AUTH_GOOGLE_ACTION,
        payload: state
    };
};

export const AUTH_FACEBOOK_ACTION = 'AUTH_FACEBOOK_ACTION';
export const AuthFacebookAction = (state) => {
    return {
        type: AUTH_FACEBOOK_ACTION,
        payload: state
    };
};

export const AUTH_MICROSOFT_ACTION = 'AUTH_MICROSOFT_ACTION';
export const AuthMicrosoftAction = (state) => {
    return {
        type: AUTH_MICROSOFT_ACTION,
        payload: state
    };
};

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const loginAction = (state) => {
    return {
        type: LOGIN_ACTION,
        payload: state
    };
};

export const SIGNOUT_ACTION = 'SIGNOUT_ACTION';
export const signOutAction = (state) => {
    return {
        type: SIGNOUT_ACTION,
        payload: state
    };
};

export const AUTH_ACTION_FAILED = 'AUTH_ACTION_FAILED';
export const AuthFailedAction = (state) => {
    return {
        type: AUTH_ACTION_FAILED,
        payload: state
    };
};

