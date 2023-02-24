import { ApiConfigType } from '../../../contracts/api/api';

const ApiConfigs = {
  GET_GROUPS: {
    method: 'get',
    path: '/groups/{userId}',
    authenticated: true,
  } as ApiConfigType,
};

export { ApiConfigs };
