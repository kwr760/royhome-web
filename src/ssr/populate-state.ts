import { matchPath } from 'react-router';
import { Session } from '../contracts/session.models';
import { State } from '../contracts/state.models';
import { getSessionProxy } from '../proxy/get-session.proxy';
import { DarkModes } from '../contracts/constants/session.constants';
import { fetchRoutes } from './fetch-routes';

const populateState = async (path: string, sessionId?: string): Promise<State> => {
  const activeRoute = fetchRoutes.find((route) => matchPath(path, route.path));
  const data = (activeRoute && activeRoute.fetchData) ? await activeRoute.fetchData() : {};
  let session: Session;
  if (sessionId) {
    const currentSession = await getSessionProxy(sessionId);
    const {
      browserId = '',
      expiration = 0,
      darkMode = DarkModes.CLEAR_MODE,
      user: sessionUser,
    } = currentSession;
    const {userId, email, context} = sessionUser || {};
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

export { populateState };
