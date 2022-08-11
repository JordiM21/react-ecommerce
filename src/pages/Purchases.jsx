import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import purchases from '../styles/purchases.css'


const Purchases = () => {

    const purchases = useSelector(state => state.purchases)
        
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    console.log(purchases)


    return (
        <div>
            <h1>Purchases</h1>
            <div className='navigate-history'>
                    <a href="/">Home</a>
                    <div className='separator'></div>
                    <span>Purchases</span>
            </div>
            <div className='purchases-container'>

                {
                    purchases?.map(purchase => (
                        <div className="purchases-card">
                            {

                                purchase.cart.products.map(product => (                
                                    <div className='purchases-item'>  
                                            <h4 style={{width: '220px'}}>{product.title}</h4>
                                            <h6 className='quantity'>{product.productsInCart.quantity} x</h6>
                                            <h6>$ {product.price} c/u</h6>
                                            <h4>= ${product.productsInCart.quantity*product.price}</h4>
                                    </div>
                                ))
                            }
                        </div>
                        
                    ))
                }
            </div>
        </div>
    );
};

export default Purchases;