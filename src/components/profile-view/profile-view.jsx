// Packages
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';

// Actions
import { setUser, setFavorites } from '../../actions/actions';

// React-Bootstrap Components
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

import './profile-view.scss';

class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Email: null,
      Birthday: null,
      Password: null,
      FavoriteMovies: [],
      errorText: {},
      updateSuccess: false
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

  setErrorText(errors) {
    this.setState({
      errorText: errors
    });
  }

  setUpdateSuccess() {
    this.setState({
      updateSuccess: true
    });
  }

  getUserInfo() {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');

    axios.get(`https://movie-seek-1949.herokuapp.com/users/${userName}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      const data = response.data;
      this.setState({
        Username: data.Username,
        Email: data.Email,
        Birthday: data.Birthday,
        Password: data.Password,
        FavoriteMovies: data.FavoriteMovies
      });
    })
    .catch(function (err) {
      console.error(err);
    });
  }

  handleUpdate(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    const isValid = this.formValidation(this);

    if (isValid) {
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
        this.setState({
          Username: data.Username,
          Email: data.Email,
          Birthday: data.Birthday,
          Password: data.Password,
          updateSuccess: true
        });
        localStorage.setItem('user', data.Username);
      })
      .catch(function (err) {
        console.error(err);
      });
    }
  }

  deleteProfile(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');

    axios.delete(`https://movie-seek-1949.herokuapp.com/users/${userName}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      // Remove all local storage items
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('favorites');
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
      this.setState({
        FavoriteMovies: data.FavoriteMovies
      });
      this.props.setFavorites(data.FavoriteMovies);
      localStorage.setItem('favorites', JSON.stringify(data.FavoriteMovies));
    })
    .catch(function (err) {
      console.error(err);
    });
  }

  formValidation(form) {
    let isValid = true;
    let formErrors = {};

    if (form.Username === '') {
      formErrors.username = 'Username is required';
      isValid = false;
    }

    if (form.Password === '') {
      formErrors.password = 'Password is required';
      isValid = false;
    }

    if (form.Email === '') {
      formErrors.email = 'Email is required';
      isValid = false;
    }

    this.setErrorText(formErrors);
    return isValid;
  }

  render() {
    const { movies } = this.props;
    const { FavoriteMovies, errorText, updateSuccess } = this.state;

    return (
      <Row>
        <Col>
          <h2>Update Profile</h2>

          {/** Check if updateSuccess is true and there are no errors, then display success alert */}
          {updateSuccess && Object.keys(errorText).length === 0
            ? <Alert variant="success">Profile Updated</Alert>
            : ''
          }
          {/* Form to update profile information */}
          <Form onSubmit={e => this.handleUpdate(e)}>
            <Form.Group>
              <Form.Label>Username*</Form.Label>
              <Form.Control 
                required 
                type="text" 
                onChange={e => this.setUsername(e.target.value)} 
              />
              { (errorText && 'username' in errorText) ? <p className="text-danger">{errorText['username']}</p> : '' }
            </Form.Group>

            <Form.Group>
              <Form.Label>Email*</Form.Label>
              <Form.Control 
                required 
                type="email" 
                onChange={e => this.setEmail(e.target.value)} 
              />
              { (errorText && 'email' in errorText) ? <p className="text-danger">{errorText['email']}</p> : '' }
            </Form.Group>

            <Form.Group>
              <Form.Label>Password*</Form.Label>
              <Form.Control 
                required 
                type="password" 
                onChange={e => this.setPassword(e.target.value)} 
              />
              { (errorText && 'password' in errorText) ? <p className="text-danger">{errorText['password']}</p> : '' }
            </Form.Group>

            <Form.Group>
              <Form.Label>Birthday</Form.Label>
              <Form.Control 
                type="date" 
                onChange={e => this.setBirthday(e.target.value)} 
              />
            </Form.Group>

            <Button variant="primary" type="submit">Update</Button>
          </Form>

          <h3 className="mt-4">Delete Your Account</h3>
          {/* Form to delete account */}
          <Form onSubmit={e => this.deleteProfile(e)}>
            <Button variant="danger" type="submit">Delete Account</Button>
          </Form>
        </Col>
        
        <Col>
          <h2>Favorite Movies</h2>

          {/* Iterate through favorite movie list then match id to item in full movie list */}
          <ListGroup>
            {FavoriteMovies.map(favMovie => (
              <ListGroup.Item className="d-flex align-items-center" key={favMovie}>
                {movies.find(m => m._id === favMovie).Title}
                <Button className="ml-auto" variant="link" onClick={e => {this.removeFavorite(e, favMovie)}}>Remove</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return { favorites: state.favorites }
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  setUser: PropTypes.func.isRequired,
  setFavorites: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { setUser, setFavorites })(ProfileView);