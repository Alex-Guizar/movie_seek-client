import React from 'react';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './profile-view.scss';

export class ProfileView extends React.Component {

  setName(input) {
    this.Name = input;
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

  handleUpdate() {

  }

  render() {
    return (
      <Row>
        <Col>
          <h2>Update Profile</h2>

          {/* Form to update profile information */}
          <Form onSubmit={e => this.handleUpdate()}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={e => this.setName(e.target.value)} />
            </Form.Group>
            
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