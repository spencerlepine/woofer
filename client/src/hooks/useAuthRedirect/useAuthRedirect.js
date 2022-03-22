/* eslint-disable react/display-name */
import React from 'react';
import { WELCOME, HOME } from 'config/routeConstants';
import useAuth from 'context/AuthContext/AuthContext';
import { Redirect } from 'react-router-dom';

const withAuthRedirect = (Component, isAuthPage = false) =>
  () => {
    // Get the current user from AuthContext
    const { currentUser } = useAuth();

    if (currentUser && Object.keys(currentUser).length > 0) {
      if (isAuthPage) {
        return <Redirect to={HOME} />;
      } else {
        return <Component />;
      }
    } else {
      if (isAuthPage) {
        return <Component />;
      } else {
        return <Redirect className="redirect" to={WELCOME} />;
      }
    }
  };

export default withAuthRedirect;
