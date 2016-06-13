import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import header from './header';
import report from './report';
import people from './people';
import sidebar from './sidebar';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
  routing,
  header,
  people,
  sidebar,
  visibilityFilter,
  report
});

export default rootReducer;
