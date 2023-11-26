import { ApiConfigType } from '../../../contracts/api/api';

const ApiConfigs = {
  GET_GROUPS: {
    method: 'get',
    path: '/groups?userId={userId}',
  } as ApiConfigType,
  CREATE_GROUP: {
    method: 'post',
    path: '/group',
    headers: {
      'Content-Type': 'application/json',
    },
  } as ApiConfigType,
  MODIFY_GROUP: {
    method: 'put',
    path: '/group/{groupId}',
    headers: {
      'Content-Type': 'application/json',
    },
  } as ApiConfigType,
  DELETE_GROUP: {
    method: 'delete',
    path: '/group/{groupId}',
  } as ApiConfigType,
  CREATE_ACTIVITY: {
    method: 'post',
    path: '/activity',
    headers: {
      'Content-Type': 'application/json',
    },
  } as ApiConfigType,
  MODIFY_ACTIVITY: {
    method: 'put',
    path: '/activity/{activityId}',
    headers: {
      'Content-Type': 'application/json',
    },
  } as ApiConfigType,
  DELETE_ACTIVITY: {
    method: 'delete',
    path: '/activity/{activityId}',
  } as ApiConfigType,
};

export { ApiConfigs };
