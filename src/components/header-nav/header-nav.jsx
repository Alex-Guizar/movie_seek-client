// Packages
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// React-Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

// Actions
import { setUser } from '../../actions/actions';

// Custom Components

import './header-nav.scss';

function HeaderNav(props) {
  function onLoggedOut() {
    console.log('onLoggedOut');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    props.setUser('');
  }
  
  return (
    <Navbar variant="dark">
      <Container>
        <Navbar.Brand href="/">Movie Seek</Navbar.Brand>
        {props.user !== ''
          ? <Button variant="primary" onClick={() => onLoggedOut()}>Log Out</Button>
          : ''
        }
      </Container>
    </Navbar>
  );
}

let mapStateToProps = state => {
  return { user: state.user };
}

HeaderNav.propTypes = {
  user: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { setUser })(HeaderNav);