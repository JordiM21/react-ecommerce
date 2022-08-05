import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductThunk } from '../store/slices/product.slice';
import productDetail from '../styles/productDetail.css'
import Button from 'react-bootstrap/Button';



const ProductDetail = () => {

    const allProducts = useSelector(state => state.products)
    
    const [productsDetail, setProductsDetail] = useState({})

    const [suggestedProduct, setSuggestedProduct] = useState([])

    const dispatch = useDispatch()

    const navigate = useNavigate()

    //useParams trae lo que haya en /:id
    const {id} = useParams()

    useEffect(() => {
        //guardamos en product lo que pase la condicion del find           este find es de useParams
        const findProduct = allProducts.find(productItem => Number(productItem.id) === Number(id))
        setProductsDetail(findProduct)

        //filtramos los productos con igual id en categoria    este es el que itera por allProducts ** y este es el obtenido anteriormente en el find, significa en el producto que estamos actualmente                                        
        const filteredProducts = allProducts.filter(productItem => productItem.category.id === findProduct.category.id)
        setSuggestedProduct(filteredProducts)
    }, [allProducts, id])

    useEffect(() => {
        dispatch(getProductThunk())
    }, [])
    


return (
        <div className='App'>
            <div className='navigate-history'>
                    <a href="/">Home</a>
                    <div className='separator'></div>
                    <span>{productsDetail?.title}</span>
            </div>
            <div className='detail-align'>
                <div className='left-div'>
                    <img className='big-img' src={productsDetail.productImgs?.[0]} alt="" />
                    <div className='dis-flex'>
                        <img className='little-img' src={productsDetail.productImgs?.[1]} alt="" />
                        <img className='little-img' src={productsDetail.productImgs?.[2]} alt="" />                        
                        <img className='little-img' src={productsDetail.productImgs?.[0]} alt="" />                        
                    </div>
                </div>
                <div className='right-div'>
                    <h1>{productsDetail?.title}</h1>
                    <p>{productsDetail?.description}</p>
                    <p>price:<strong>  ${productsDetail.price}</strong></p>
                    <button>Add to cart</button>
                </div>
            </div>
            <div className='suggested-text'>
            <h5>Discover similar items:</h5>
            </div>
            <div className='dis-flex'>
            {
                    suggestedProduct.map(product => (
                        <Card className='card' 
                        key={product.id} 
                        onClick={() => navigate(`/detail/${product.id}`)} 
                        style={{ width: '17rem' }}
                        >
                            <Card.Img variant="top" className='img' src={product.productImgs[0]} />
                            <div className='hiden-text'>
                                <strong>{product.description.slice(0, 133)}...</strong>
                            </div>
                            <Card.Body>
                                <Card.Title>
                                    <h3>{product.title}</h3>
                                </Card.Title>
                                <Card.Text>
                                    <p>price:</p>
                                    <p>{product.price}</p>
                                </Card.Text>
                                <Button variant="primary">Add to cart</Button>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductDetail;