import React from 'react';
import { Route } from 'react-router';
import CoreLayout from './shared/tpl.CoreLayout';
import Home from './scenes/Home';
import Error404 from './shared/org.Error404';

export default (
  <Route component={ CoreLayout }>
    <Route path="/" component={ Home } />
    <Route path="*" component={ Error404 } />
  </Route>
);
