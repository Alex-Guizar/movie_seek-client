import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const [ errorText, setErrorText ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    
    if (isValid) {
      axios.post('https://movie-seek-1949.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
        FavoriteMovies: []
      })
      .then(response => {
        var data = response.data;
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(err => {
        console.error(err);
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

    if (email === '') {
      formErrors.email = 'Email is required';
      isValid = false;
    }

    setErrorText(formErrors);
    return isValid;
  }

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username*</Form.Label>
        <Form.Control 
          required 
          type="text" 
          onChange={e => setUsername(e.target.value)} 
        />
        {/* Check if `errorText` is not empty and contains 'username' as a key */}
        { (errorText && 'username' in errorText) ? <p className="text-danger">{errorText['username']}</p> : '' }
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password*</Form.Label>
        <Form.Control 
          required 
          type="password" 
          onChange={e => setPassword(e.target.value)} 
        />
        {/* Check if `errorText` is not empty and contains 'password' as a key */}
        { (errorText && 'password' in errorText) ? <p className="text-danger">{errorText['password']}</p> : '' }
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email*</Form.Label>
        <Form.Control 
          required 
          type="email" 
          onChange={e => setEmail(e.target.value)} 
        />
        {/* Check if `errorText` is not empty and contains 'email' as a key */}
        { (errorText && 'email' in errorText) ? <p className="text-danger">{errorText['email']}</p> : '' }
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birth Date</Form.Label>
        <Form.Control 
          type="date" 
          onChange={e => setBirthday(e.target.value)} 
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}