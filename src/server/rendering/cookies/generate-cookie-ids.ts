import { v4 as uuidv4 } from 'uuid';

export const generateCookieIds = (browserId: string, sessionId: string) => {
  let newBrowserId = browserId;
  let newSessionId = sessionId;

  if (!newBrowserId) {
    newBrowserId = uuidv4();
  }
  if (!newSessionId) {
    newSessionId = uuidv4();
  }
  return { browserId: newBrowserId, sessionId: newSessionId };
};

