import React from 'react';
import { Route, Redirect } from 'react-router';
import AuthService from 'services/authService';

const ProtectedRoute = ({ component: Component }, ...rest) => {
  const accessToken = localStorage.getItem('access_token');

  return (
    <Route
      {...rest}
      render={(props) => {
        if (accessToken) {
          AuthService.setSession(accessToken);
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
