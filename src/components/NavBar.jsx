import { Offcanvas, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import navBar from '../styles/navBar.css'
import Cart from './Cart';

const NavBar = () => {

  const token = localStorage.getItem('token')
  const name = localStorage.getItem('name')

  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem('token', '')
    navigate('/login')
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (token) {
      setShow(true)
    } else {
      navigate('/login')
    }
  }

  return (
    <div>
      <Navbar style={{ backgroundColor: 'rgba(44, 83, 189)' }} expand="lg">
        <Container>
          <Navbar.Brand style={{ color: 'white' }} href="/#/"><h1>E-commerce</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={{ color: 'white', fontWeight: '600', fontSize: '1.2rem' }} href="/#/">Home</Nav.Link>
              <Nav.Link style={{ color: 'white', fontWeight: '600', fontSize: '1.2rem' }} href="/#/purchases">Purchases</Nav.Link>
              {
                token ? (
                  <Nav.Link style={{ color: 'snow', fontWeight: '600', fontSize: '1.2rem' }} onClick={logout}>Logout</Nav.Link>
                ) : (
                  <Nav.Link style={{ color: 'snow', fontWeight: '600', fontSize: '1.2rem' }} href="/#/login">Log in</Nav.Link>
                )
              }
            </Nav>
            <Button onClick={handleShow}>
              My Cart
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Cart show={show} handleClose={handleClose} />
    </div>

  );
};

export default NavBar;