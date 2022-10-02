import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

// import './navbar.scss';

export function NavBar() {
  let user = localStorage.getItem('user');

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.open('/', '_self');
    props.onLoggedOut(user);
  };

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar sticky='top' bg='dark' collapseOnSelect expand='xxl' variant='dark'>
        <Navbar.Brand className='navbar-logo' href='/'>
          The Jackie Chan Movie DB
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {isAuth() && (
              <Nav.Link as={Link} to={`/users/${user}`}>
                {user}
              </Nav.Link>
            )}
            {isAuth() && (
              <Button className='logout' variant='link' onClick={handleLogOut}>
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link href='/'>Sign in</Nav.Link>}
            {!isAuth() && <Nav.Link href='/register'>Sign up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}