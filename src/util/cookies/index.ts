import Cookies from 'universal-cookie';

const cookies = new Cookies();

const ACKNOWLEDGED_COOKIE_USE_COOKIE = 'acknowledge-cookie-use';

const getCookie = (name: string): string => {
  return cookies.get(name);
};

const setCookie = (name: string, value: string): void => {
  cookies.set(name, value);
};

export { ACKNOWLEDGED_COOKIE_USE_COOKIE, getCookie, setCookie };
