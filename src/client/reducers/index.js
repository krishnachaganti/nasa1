import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import header from './header';
import report from './report';
import people from './people';
import sidebar from './sidebar';
import kudos from './kudos';
const rootReducer = combineReducers({
  routing,
  header,
  people,
  sidebar,
  kudos,
  report
});

export default rootReducer;
