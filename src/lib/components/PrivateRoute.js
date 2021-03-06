import React from 'react';
import { Route } from 'react-router-dom';
import { Spinner } from '@chakra-ui/core';

import useAuth from '../useAuth';
import Login from './Login';

export const privateRoute = (LoginComponent) => {
  return (props) => {
    const { component: PrivateComponent, ...restProps } = props;
    const auth = useAuth();
    const render = (routeProps) => {
      if (!auth.loaded) return <Spinner />;
      if (!auth.user) return <LoginComponent />;
      return <PrivateComponent {...routeProps} />;
    };
    return (
      <Route {...restProps} render={render} />
    );
  };
};

const PrivateRoute = privateRoute(Login);

export default PrivateRoute;
