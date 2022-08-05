import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/Home.css'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { filterTitleThunk, filterByCategory, getProductThunk } from '../store/slices/product.slice'
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';


const Home = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const products = useSelector((state) => state.products)

    const [searchByTitle, setSearchByTitle] = useState("")

    const [categories, setCategories] = useState([])

    useEffect(() => {
        dispatch(getProductThunk())

        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data?.data.categories))
    }, [])

    const submit = () => {
        dispatch(filterTitleThunk(searchByTitle))
    }

    return (
        <div>
            <div className='header-container'>
                <h1>HOME</h1>
            </div>
            <div>
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="what are you looking for?"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={searchByTitle}
                        onChange={e => setSearchByTitle(e.target.value)}
                    />
                    <Button onClick={submit} variant="outline-secondary" id="button-addon2">
                        Search
                    </Button>
                </InputGroup>
            </div>
            <div className='home-align'>
            <div className='left'>
            <ListGroup>
            <ListGroup.Item disabled>Categories</ListGroup.Item>
            <ListGroup.Item
            onClick={() => dispatch(getProductThunk())}
            >All products</ListGroup.Item>
                    {
                        categories.map(category => (
                            <ListGroup.Item
                            onClick={() => dispatch(filterByCategory(category.id))}
                            key={category.id}
                            >{category.name}
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>
            <div className='products right'>
                {
                    products.map(product => (
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
                                <Button>Add to cart</Button>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
            </div>

        </div>
    );
};

export default Home;