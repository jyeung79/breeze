import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Examples from './pages/Examples';
import About from './pages/About';
import Content from './pages/Content';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './redux/reducers/reducer';

// STORE => GLOBALIZED STATE
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Content} />
        <Route path="/about" component={About} />
        <Route path="/examples" component={Examples} />
      </Switch>
    </Provider>
  )
}
