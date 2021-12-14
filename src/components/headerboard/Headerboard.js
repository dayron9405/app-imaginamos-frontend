/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

import HeadImage from '../../assets/images/headerimage.png';
import Divert from '../../assets/images/d.png';

import { Icons } from '../../utils/constantes/Icons';

import './Headerboard.scss';

export default function headerboard(){

    return (
        <div className='headerboard'>
            <div className='headerboard-principal'>
                <div className='headerboard-principal-start'>
                    <img className='headerboard-principal-start-img' src={HeadImage} />
                </div>
                <div className='headerboard-principal-center'>
                    <div className='headerboard-principal-center-head'>
                        <h1>$0 delivery for 30 days!</h1>
                        <img className='headerboard-principal-start-img' src={Divert} />
                    </div>
                    <p>$0 delivery fee for orders over $10 for 30 days</p>
                </div>
                <div className='headerboard-principal-end'>
                    <span>
                        Learn more
                    </span>
                    <img src={Icons.arrowRight} />
                </div>
            </div>
            <div className='headerboard-secondary'>
                <div className='headerboard-secondary-title'>
                    <h1>Restaurants</h1>
                    <img src={Icons.burgerColor} />
                </div>
                <div className='headerboard-secondary-button'>
                    <img className='headerboard-secondary-button-clock icon' src={Icons.clock} />
                    <span>Delivery: <strong>Now</strong> </span>
                    <img className='headerboard-secondary-button-arrow' src={Icons.arrow} />
                </div>
            </div>
        </div>
    )
}