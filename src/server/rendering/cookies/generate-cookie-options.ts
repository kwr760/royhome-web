import url from 'url';
import { CookieOptions } from 'express';
import { getMaxAgeInDays } from './get-max-age-in-days';
import env from '../../../config';

export const generateCookieOptions = (): CookieOptions => {
  const { host } = env;
  const { hostname } = url.parse(host);

  const options = {
    maxAge: getMaxAgeInDays(365),
    httpOnly: true,
    secure: true,
    domain: hostname || host,
  };

  console.log(JSON.stringify(options));
  return options;
};
