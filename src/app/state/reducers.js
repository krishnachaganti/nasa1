import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import heroReducer from './hero/hero';
import peopleReducer from './people/people';
import sidebarReducer from './sidebar/sidebar';
import orgReducer from './org/org';

const rootReducer = combineReducers({
  heroReducer,
  peopleReducer,
  sidebarReducer,
  orgReducer,
  routing
});

export default rootReducer;
