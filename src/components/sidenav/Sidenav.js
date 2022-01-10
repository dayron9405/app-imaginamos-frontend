import React from 'react';

// reducer
import { useDispatch, useSelector } from 'react-redux';
import { MenuOpenCloseAction } from '../../store/actions/sidenav-action/MenuAction';

import './Sidenav.scss';

export default function Sidenav(){

    const dispatch = useDispatch();
    const closeSidenav = () => {
        dispatch(MenuOpenCloseAction(false))
    }
    const sidenav = useSelector(state => state.sidenav.menu);
    const shopping = useSelector(state => state.sidenav.cart);

    return(
        <div className='sidenav'
            style={{ 
                width: sidenav && shopping 
                    ? '330px' 
                    : sidenav || shopping  
                    ? '400px' : '0px' 
            }}
        >
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