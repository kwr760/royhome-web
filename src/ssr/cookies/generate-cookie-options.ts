import { CookieOptions, Request } from 'express';
import { getMaxAgeInDays } from './get-max-age-in-days';

const generateCookieOptions = (req: Request): CookieOptions => {
  const defaultHost = 'royk.us';
  const domain = req.header('domain');

  return {
    maxAge: getMaxAgeInDays(365),
    httpOnly: true,
    secure: true,
    domain: domain || defaultHost,
  };
};

export { generateCookieOptions };
