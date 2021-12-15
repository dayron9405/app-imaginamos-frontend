import React from 'react';

// reducer
import { useDispatch } from 'react-redux';
import { MenuOpenCloseAction } from '../../store/actions/sidenav-action/MenuAction';

import './Sidenav.scss';

export default function Sidenav(){

    const dispatch = useDispatch();
    const closeSidenav = () => {
        dispatch(MenuOpenCloseAction(false))
    }

    return(
        <div className='sidenav'>
            <div className='sidenav-content'>
                <div className='sidenav-content-close'>
                    <span className='icon-button icon-close' onClick={closeSidenav}></span>
                </div>
                <div className='sidenav-content-body'>
                    Sidenav
                </div>
            </div>
            <hr />
        </div>
    )
}