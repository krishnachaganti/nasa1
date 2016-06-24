import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from './shared/tpl.CoreLayout';
import Personnel from './scenes/Personnel';
import Error404 from './shared/org.Error404';
import People from './scenes/Personnel/People';
import TaskOrder from 'scenes/TaskOrder';
import TaskOrderListing from 'scenes/TaskOrder/TaskOrderListing';

export default (store) => {
  return (
    <Route component={ CoreLayout }>
      <Route path="/" component={ Personnel }>
        <IndexRoute component={ Personnel } />
      </Route>
      <Route path="/taskorder" component={ TaskOrder }>
        <IndexRoute component={ TaskOrder } />
      </Route>
      <Route path="*" component={ Error404 } />
    </Route>
  );
};
