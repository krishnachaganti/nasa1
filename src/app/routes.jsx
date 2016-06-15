import React from 'react';
import { Route } from 'react-router';
import CoreLayout from './shared/tpl.CoreLayout';
import Personnel from './scenes/Personnel';
import Error404 from './shared/org.Error404';

export default (
  <Route component={ CoreLayout }>
    <Route path="/" component={ Personnel } />
    <Route path="*" component={ Error404 } />
  </Route>
);
