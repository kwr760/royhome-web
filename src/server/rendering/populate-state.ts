import { matchPath } from 'react-router-dom';
import { UserApiType } from '../../types/api/user';
import { SessionStateType } from '../../types/state/session';
import { StateType } from '../../types/state/state';
import { UserStateType } from '../../types/state/user';

import { fetchRoutes } from './fetch-routes';
import { DarkModes } from '../../client/store/session/session.constants';
import { getSessionProxy } from '../proxy/get-session.proxy';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const populateState = async (path: string, sessionId?: string): Promise<StateType> => {
  const activeRoute = fetchRoutes.find((route) => matchPath(path, route));
  const data = (activeRoute && activeRoute.fetchData) ? await activeRoute.fetchData() : {};
  let session: SessionStateType, user: UserStateType;
  if (sessionId) {
    const {browserId, expiration, darkMode, user: sessionUser} = await getSessionProxy(sessionId);
    const {userId, email, context} = sessionUser as UserApiType;
    session = {
      sessionId,
      browserId,
      expiration,
      authenticated: expiration ? (expiration > 0) : false,
      darkMode,
    };
    user = {
      userId,
      email,
      context: context ? JSON.parse(context as unknown as string) : {},
    };
  } else {
    session = {
      authenticated: false,
      expiration: -1,
      isLoading: false,
      darkMode: DarkModes.CLEAR_MODE,
    };
    user = {};
  }

  return {
    session,
    user,
    resume: {
      email: '',
      resumes: {},
    },
    ...data,
  };
};

export default populateState;
