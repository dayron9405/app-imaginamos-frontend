import React from 'react';

//redux
import { useDispatch } from 'react-redux';
import { notificationCardOpenClose } from '../../store/actions/notification-action/NotificationAction';
import { AuthGoogleAction, AuthFacebookAction, AuthMicrosoftAction } from '../../store/actions/auth-action/AuthAction';

import './NotificationCard.scss';

export default function NotificationCard(){
    const dispatch = useDispatch();
    const closeNotification = () => {
        dispatch(notificationCardOpenClose(false));
    }

    const signInGoogle = () => {
        dispatch(AuthGoogleAction());
    }

    const signInFacebook = () => {
        dispatch(AuthFacebookAction());
    }

    const signInMicrosoft = () => {
        dispatch(AuthMicrosoftAction());
    }

    return (
        <div className="notification fadeInFast">
            <div className="notification-card">
            <span className='notification-card-close icon-button icon-close' onClick={closeNotification}></span>
            <h1>sign in with</h1>
            <div className='notification-card-button google' onClick={signInGoogle}>
                <span className='notification-card-button-icon icon-google-plus3'></span>
                <h3>Google</h3>
            </div>
            <div className='notification-card-button facebook' onClick={signInFacebook}>
                <span className='notification-card-button-icon icon-facebook2'></span>
                <h3>facebook</h3>
            </div>
            <div className='notification-card-button microsoft' onClick={signInMicrosoft}>
                <span className='notification-card-button-icon icon-windows8'></span>
                <h4>Microsoft</h4>
            </div>
            </div>
        </div>
    )
}