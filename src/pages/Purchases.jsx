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
                        
                        purchase.cart.products.map(product => (                
                            <div className='purchases-card'>
                                
                                <div>
                                    <h2>{product.title}</h2>
                                </div>
                                <div>
                                    <h3 className='quantity'>{product.productsInCart.quantity} x</h3>
                                    <h3>{product.price}</h3>
                                </div>
                                <div>
                                    <h3>= {product.productsInCart.quantity*product.price}</h3>
                                </div>
                            </div>
                        ))
                    ))
                }
            </div>
        </div>
    );
};

export default Purchases;