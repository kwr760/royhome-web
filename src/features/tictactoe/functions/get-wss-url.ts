import { env } from '../../../config/env';

const getWssUrl = (subject: string): string => {
  if (env.server.deriveUrl) {
    const { host } = global.location;
    const domain = host.substring(host.lastIndexOf('.', host.lastIndexOf('.') - 1) + 1);
    return `wss://api.${domain}/${subject}`;
  } else {
    return `${env.server.websocketUrl}`;
  }
};

export { getWssUrl };

