import axios, { AxiosError } from 'axios';
import { NOT_FOUND } from 'http-status-codes';

import { env } from '../config/env';
import { ApiConfigs } from '../contracts/api.contants';
import { getParsedUrl } from '../util/api/get-parsed-url';
import { SessionApiType } from '../type/api/session';

export const getSessionProxy = async (sessionId: string): Promise<SessionApiType> => {
  const config = ApiConfigs.GET_SESSION;
  const apiUrl = env.server.apiUrl;
  const path = `${config.path}`.replace('{sessionId}', sessionId);
  const url = getParsedUrl(apiUrl, path);

  let response, data = {};
  try {
    response = await axios.get(url);
    data = response.data.output;
  } catch (err) {
    const status = (err as AxiosError).response?.status;
    if (status !== NOT_FOUND) {
      throw err;
    }
  }
  return data;
};
