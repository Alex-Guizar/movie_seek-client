// Packages
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
  const { user } = props;
  function onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    props.setUser('');
  }
  
  return (
    <Navbar variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Movie Seek</Navbar.Brand>
        
        {props.user !== ''
          ? (
            <React.Fragment>
              <Button className="ml-auto" variant="primary" as={Link} to={`/users/${user}`}>Profile</Button>
              <Button className="ml-3" variant="primary" onClick={() => onLoggedOut()}>Log Out</Button>
            </React.Fragment>
          )
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