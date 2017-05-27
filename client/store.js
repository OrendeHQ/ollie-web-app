import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { NONE, SUCCESS } from './constants/ajaxStatus';

import rootReducer from './reducers';
import thunk from './middlewares/thunk';

const tokenVal = localStorage.getItem('token');
const token = tokenVal
  ? { status: SUCCESS, value: tokenVal, error: '' }
  : { status: NONE, value: '', error: '' };

const defaultState = {
  token,
  series: { status: NONE, value: [], error: '' },
  items: { status: NONE, value: [], error: '' }
};

export const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const enhancers = compose(
  window.devToolsExtension
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(historyMiddleware, thunk))
    : applyMiddleware(historyMiddleware, thunk)
);

const store = createStore(rootReducer, defaultState, enhancers);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
