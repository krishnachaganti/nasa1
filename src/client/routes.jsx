import React from 'react';
import { Route, IndexRoute } from 'react-router';

import CoreLayout from './layouts/CoreLayout/CoreLayout';
import HomeView from './scenes/Home';


export default store => {
  return (
      <Route path="/" component={ CoreLayout } />
    );
};
