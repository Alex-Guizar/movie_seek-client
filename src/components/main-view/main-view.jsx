import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

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

    /** If user selects to register, the RegistrationView is rendered */
    if (register) return <RegistrationView onRegistration={user => this.onRegistration(user)} />

    /** If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} setRegister={() => this.setRegister()} />;
    
    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {/** If the state of `selectedMovie` is not null, that selected movie will be returned, otherwise all movies will be returned */}
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie)}} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
            </Col>
          ))
        }
      </Row>
    );
  }
}

export default MainView;