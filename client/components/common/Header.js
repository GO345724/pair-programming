import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => (
  <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Pair Programming</a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer to="/">
          <NavItem eventKey={1}>Challenges</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
)
export default Header;
