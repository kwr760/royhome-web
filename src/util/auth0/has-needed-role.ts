import { OWNER, ROLES } from './role.constants';
import { ContextStateType } from '../../type/state/context';

const hasNeededRole = (neededRole: string, context: ContextStateType = { role: '' }): boolean => {
  const { role = ''} = context;

  let grantedRoles = role.split(' ');
  if (grantedRoles.includes(OWNER)) {
    grantedRoles = grantedRoles.concat(Object.values(ROLES));
  }

  return grantedRoles.includes(neededRole);
};

export { hasNeededRole };
