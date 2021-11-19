import { Auth0User } from '../../contracts/auth0.models';
import { hasNeededRole } from '../../util/auth0/has-needed-role';

const shouldDisplayTab = (authenticated: boolean, checkRole: string, user: Auth0User): boolean => {
  if (checkRole.length > 0) {
    if (!authenticated || !hasNeededRole(checkRole, user.context)) {
      return false;
    }
  }
  return true;
};

export { shouldDisplayTab };
