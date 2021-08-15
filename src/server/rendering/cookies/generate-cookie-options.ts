import { getMaxAgeInDays } from './get-max-age-in-days';
import { CookieOptions } from 'express';

export const generateCookieOptions = (): CookieOptions => {
  return {
    maxAge: getMaxAgeInDays(365),
    httpOnly: true,
    secure: true,
    domain: 'royk.us',
  };
};
