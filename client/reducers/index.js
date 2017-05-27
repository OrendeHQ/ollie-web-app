import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import token from './token';
import series from './series';

const rootReducer = combineReducers({
  token, series,
  router: routerReducer
});

export default rootReducer;
