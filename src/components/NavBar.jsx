import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import navBar from '../styles/navBar.css'


const NavBar = () => {

  const token = localStorage.getItem('token')
  const name = localStorage.getItem('name')

  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem('token', '')
    navigate('/login')
  }

    return (
      <div>
        <Navbar  style={{backgroundColor: 'rgba(44, 83, 189)'}} expand="lg">
        <Container>
          <Navbar.Brand style={{color:'white'}}  href="/#/"><h1>E-commerce</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link style={{color: 'white', fontWeight: '600', fontSize: '1.2rem'}} href="/#/">Home</Nav.Link>
              <Nav.Link style={{color: 'white', fontWeight: '600', fontSize: '1.2rem'}} href="/#/purchases">Purchases</Nav.Link>
              {
                token ? (
                  <Nav.Link style={{color: 'snow', fontWeight: '600', fontSize: '1.2rem'}} onClick={logout}>Logout</Nav.Link>
                ) : (
                  <Nav.Link style={{color: 'snow', fontWeight: '600', fontSize: '1.2rem'}} href="/#/login">Log in</Nav.Link>
                  )
                }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
        
    );
};

export default NavBar;