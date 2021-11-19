import { Auth0ContextData } from '../../contracts/auth0.models';
import { OWNER, ROLES } from '../../contracts/constants/role.constants';

const hasNeededRole = (neededRole: string, context: Auth0ContextData = { role: '' }): boolean => {
  const { role = ''} = context;

  let grantedRoles = role.split(' ');
  if (grantedRoles.includes(OWNER)) {
    grantedRoles = grantedRoles.concat(Object.values(ROLES));
  }

  return grantedRoles.includes(neededRole);
};

export { hasNeededRole };
