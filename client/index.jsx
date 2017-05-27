import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import store, { history } from './store';
import { PassingPropsSwitch, PublicRoute, PrivateRoute } from './middlewares/routing.js';

import App from './containers/App.jsx';
import HomePage from './containers/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import AdminPage from './containers/AdminPage.jsx';
import SingleSeriesPage from './containers/SingleSeriesPage.jsx';

const router = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <PassingPropsSwitch>
          <PrivateRoute exact path="/" component={HomePage} />
          <PublicRoute exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/admin" component={AdminPage} />
          <PrivateRoute exact path="/admin/series/:id" component={SingleSeriesPage} />
        </PassingPropsSwitch>
      </App>
    </ConnectedRouter>
  </Provider>
);

render(router, document.getElementById('root'));
