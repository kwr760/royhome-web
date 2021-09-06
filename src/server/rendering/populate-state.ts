import { matchPath } from 'react-router-dom';
import { SessionStateType } from '../../types/state/session';
import { StateType } from '../../types/state/state';

import { fetchRoutes } from './fetch-routes';
import { DarkModes } from '../../client/store/session/session.constants';
import { getSessionProxy } from '../proxy/get-session.proxy';

const populateState = async (path: string, sessionId?: string): Promise<StateType> => {
  const activeRoute = fetchRoutes.find((route) => matchPath(path, route));
  const data = (activeRoute && activeRoute.fetchData) ? await activeRoute.fetchData() : {};
  let session: SessionStateType;
  if (sessionId) {
    const currentSession = await getSessionProxy(sessionId);
    const {
      browserId = '',
      expiration = 0,
      darkMode = DarkModes.CLEAR_MODE,
      user: sessionUser = { userId: undefined, email: undefined, context: undefined },
    } = currentSession;
    const {userId, email, context} = sessionUser;
    const current = Date.now();
    session = {
      sessionId,
      browserId,
      expiration,
      authenticated: expiration ? (expiration > current) : false,
      darkMode,
      user: {
        userId,
        email,
        context: context ? JSON.parse(context as unknown as string) : undefined,
      },
    };
  } else {
    session = {
      authenticated: false,
      expiration: -1,
      isLoading: false,
      darkMode: DarkModes.CLEAR_MODE,
      user: {},
    };
  }

  return {
    session,
    resume: {
      email: '',
      resumes: {},
    },
    ...data,
  };
};

export default populateState;
