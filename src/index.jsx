import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MovieSeekApplication extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar variant="dark">
          <Container>
            <Navbar.Brand href="#home">Movie Seek</Navbar.Brand>
          </Container>
        </Navbar>
        <Container className="py-3">
          <MainView />
        </Container>
      </React.Fragment>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MovieSeekApplication), container);