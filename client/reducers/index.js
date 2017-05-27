import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import token from './token';
import series from './series';
import items from './items';

const rootReducer = combineReducers({
  token, series, items,
  router: routerReducer
});

export default rootReducer;
