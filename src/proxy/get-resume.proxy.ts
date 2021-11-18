import axios from 'axios';

import { env } from '../config/env';
import { ApiConfigs } from '../contracts/api.contants';
import { getParsedUrl } from '../util/api/get-parsed-url';

export const getResumeProxy = async (email: string): Promise<unknown> => {
  const config = ApiConfigs.GET_RESUME;
  const apiUrl = env.server.apiUrl;
  const path = `${config.path}`.replace('{email}', email);
  const url = getParsedUrl(apiUrl, path);

  const { data } = await axios.get(url);
  return data.output;
};
