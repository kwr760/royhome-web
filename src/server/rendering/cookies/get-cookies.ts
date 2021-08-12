import { Request } from 'express';
import {BROWSER_ID, SESSION_ID} from './cookie.constants';

export const getCookies = (req: Request): { browserId: string, sessionId: string } => {
  const { cookies } = req;
  const browserId = cookies[BROWSER_ID];
  const sessionId = cookies[SESSION_ID];

  return { browserId, sessionId };
};
