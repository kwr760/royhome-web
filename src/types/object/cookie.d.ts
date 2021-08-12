import { COOKIE_JWT_PAYLOAD } from '../../util/auth0/auth0.constants';

export interface CookieType {
  [COOKIE_JWT_PAYLOAD]?: string,
}
