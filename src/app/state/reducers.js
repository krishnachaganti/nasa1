import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import heroReducer from './hero/hero';
import peopleReducer from './people/people';
import sidebarReducer from './sidebar/sidebar';
import card from 'scenes/Personnel/state/card';


const rootReducer = combineReducers({
  heroReducer,
  peopleReducer,
  sidebarReducer,
  card,
  routing
});

export default rootReducer;
