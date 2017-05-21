import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import token from './token';

const rootReducer = combineReducers({
  token,
  router: routerReducer
});

export default rootReducer;
