import React from 'react';
import { Route } from 'react-router-dom';

import Authorization from '../components/Authorization';
import Dashboard from '../components/Dashboard';

function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.getItem('jwtToken') ? (
          <Route exact to="/" component={Dashboard} />
        ) : (
          <Route to="/authorization" component={Authorization} />
        )
      }
    />
  );
}

export default AuthRoute;
