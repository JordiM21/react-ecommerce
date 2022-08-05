import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import navBar from '../styles/navBar.css'


const NavBar = () => {
    return (
      <div>
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/#/"><h3>E-commerce</h3></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#/">Home</Nav.Link>
              <Nav.Link href="/#/login">Login</Nav.Link>
              <Nav.Link href="/#/purchases">Purchases</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
        
    );
};

export default NavBar;