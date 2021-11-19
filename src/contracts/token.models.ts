import { Request } from 'express';
import { TOKEN_URL } from './constants/role.constants';

interface TokenRequest extends Request {
  user: {
    [TOKEN_URL]: {
      role: string;
    }
  }
}

export type { TokenRequest };
