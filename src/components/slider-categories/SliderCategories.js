/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

import { Icons } from '../../utils/constantes/Icons';

import './SliderCategories.scss';

export default function SliderCategories(props) {
    const {
        inx,
        icon,
        category,
        selected,
        changeSelected
    } = props;

    const change = () => {
        changeSelected(inx)
    }

    return (
        <div className={`slider ${selected ? 'selected': ''}`} onClick={change}>
            <div className='slider-icon'>
                <img className='slider-icon-img' src={Icons[icon]} />
            </div>
            <span className='slider-name'>
                { category }
            </span>
        </div>
    )
}