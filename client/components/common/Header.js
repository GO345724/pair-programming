import React from 'react';
import { Link } from 'react-router-dom';
import {Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const styles= {
  navStyle: {
    backgroundColor: "#033940",
    borderColor: "#337abb"
  },
  navBrand: {
    color: "#e7e7e7"
  }
}
const Header = () => (
  <Navbar style={styles.navStyle}>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/" style={styles.navBrand}>Pair Programming</a>
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
