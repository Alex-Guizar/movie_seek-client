import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Email: null,
      Birthday: null,
      Password: null,
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  setUsername(input) {
    this.Username = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  getUserInfo() {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');

    axios.get(`https://movie-seek-1949.herokuapp.com/users/${userName}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      this.setState({
        Username: data.Username,
        Email: data.Email,
        Birthday: data.Birthday,
        Password: data.Password,
        FavoriteMovies: data.FavoriteMovies
      })
    })
    .catch(function (err) {
      console.error(err);
    });
  }

  handleUpdate(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');

    console.log(this.state)

    axios.put(`https://movie-seek-1949.herokuapp.com/users/${userName}`, {
      Username: this.Username ? this.Username : this.state.Username,
      Password: this.Password ? this.Password : this.state.Password,
      Email: this.Email ? this.Email : this.state.Email,
      Birthdate: this.Birthday ? this.Birthday : this.state.Birthday
    }, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      const data = response.data;
      console.log(data);
    })
    .catch(function (err) {
      console.error(err);
    });
  }

  deleteProfile(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');

    axios.delete(`https://movie-seek-1949.herokuapp.com/users/${userName}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const data = response.data;
      console.log(data);
    })
    .catch(function (err) {
      console.error(err);
    });
  }

  removeFavorite(e, movieID) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');

    axios.delete(`https://movie-seek-1949.herokuapp.com/users/${userName}/movies/${movieID}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const data = response.data;
      console.log(data);
    })
    .catch(function (err) {
      console.error(err);
    });
  }

  render() {
    return (
      <Row>
        <Col>
          <h2>Update Profile</h2>

          {/* Form to update profile information */}
          <Form onSubmit={e => this.handleUpdate(e)}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" onChange={e => this.setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" onChange={e => this.setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="date" onChange={e => this.setBirthday(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={e => this.setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">Update</Button>
          </Form>

          <h3>Delete Your Account</h3>
          {/* Form to delete account */}
          <Form>
            <Button variant="danger" type="submit">Delete Account</Button>
          </Form>
        </Col>
        
        <Col>
          <h2>Favorite Movies</h2>
          {/* Iterate through favorite movie list */}
        </Col>
      </Row>
    );
  }
}