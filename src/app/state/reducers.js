import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import headerReducer from './header/header';
import peopleReducer from './people/people';
import sidebarReducer from './sidebar/sidebar';
import orgReducer from './org/org';

const rootReducer = combineReducers({
  headerReducer,
  peopleReducer,
  sidebarReducer,
  orgReducer,
  routing
});

export default rootReducer;
