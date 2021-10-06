// Packages
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

// Actions
import { setMovies, setUser } from '../../actions/actions';

// Custom Components
import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

// React-Bootstrap Components
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import './main-view.scss';

class MainView extends React.Component {
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  /** When a user successfully logs in, this function updates the `user` property in the stat to that particular user */
  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    console.log('onLoggedOut');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser('');
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
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            /** If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
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
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            /** If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
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
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path='/users/:username' render={() => {
            /** If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;
            
            return <Col>
              <ProfileView movies={movies} />
            </Col>
          }} />
        </Row>
        <Button variant="primary" onClick={() => this.onLoggedOut()}>Log Out</Button>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);