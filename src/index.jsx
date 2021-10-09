// Imported packages
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { BrowserRouter as Router } from "react-router-dom";

import moviesApp from './reducers/reducers';
// Imported Custom Components
import MainView from './components/main-view/main-view';
import HeaderNav from './components/header-nav/header-nav';

// Imported React-Bootstrap Components
import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MovieSeekApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <HeaderNav />
          <Container className="py-3">
            <MainView />
          </Container>
        </Router>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MovieSeekApplication), container);