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
          <Route to="/" component={Dashboard} />
        ) : (
          <Route exact to="/authorization" component={Authorization} />
        )
      }
    />
  );
}

export default AuthRoute;
