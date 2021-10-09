// Packages
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import { setUser, setFavorites } from '../../actions/actions';

// React-Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import './login-view.scss';

function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ loginError, setLoginError ] = useState('');
  const [ errorText, setErrorText ] = useState('');

  const onLoggedIn = authData => {
    props.setUser(authData.user.Username);
    props.setFavorites(authData.user.FavoriteMovies);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('favorites', JSON.stringify(authData.user.FavoriteMovies));
    props.getMovies(authData.token);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();

    if (isValid) {
      /** Send a request to the server for authentication */
      axios.post('https://movie-seek-1949.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        onLoggedIn(data);
      })
      .catch(err => {
        console.error(err);
        setLoginError(err);
      });
    }
  }

  const formValidation = () => {
    let isValid = true;
    let formErrors = {};

    if (username === '') {
      formErrors.username = 'Username is required';
      isValid = false;
    }

    if (password === '') {
      formErrors.password = 'Password is required';
      isValid = false;
    }

    setErrorText(formErrors);
    return isValid;
  }

  return (
    <React.Fragment>
      <Form>
        { loginError ? <Alert variant="danger">That User and Password combo didn't work. Please try again.</Alert> : '' }
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control 
            required 
            type="text" 
            onChange={e => setUsername(e.target.value)} 
          />
          {/* Check if `errorText` is not empty and contains 'username' as a key */}
          { (errorText && 'username' in errorText) ? <p className="text-danger">{errorText['username']}</p> : '' }
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            required 
            type="password" 
            onChange={e => setPassword(e.target.value)} 
          />
          {/* Check if `errorText` is not empty and contains 'password' as a key */}
          { (errorText && 'password' in errorText) ? <p className="text-danger">{errorText['password']}</p> : '' }
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <p className="mt-3">
        <Link to="/register">
          Don't have an account? Click here to register!
        </Link>
      </p>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return { user: state.user }
}

LoginView.propTypes = {
  user: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  setFavorites: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { setUser, setFavorites })(LoginView);