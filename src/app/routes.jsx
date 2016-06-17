import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from './shared/tpl.CoreLayout';
import Personnel from './scenes/Personnel';
import Error404 from './shared/org.Error404';
import People from './scenes/Personnel/People';
import itA from 'scenes/Personnel/pg.itA';
import itB from 'scenes/Personnel/pg.itB';
import itC from 'scenes/Personnel/pg.itC';
import itD from 'scenes/Personnel/pg.itD';
import TaskOrder from 'scenes/TaskOrder';
import TaskOrderListing from 'scenes/TaskOrder/TaskOrderListing';

export default (
  <Route component={ CoreLayout }>
    <Route path="/" component={ Personnel }>
      <IndexRoute component={ People } />
      <Route path="/ita" component={ itA } />
      <Route path="/itb" component={ itB } />
      <Route path="/itc" component={ itC } />
      <Route path="/itd" component={ itD } />
    </Route>
    <Route path="/taskorder" component={ TaskOrder }>
      <IndexRoute component={ TaskOrderListing } />
    </Route>
    <Route path="*" component={ Error404 } />
  </Route>
);
