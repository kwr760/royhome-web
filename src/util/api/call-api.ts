import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import { ERROR_CODE } from '../error-codes';
import { getParsedUrl } from './get-parsed-url';
import { getApiUrl } from './get-api-url';
import { ApiDetailsType, ApiConfigType } from '../../contracts/api/api';

const callApi = async (
  api: ApiConfigType,
  details: ApiDetailsType,
): Promise<AxiosResponse> => {
  const { method, path, headers = {}, authenticated = false } = api;
  const { payload, token, params } = details;
  const apiUrl = getApiUrl();
  const url = getParsedUrl(apiUrl, path, params);

  if (authenticated) {
    if (isEmpty(token)) {
      throw ERROR_CODE.API_UNAUTHENTICATED;
    }
    headers.Authorization = `Bearer ${token}`;
  }

  return axios(
    {
      method,
      url,
      headers,
      data: JSON.stringify(payload),
      withCredentials: true,
    },
  );
};

export { callApi };
