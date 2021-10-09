// Packages
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Actions
import { setFavorites } from '../../actions/actions';

// React-Bootstrap Components
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

class MovieCard extends React.Component {
  constructor(props) {
    super(props);

    const isFavorite = this.props.favorites.includes(this.props.movie._id);

    this.state = {
      addedToFavorites: isFavorite
    }
  }
  
  setAddedToFavorites() {
    this.setState({
      addedToFavorites: true
    });
  }

  addToFavorites(movieID) {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');

    axios.post(`https://movie-seek-1949.herokuapp.com/users/${userName}/movies/${movieID}`, null, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const data = response.data;
      this.setAddedToFavorites();
      this.props.setFavorites(data.FavoriteMovies);
      localStorage.setItem('favorites', JSON.stringify(data.FavoriteMovies));
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
              : <Button className="ml-auto" variant="link" onClick={e => this.addToFavorites(movie._id)}>Add to Favorites</Button>
            }
          </div>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return { favorites: state.favorites };
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
  }).isRequired,
  favorites: PropTypes.array.isRequired,
  setFavorites: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { setFavorites })(MovieCard);