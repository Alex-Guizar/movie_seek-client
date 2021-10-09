import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  constructor() {
    super();

    this.state = {
      addedToFavorite: false
    }
  }
  
  setAddedToFavorites() {
    this.setState({
      addedToFavorites: true
    });
  }

  addToFavorites(e, movieID) {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');

    axios.post(`https://movie-seek-1949.herokuapp.com/users/${userName}/movies/${movieID}`, null, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      this.setAddedToFavorites();
    })
    .catch(function (err) {
      console.error(err);
    });
  }

  render() {
    const { addedToFavorites } = this.state;
    const { movie } = this.props;

    return (
      <Card className="card--full-height">
        <Card.Img className="card-img-top--max-width" variant="top" src={`images/${movie.ImagePath}`} />
        <Card.Body className="card-body--body-flex">
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <div className="card-actions">
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Open</Button>
            </Link>
            {addedToFavorites
              ? <span className="btn btn-outline-success ml-auto">Added!</span>
              : <Button className="ml-auto" variant="link" onClick={e => this.addToFavorites(e, movie._id)}>Add to Favorites</Button>
            }
          </div>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
      ]),
      Death: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
      ])
    })
  }).isRequired
};