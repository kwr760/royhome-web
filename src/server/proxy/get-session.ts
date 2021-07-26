import axios from 'axios';

import env from '../../config';
import { ApiConfigs } from '../../client/util/api/api.config';
import { getParsedUrl } from '../../client/util/api/get-parsed-url';

export const getSessionProxy = async (sessionId: string): Promise<unknown> => {
  const config = ApiConfigs.GET_SESSION;
  const apiUrl = env.server.apiUrl;
  const path = `${config.path}`.replace('{sessionId}', sessionId);
  const url = getParsedUrl(apiUrl, path);

  const { data } = await axios.get(url);
  return data.output;
};
