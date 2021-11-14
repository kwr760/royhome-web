import { UserStateType } from '../../type/state/user';
import hasNeededRole from '../../util/auth0/has-needed-role';

export const shouldDisplayTab = (authenticated: boolean, checkRole: string, user: UserStateType): boolean => {
  if (checkRole.length > 0) {
    if (!authenticated || !hasNeededRole(checkRole, user.context)) {
      return false;
    }
  }
  return true;
};
