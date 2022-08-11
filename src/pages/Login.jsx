import axios from 'axios';
import React from 'react';
import { Form, Button } from "react-bootstrap";
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, reset} = useForm();
    
    const navigate = useNavigate();
    const submit = data =>{
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
            .then((res) => {
                localStorage.setItem('name', res.data.data.user.firstName)
                navigate('/')
                localStorage.setItem('token', res.data.data.token)
            })
            .catch((error) => {
                if(error.response.status === 404){
                    alert('Invalid User')
                } else{
                    console.log(error.response)
                }
            })
            reset({
                email: "", 
                password: ""
            })
    }


    
    return (
        <div>
            <h1>LOGIN</h1>
            <p>Test Email:</p> <br />
            <p>  email: jordimantilla21@gmail.com <br />
                 password: pass1234</p>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" {...register('email')} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register('password')} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;