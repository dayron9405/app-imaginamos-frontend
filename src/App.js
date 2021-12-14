import React from 'react';

// redux
import store from './store';
import { Provider, useSelector } from 'react-redux';

// views
import Home from './views/home';

import './App.scss';

export default function App() {

  return (
    <Provider className="app" store={store}>
      <Home />
    </Provider>
  );
}