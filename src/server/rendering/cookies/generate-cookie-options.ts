import { getMaxAgeInDays } from './get-max-age-in-days';
import {Method} from "axios";

export interface CookieOptions {
  maxAge: number;
  httpOnly: boolean;
  secure: boolean;
}

export const generateCookieOptions = (): CookieOptions => {
  return {
    maxAge: getMaxAgeInDays(365),
    httpOnly: true,
    secure: true,
  };
};
