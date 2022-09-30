import axios from 'axios';
import { env } from '../config/env';
import { ApiConfigs } from '../contracts/constants/api.constants';
import { Resume } from '../features/resume/contracts/resume.models';
import { getParsedUrl } from '../util/api/get-parsed-url';

const getResumeProxy = async (email: string): Promise<Resume> => {
  const config = ApiConfigs.GET_RESUME;
  const apiUrl = env.server.apiUrl;
  const path = `${config.path}`.replace('{email}', email);
  const url = getParsedUrl(apiUrl, path);

  const { data } = await axios.get(url);
  return data.output;
};

export { getResumeProxy };
