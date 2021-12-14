import React from 'react';

// reducer
import { useSelector } from 'react-redux';

// components
import NotificationCard from '../../components/notification-card';
import Toolbar from '../../components/toolbar';
import Headerboard from '../../components/headerboard';
import Sidenav from '../../components/sidenav';
import Shopping from '../../components/shopping';

// views
import Products from '../products';

import './Home.scss';

export default function Home(){

    const sidenav = useSelector(state => state.sidenav.menu);
    const shopping = useSelector(state => state.sidenav.cart);
    const notification = useSelector(state => state.notification.card);

    return (
        <div className='home'>
            { notification 
                ? <NotificationCard />
                : null
            }
            <nav 
                className={`home-sidenav ${sidenav ? 'fadeInRight' : 'fadeOutRight'}`} 
                style={{ display: sidenav ? 'flex' : 'none' }} 
            >
                <Sidenav />
            </nav>
            <div  
                style={{ 
                    width: sidenav && shopping 
                        ? 'calc(100vw - 735px)' 
                        : sidenav || shopping  
                        ? 'calc(100vw - 400px)' : '100vw' 
                }}
                className='home-body'
            >
                <menu className='home-body-toolbar'>
                    <Toolbar />
                </menu>
                <header className='home-body-head'>
                    <Headerboard />
                </header>
                <div className='home-body-content'>
                    <Products />
                </div>
            </div>
            <aside 
                className={`home-shopping ${shopping ? 'fadeInLeft' : 'fadeOutLeft'}`}
                style={{ display: shopping ? 'flex' : 'none' }} 
            >
                <Shopping />
            </aside>
        </div>
    )
}