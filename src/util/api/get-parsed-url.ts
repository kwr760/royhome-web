import { ApiParams } from '../../contracts/api/api';

const getParsedUrl = (baseUrl: string, path: string, params: ApiParams = {}): string => {
  let parsedUrl = `${baseUrl}${path}`;
  Object.keys(params).forEach((key) => {
    parsedUrl = parsedUrl.replace(`{${key}}`, encodeURIComponent(params[key]));
  });
  return parsedUrl;
};

export { getParsedUrl };
