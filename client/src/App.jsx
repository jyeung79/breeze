import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';

import Content from './layouts/Content';

export const App = () => (
  // explicit vs implicit return
  <BrowserRouter>
  <Layout children ={
    <div className="container mx-auto my-4">
      <Content />
    </div>
  } />
  </BrowserRouter>
);
