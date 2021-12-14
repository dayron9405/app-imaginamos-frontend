/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

// reducer
import { useSelector, useDispatch } from 'react-redux';
import { MenuOpenCloseAction } from '../../store/actions/sidenav-action/MenuAction';
import { ShoppingCartOpenCloseAction } from '../../store/actions/sidenav-action/ShoppingCartAction';
import { signOutAction } from '../../store/actions/auth-action/AuthAction';
import { notificationCardOpenClose } from '../../store/actions/notification-action/NotificationAction';

import { Icons } from '../../utils/constantes/Icons';

import './Toolbar.scss'

export default function Toolbar() {
    const dispatch = useDispatch();
    const login = useSelector(state => state.authentication.login);

    const sidenav = useSelector(state => state.sidenav.menu);
    const MenuCloseOpenAction = (state) => dispatch(MenuOpenCloseAction(state));
    const handleMenuCloseOpen = () => {
        const stateMenu = !sidenav;
        MenuCloseOpenAction(stateMenu);
    }

    const shopping = useSelector(state => state.sidenav.cart);
    const ShoppingCloseOpenAction = (state) => dispatch(ShoppingCartOpenCloseAction(state));
    const handleShoppingCloseOpen = () => {
        const stateCart = !shopping;
        ShoppingCloseOpenAction(stateCart);
    }

    const openNotification = () => {
        dispatch(notificationCardOpenClose(true));
    }

    const signOut = () => {
        dispatch(signOutAction());
    }
    

    return (
        <div className='toolbar'> 
            <span className='icon-button'onClick={handleMenuCloseOpen}>
                <img className='icon' src={ Icons['menu'] } />
            </span>
            <span className='toolbar-span'>Chukwudi</span>
            <div className='toolbar-input'>
                <img className='icon' src={ Icons['search'] } />
                <input className='input-custom' type="text" placeholder='Search' />
            </div>
            { !login
                ?   <div className='toolbar-register' onClick={openNotification}>
                        <h4>SignIn</h4>
                        <span className='toolbar-register-icon icon-enter'></span>
                    </div>
                :   <div className='toolbar-logout' onClick={signOut}>
                        <h4>SignOut</h4>
                        <span className='toolbar-logout-icon icon-exit'></span>
                    </div>
            }
            <span className='toolbar-shopping icon-button' onClick={handleShoppingCloseOpen}>
                <img className='icon' src={ Icons['shopping'] } />
            </span>
        </div>
    )
}