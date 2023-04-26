/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { adminSelectors } from 'state/modules/admin';

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) =>
    adminSelectors.isAuthenticated(state),
  );

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <Component {...props} trigger={rest.trigger} />
        ) : (
          <Redirect to='/admin' />
        )
      }
    />
  );
};

PrivateAdminRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PrivateAdminRoute;
