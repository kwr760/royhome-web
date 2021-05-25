import env from '../../../config';
import { DOCKER } from '../../../config/release-environments';

export const getApiUrl = (): string => {
  if (env.release === DOCKER) {
    return env.server.apiUrl;
  }
  const { host, protocol } = global.location;
  const domain = host.substring(host.lastIndexOf('.', host.lastIndexOf('.') - 1) + 1);
  return `${protocol}//api.${domain}`;
};
