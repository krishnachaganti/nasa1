
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from './containers/AppContainer';
import HomeContainer from './containers/HomeContainer';

export default store => {
  return (
      <Route path="/" component={ AppContainer }>
        <IndexRoute component={ HomeContainer }></IndexRoute>

      </Route>
    );
};
