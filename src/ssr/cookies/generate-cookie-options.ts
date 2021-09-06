import { CookieOptions, Request } from 'express';
import { getMaxAgeInDays } from './get-max-age-in-days';

export const generateCookieOptions = (req: Request): CookieOptions => {
  const defaultHost = 'royk.us';
  const domain = req.header('domain');

  const options = {
    maxAge: getMaxAgeInDays(365),
    httpOnly: true,
    secure: true,
    domain: domain || defaultHost,
  };

  console.log(JSON.stringify(options));
  return options;
};
