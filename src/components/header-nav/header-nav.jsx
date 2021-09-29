import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import './header-nav.scss';

export class HeaderNav extends React.Component {
  render() {

    return (
      <Navbar variant="dark">
        <Container>
          <Navbar.Brand href="/">Movie Seek</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}