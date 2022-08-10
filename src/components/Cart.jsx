import { Offcanvas } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cart.slice';
import { useNavigate } from 'react-router-dom';

const Cart = ({show, handleClose}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productsInCart = useSelector(state => state.cart.data?.cart.products)
    console.log(productsInCart)

    useEffect(() => {
        dispatch(getCartThunk())
      }, [])

    return (
        <>
        <Offcanvas show={show} onHide={handleClose} placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>My Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {
                productsInCart?.map(product => (
                    <>
                        <h1  onClick={() => navigate(`/detail/${product.id}`)}>{product.title}</h1>
                    </>
                ))
            }
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
};

export default Cart;