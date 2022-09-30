import { ApiConfigType } from '../api/api';

const ApiConfigs = {
  PUT_LOG: {
    method: 'put',
    path: '/log',
    headers: {
      'Content-Type': 'application/json',
    },
    authenticated: false,
  } as ApiConfigType,
  GET_RESUME: {
    method: 'get',
    path: '/resume/{email}',
    authenticated: false,
  } as ApiConfigType,
  SAVE_SESSION: {
    method: 'post',
    path: '/session',
    headers: {
      'Content-Type': 'application/json',
    },
    authenticated: false,
  } as ApiConfigType,
  GET_SESSION: {
    method: 'get',
    path: '/session/{sessionId}',
    authenticated: false,
  } as ApiConfigType,
};

export { ApiConfigs };
