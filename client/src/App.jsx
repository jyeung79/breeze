import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Examples from './pages/Examples';
import About from './pages/About';
import Content from './pages/Content';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Content} />
      <Route path="/about" component={About} />
      <Route path="/examples" component={Examples} />
    </Switch>
  )
}
