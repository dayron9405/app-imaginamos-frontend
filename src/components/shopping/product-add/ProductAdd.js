/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';

// reducer
import { useSelector, useDispatch } from 'react-redux';
import { AddCartAction } from '../../../store/actions/add-cart-action/AddCart';

import { Icons } from '../../../utils/constantes/Icons';
import NotFood from '../../../assets/images/no-photo.png';

import './ProductAdd.scss';

export default function ProductAdd(props) {
    const {
        id,
        image,
        description,
        quantityInitial,
        price,
    } = props;
    const [ quantity, setQuantity ] = useState(quantityInitial);
    const [ add, setAdd ] = useState(true);

    useEffect(() => {
        setQuantity(quantityInitial)
    }, [quantityInitial])

    const dispatch = useDispatch();
    const listProductsCart = useSelector(state => state.cart.listProductsCart);
    const addProductCart = (state) => {
        dispatch(AddCartAction(state));
    }
    const addProduct = (add) => {
        const productIndex = listProductsCart.findIndex(item => item.id === id);
        if (productIndex >= 0) {
            if (add) {
                listProductsCart[productIndex].quantityInitial += 1;
            } else {
                listProductsCart[productIndex].quantityInitial -= 1;
            }
            setQuantity(listProductsCart[productIndex].quantityInitial)
            addProductCart(listProductsCart);
        }
    }

    const removeProduct = () => {
        // setAdd(false);
        // setTimeout(() => {
            const productIndex = listProductsCart.findIndex(item => item.id === id);
            if (productIndex >= 0) {
                listProductsCart.splice(productIndex, 1)
                addProductCart(listProductsCart);
                // setAdd(true);
            }
        // }, 500);
    }

    const onError = (e) => {
        e.target.onerror = null;
        e.target.src=NotFood;
    }

    return (
        <div className={`productadd ${add ? 'fadeInRight' : 'fadeOutLeft'}`}>
            <div className='productadd-product'>
                <img className='productadd-product-img' src={image} onError={(e)=> onError(e)} />
            </div>
            {(quantityInitial && quantityInitial > 0) 
                ? <div className='productadd-description'> 
                    <span className='productadd-description-quantity'>{ quantity }</span>
                    <div className='productadd-description-action'>
                        <span className='productadd-description-action-triangleUp' onClick={() => addProduct(true)}></span>
                        <span className='productadd-description-action-triangleDown' onClick={() => addProduct(false)}></span>
                    </div>
                    <span>{ description }</span>
                </div>
                : <div className='productadd-description'> 
                    <span>{ description }</span>
                </div>
            }
            <div className='productadd-price'>
                { quantity && price
                    ? `$${ Math.round((quantity * price) * 100) / 100 }`
                    : `$${ Math.round((price * 100)) / 100 }`
                }
                { quantity && price 
                    ?<div className='icon-button' onClick={removeProduct}>
                        <img className='icon' src={Icons.delete} />
                    </div>
                    : ''
                }
            </div>
        </div>
    )
}