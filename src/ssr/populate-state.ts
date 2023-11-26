import { matchPath } from 'react-router';
import { noId } from '../contracts/constants/auth0.constants';
import { DarkModes } from '../contracts/constants/session.constants';
import { Session } from '../contracts/session.models';
import { State } from '../contracts/state.models';
import { TrackerActionEnum } from '../features/tracker/contracts/tracker.enum';
import { getSessionProxy } from '../proxy/get-session.proxy';
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
    const {userId = noId, email, context} = sessionUser || {};
    const current = Date.now();
    session = {
      sessionId,
      browserId,
      expiration,
      authenticated: expiration ? (expiration > current) : false,
      darkMode,
      isLoading: false,
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
      user: {
        userId: noId,
      },
    };
  }

  return {
    session,
    resume: {
      email: '',
      resumes: {},
    },
    tracker: {
      groups: [],
      action: TrackerActionEnum.None,
    },
    ...data,
  };
};

export { populateState };
