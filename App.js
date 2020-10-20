import React, { Component } from 'react';
import Navigation from './src/Navigation/index';
import { Provider } from 'react-redux';

import configureStore from './src/ReduxStore/store/index';
const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;
