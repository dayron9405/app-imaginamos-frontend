/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState ,useEffect } from 'react';

// reducer
import { useSelector, useDispatch } from 'react-redux';
import { alertsOpenClose } from '../../store/actions/alerts-action/AlertsAction';

import './Alerts.scss';

export default function Alerts() {
    const [ closeAlert, setCloseAlert ] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setCloseAlert(true);
            setTimeout(() => {
                closeAlertStore();
            }, 500);
        }, 6000);
    }, [])

    const dispatch = useDispatch();
    const closeAlertStore = () => {
        dispatch(alertsOpenClose({ type: null, active: false, message: '' }));
    }

    const type = useSelector(state => state.alerts.type);
    const message = useSelector(state => state.alerts.message);

    const closeAlertAction = () => {
        setCloseAlert(true);
        setTimeout(() => {
            closeAlertStore();
        }, 500);
    }

    return(
        <div 
            className={`alerts ${closeAlert ? 'fadeOutLeft' : 'fadeInLeft'} ${type ? type : 'no-type'}` }
        >
            <div className='alerts-close' onClick={closeAlertAction}>
                <span 
                    className='alerts-close-icon icon-close' 
                ></span>
            </div>
            <div
                className='alerts-message'
            >
                { message }
            </div>
        </div>
    )
}