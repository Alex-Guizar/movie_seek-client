// Packages
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

// Actions
import { setMovies, setUser } from '../../actions/actions';

// Custom Components
import MoviesList from '../movies-list/movies-list';
import LoginView from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

// React-Bootstrap Components
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './main-view.scss';

class MainView extends React.Component {
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://movie-seek-1949.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      // Assign the result to the state
      this.props.setMovies(response.data);
    })
    .catch(function (err) {
      console.error(err);
    });
  }

  render() {
    let { movies, user } = this.props;

    return (
      <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
          /** If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
          if (!user) return <Col>
            <LoginView getMovies={token => this.getMovies(token)} />
          </Col>

          if (movies.length === 0) return <div className="main-view" />;

          return <MoviesList movies={movies} />;
        }} />

        <Route path="/register" render={() => {
          if (user) return <Redirect to="/" />
          return <Col>
            <RegistrationView />
          </Col>
        }} />

        <Route path="/movies/:movieId" render={({ match, history }) => {
          /** If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
          if (!user) return <Col>
            <LoginView getMovies={token => this.getMovies(token)} />
          </Col>

          if (movies.length === 0) return <div className="main-view" />;

          return <Col md={8}>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
          </Col>
        }} />

        <Route path="/directors/:name" render={({ match, history }) => {
          /** If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
          if (!user) return <Col>
            <LoginView getMovies={token => this.getMovies(token)} />
          </Col>

          if (movies.length === 0) return <div className="main-view" />;

          return <Col md={8}>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
          </Col>
        }
        } />

        <Route path="/genres/:name" render={({ match, history }) => {
          /** If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
          if (!user) return <Col>
            <LoginView getMovies={token => this.getMovies(token)} />
          </Col>

          if (movies.length === 0) return <div className="main-view" />;

          return <Col md={8}>
            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
          </Col>
        }} />

        <Route exact path='/users/:username' render={() => {
          /** If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
          if (!user) return <Col>
            <LoginView getMovies={token => this.getMovies(token)} />
          </Col>

          if (movies.length === 0) return <div className="main-view" />;
          
          return <Col>
            <ProfileView movies={movies} />
          </Col>
        }} />
      </Row>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

MainView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
  setMovies: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);