import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';
import { TokenRequest } from '../contracts/token.models';
import { hasNeededRole } from '../util/auth0/has-needed-role';
import { TOKEN_URL } from '../contracts/constants/role.constants';

const checkRole = (neededRole: string) => (req: Request, res: Response, next: NextFunction): Response | void => {
  const { user: token = { [TOKEN_URL]: { role: '' } } } = req as TokenRequest;
  const { [TOKEN_URL]: context } = token;

  if (hasNeededRole(neededRole, context)) {
    return next();
  }

  return res.sendStatus(UNAUTHORIZED);
};

export { checkRole };
