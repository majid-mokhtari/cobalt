import React, { Component } from 'react';
import AppContainer from './containers/AppContainer.js'
import './App.css'
import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
