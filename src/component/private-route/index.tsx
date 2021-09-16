import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { PrivateRoutePropType } from '../../type/prop/private-route';
import { UserStateType } from '../../type/state/user';

import hasNeededRole from '../../util/auth0/has-needed-role';
import { isAuthenticated, getUser } from '../../store/session/session.selector';

const PrivateRoute: FunctionComponent<PrivateRoutePropType> = ({
  component: Component, path, userRole = '', ...rest
}) => {
  const authenticated = useSelector(isAuthenticated);
  const user: UserStateType = useSelector(getUser);

  return (
    <Route
      path={path}
      {...rest}
      render={props => (userRole.length > 0 && (!hasNeededRole(userRole, user.context) || !authenticated)) ?
        <h3>{`Unauthorized - You need the following role to view this page: ${userRole}`}</h3> :
        <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
