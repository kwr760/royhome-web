import React from 'react';
import { useSelector } from 'react-redux';
import { Auth0User } from '../contracts/auth0.models';
import { getUser, isAuthenticated } from '../store/session/session.selector';
import { hasNeededRole } from '../util/auth0/has-needed-role';

interface Props {
  userRole?: string;
  children: JSX.Element;
}
const ProtectRoute = ({userRole = '', children}: Props): JSX.Element => {
  const authenticated = useSelector(isAuthenticated);
  const user: Auth0User = useSelector(getUser);
  const hasRole = (userRole.length > 0 && hasNeededRole(userRole, user.context)) || false;
  const isCorrectUser = (userRole.length === 0) || hasRole;

  if (!(isCorrectUser && authenticated)) {
    return <h3>{`Unauthorized - You need the following role to view this page: ${userRole}`}</h3>;
  }

  return children;
};

export default ProtectRoute;
