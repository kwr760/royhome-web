import { expressjwt } from 'express-jwt';
import jwtRsa from 'jwks-rsa';

import { env } from '../config/env';

const checkJwt = expressjwt({
  secret: jwtRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${
      env.auth0.domain
    }/.well-known/jwks.json`,
  }),

  issuer: `https://${env.auth0.domain}/`,
  algorithms: ['RS256'],
});

export { checkJwt };
