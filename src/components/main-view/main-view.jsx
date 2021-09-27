// Packages
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// Custom Components
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// React-Bootstrap Components
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './main-view.scss';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  componentDidMount() {
    axios.get('https://movie-seek-1949.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      });
  }

  /** When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie */
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /** Set register to true to render the registration form */
  setRegister() {
    this.setState({
      register: true
    });
  }

  /** When a user successfully logs in, this function updates the `user` property in the stat to that particular user */
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  /** When a user successfully registers, update the `register` property to false and the `user` property to the registered user */
  onRegistration(user) {
    this.setState({
      user,
      register: false
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            /** If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} setRegister={() => this.setRegister()} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
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
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} setRegister={() => this.setRegister()} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            /** If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} setRegister={() => this.setRegister()} />
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
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} setRegister={() => this.setRegister()} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path='/users/:username' render={({ history }) => {
            /** If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} setRegister={() => this.setRegister()} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return <ProfileView history={history} movies={movies} />
          }} />
        </Row>
      </Router>
    );
  }
}

export default MainView;