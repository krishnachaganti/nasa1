import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import header from './header';

const rootReducer = combineReducers({
  routing,
  header
});

export default rootReducer;
