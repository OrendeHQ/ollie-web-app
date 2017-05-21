import React from 'react';
import { SUCCESS } from '../constants/ajaxStatus';
import { Route, Switch, Redirect } from 'react-router-dom';

export function PublicRoute({ component: Component, ...props }) {
  return (
    <Route {...props}
      render={() => props.token.status !== SUCCESS
        ? <Component {...props} />
        : <Redirect to="/" />} />
  );
}

export function PrivateRoute({ component: Component, ...props }) {
  return (
    <Route {...props}
      render={() => props.token.status === SUCCESS
        ? <Component {...props} />
        : <Redirect to="/login" />} />
  );
}

export function PassingPropsSwitch({ children, ...props }) {
  return (
    <Switch>
      { React.Children.map(children, (c) => React.cloneElement(c, props)) }
    </Switch>
  );
}

export function PassingPropsRoute({ component: Component, ...props }) {
  return (
    <Route {...props}
      render={() => <Component {...props} />} />
  );
}
