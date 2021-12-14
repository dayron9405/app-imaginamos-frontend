/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef, useEffect } from 'react';

// reducer
import { useSelector, useDispatch, connect } from 'react-redux';
import { ProductListAction } from '../../store/actions/products-list-action/ProductsListAction';

// components
import SliderCategories from '../../components/slider-categories';
import CardProduct from '../../components/card-product';

// utils
import { Icons } from '../../utils/constantes/Icons';
import ProductsJson from '../../utils/constantes/products.json';

import './Products.scss';

function Products(props){
    const {
        products
    } = props;
    const [ categories, setCategories ] = useState([
        {
            icon: 'all',
            category: 'All',
            selected: true
        },
        {
            icon: 'pizza',
            category: 'Pizza',
            selected: false
        },
        {
            icon: 'asian',
            category: 'Asian',
            selected: false
        },
        {
            icon: 'burger',
            category: 'Burgers',
            selected: false
        },
        {
            icon: 'barbecue',
            category: 'Barbecue',
            selected: false
        },
        {
            icon: 'dessers',
            category: 'Dessers',
            selected: false
        },
        {
            icon: 'thai',
            category: 'Thai',
            selected: false
        },
        {
            icon: 'sushi',
            category: 'Sushi',
            selected: false
        },
    ]);
    const [ productsList, setProductsList ] = useState(products.list);
    const dispatch = useDispatch();

    useEffect(() => {
        getProductList();
    }, [])

    useEffect(() => {
        setProductsList(products.list ? products.list : [])
    }, [products])

    const getProductList = () => {
        dispatch(ProductListAction())
        // setProductsList(ProductsJson)
    }

    const sidenav = useSelector(state => state.sidenav.menu);
    const shopping = useSelector(state => state.sidenav.cart);

    const scrollCategories = useRef(null);
    const slideLeft = () => {
        scrollCategories.current.scrollLeft -= 20; 
    }
    const slideRight = () => {
        scrollCategories.current.scrollLeft += 20; 
    }

    const changeSelected = (i) => {
        categories.forEach((item, inx) => {
            if (inx === i) {
                item.selected = true;
            } else {
                item.selected = false;   
            }
            return item;
        });
        setCategories([...categories]);
    }

    return (
        <div className='products'>
            <div className='products-categories'>
                <div className='products-categories-arrow icon-button' onClick={slideLeft}>
                    <img className='products-categories-arrow-left' src={Icons.arrow} />
                </div>
                <div ref={scrollCategories} className='products-categories-list'>
                    { categories.map((category, i) => (
                        <SliderCategories 
                            key={i} 
                            inx={i}
                            icon={category.icon} 
                            category={category.category} 
                            selected={category.selected} 
                            changeSelected={changeSelected}
                        />
                    ))}
                </div>
                <div className='products-categories-arrow icon-button' onClick={slideRight}>
                    <img className='products-categories-arrow-right' src={Icons.arrow} />
                </div>
            </div>
            <div className={ `${sidenav && shopping ? 'list-reduce-total' : sidenav || shopping ? 'list-reduce' : 'products-list'}` }>
                { productsList.map((product, i) => (
                    <CardProduct 
                        key={i}
                        id={product.id}
                        image={product.image}
                        title={product.name}
                        minutes={product.time}
                        qualification={product.qualification}
                        description={product.name}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ products: state.products })

export default connect(mapStateToProps)(Products);