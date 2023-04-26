/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { adminSelectors } from 'state/modules/admin';

const PublicAdminRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) =>
    adminSelectors.isAuthenticated(state),
  );

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <Redirect to='/admin/manage/films' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PublicAdminRoute.propTypes = {
  component: PropTypes.any.isRequired,
};

export default PublicAdminRoute;
