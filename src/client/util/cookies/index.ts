import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const ACKNOWLEDGED_COOKIE_USE_COOKIE = 'acknowledge-cookie-use';

export const getCookie = (name: string): string => {
  return cookies.get(name);
};

export const setCookie = (name: string, value: string): void => {
  cookies.set(name, value);
};
