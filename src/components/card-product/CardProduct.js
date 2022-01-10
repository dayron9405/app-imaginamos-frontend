/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';

// reducer
import { useSelector, useDispatch } from 'react-redux';
import { AddCartAction } from '../../store/actions/add-cart-action/AddCart';
import { alertsOpenClose } from '../../store/actions/alerts-action/AlertsAction';

import NotFood from '../../assets/images/no-photo.png';
import { Icons } from '../../utils/constantes/Icons';

import './CardProduct.scss';

export default function CardProduct(props) {
    const {
        id,
        image,
        title,
        minutes,
        qualification,
        description,
        price
    } = props;
    const [ showCart, setShowCart ] = useState(false);
    
    const mouseEnter = () => {
        setShowCart(true);
    }
    
    const mouseLeave = () => {
        setShowCart(false);
    }
    
    const dispatch = useDispatch();
    const listProductsCart = useSelector(state => state.cart.listProductsCart);
    const addProductCart = (state) => {
        dispatch(AddCartAction(state));
        dispatch(alertsOpenClose({ 
            type: 'succes', 
            active: true, 
            message: 'Producto Agregado Exitosamente' 
        } ))
    }
    const addProduct = () => {
        const productIndex = listProductsCart.findIndex(item => item.id === id);
        if (productIndex >= 0) {
            listProductsCart[productIndex].quantityInitial += 1;
            addProductCart(listProductsCart);
        }else {
            listProductsCart.push({
                id,
                image,
                description,
                quantityInitial: 1,
                price,
            });
            addProductCart(listProductsCart);
        }
    }

    return (
        <div className='card' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={addProduct}>
            <div className='card-background' style={{ backgroundImage: `url(${image}), url(${NotFood})` }}>
                { showCart 
                    ?<div className='card-background-cart'>
                        <img className='card-background-cart-img' src={Icons.shopping} />
                        <span className='card-background-cart-label'>
                            <strong>{ minutes ? minutes.split('min').join('') : minutes }</strong>
                            <small> min</small>
                        </span>
                    </div>
                    :<div className='card-background-content'>
                        <span className='card-background-content-label'>
                            <strong>{ minutes ? minutes.split('min').join('') : minutes }</strong>
                            <small> min</small>
                        </span>
                    </div>
                }
            </div>
            <div className='card-content'>
                <div className='card-content-principal'>
                    <span>{ title }</span>
                </div>
                <div className='card-content-secondary'>
                    <div className='card-content-secondary-qualify'>
                        <img className='card-content-secondary-qualify-img' src={Icons.start} />
                        <span className='card-content-secondary-qualify-label'>{ qualification }</span>
                    </div>
                    <span className='card-content-secondary-description'>{ description }</span>
                    <span className='card-content-secondary-price'>${ price }</span>
                </div>
            </div>
        </div>
    )
}