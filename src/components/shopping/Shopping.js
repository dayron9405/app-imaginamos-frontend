/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';

//redux
import { useDispatch, connect } from 'react-redux';
import { AddCartAction } from '../../store/actions/add-cart-action/AddCart';
import { CountCartAction } from '../../store/actions/count-cart-action/CountCartAction';
import { ShoppingCartOpenCloseAction } from '../../store/actions/sidenav-action/ShoppingCartAction';

//components
import ProductAdd from './product-add';

// utils 
import { Icons } from '../../utils/constantes/Icons';

import './Shopping.scss';

function Shopping(props){
    const {
        cart
    } = props;
    const [ products, setProducts ] = useState(cart.listProductsCart);
    const [ count, setCount ] = useState(0);
    const [ totals, setTotals ] = useState(0);

    useEffect(() => {
        observerChanges();
    }, [cart])

    const observerChanges = () => {
        if (products.length > 0) {
            setProducts(cart.listProductsCart)
            const sumtotals = products.reduce((acum, current, inx) => {
                const totalsTemp = (inx !== 1 ? acum.priceTotal : (acum.quantityInitial * acum.price)) + (current.quantityInitial * current.price);
                const countTemp = (inx !== 1 ? acum.countTotal : acum.quantityInitial) + current.quantityInitial;
                return {
                   priceTotal: Math.round((totalsTemp) * 100) / 100,
                   countTotal: countTemp
                };
            })
            const priceTotal = products.length > 1 ? sumtotals.priceTotal : (sumtotals.price * sumtotals.quantityInitial);
            setTotals(priceTotal);
            const countTotal = products.length > 1 ? sumtotals.countTotal : sumtotals.quantityInitial;
            setCount(countTotal);
            dispatch(CountCartAction(countTotal));
        }else{
            setProducts(cart.listProductsCart)
            setTotals(0);
            setCount(0);
            dispatch(CountCartAction(0));
        }
    }

    const dispatch = useDispatch();
    const clearProductCart = (state) => {
        dispatch(AddCartAction(state));
    }
    const clearCart = () => {
        setTotals(0);
        setCount(0);
        setProducts([]);
        clearProductCart([]);
    }

    const closeShopping = () => {
        dispatch(ShoppingCartOpenCloseAction(false))
    }

    return(
        <div className='shopping'>
            <hr className='shopping-line' />
            <div className='shopping-content'>
                <div className='shopping-content-top'>
                    <div className='shopping-content-top-close'>
                        <span className='icon-button icon-close' onClick={closeShopping}></span>
                    </div>
                    <div className='shopping-content-top-end'>
                        <div className='icon-button'>
                            <img className='icon' src={Icons.user} />
                        </div>
                        <span>{ count }</span>
                        <div className='icon-button' onClick={clearCart}>
                            <img className='icon' src={Icons.clear} />
                        </div>
                    </div>
                </div>
                <div className='shopping-content-header'>
                    <div className='shopping-content-header-title'>
                        <div className='shopping-content-header-title-top'>
                            {/* 🤳 */}
                            <h3>My </h3> <span>😎</span>
                        </div>
                        <h3 className='shopping-content-header-title-bottom'>Order</h3>
                    </div>
                    <div className='shopping-content-header-subtitle'>
                        <div className='shopping-content-header-subtitle-top'>
                            <div>
                                <span>625 St Marks Ave</span>
                            </div>
                            <div className='shopping-content-header-subtitle-top-end'>
                                <span>Edit</span>
                            </div>
                        </div>
                        <div className='shopping-content-header-subtitle-bottom'>
                            <div className='shopping-content-header-subtitle-bottom-time'>
                                <div className='shopping-content-header-subtitle-bottom-time-clock'>
                                    <img className='shopping-content-header-subtitle-bottom-time-clock-icon icon' src={Icons.clock} />
                                </div>
                                <span>35 min</span>
                            </div>
                            <div className='shopping-content-header-subtitle-bottom-end'>
                                <span>Choose time</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='shopping-content-products'>
                    <div className='shopping-content-products-list'>
                        { products.map((product, inx) => (
                            <ProductAdd
                                key={inx}
                                id={product.id}
                                image={product.image}
                                description={product.description}
                                quantityInitial={product.quantityInitial}
                                price={product.price}
                            />
                        ))}
                    </div>
                    <div className='shopping-content-products-footer'>
                        <div className='shopping-content-products-footer-totals'>
                            <span className='shopping-content-products-footer-totals-start'>Total:</span>
                            <span className='shopping-content-products-footer-totals-price'>$ { totals }</span>
                        </div>
                        <hr className='shopping-content-products-footer-line' />
                        <div className='shopping-content-products-footer-action'>
                            <div className='shopping-content-products-footer-action-persons'>
                                <h6>Persons</h6>
                                <div className='shopping-content-products-footer-action-persons-add'>
                                    <span className='shopping-content-products-footer-action-persons-add-action'>-</span>
                                    <span>1</span>
                                    <span className='shopping-content-products-footer-action-persons-add-action'>+</span>
                                </div>
                            </div>
                            <div className='shopping-content-products-footer-action-check'>
                                <span>Checkout</span>
                                <img src={Icons.arrowRight} /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ cart: state.cart })

export default connect(mapStateToProps)(Shopping);