import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from './shared/tpl.CoreLayout';
import Personnel from './scenes/Personnel';
import Error404 from './shared/org.Error404';
import Filtered from './scenes/Personnel/org.Filtered';
import People from './scenes/Personnel/People';
export default (
  <Route component={ CoreLayout }>
    <Route path="/" component={ Personnel }>
    <IndexRoute component={ People } />
      <Route path="/ita" component={Filtered} />
    </Route>
    <Route path="*" component={ Error404 } />
  </Route>
);
