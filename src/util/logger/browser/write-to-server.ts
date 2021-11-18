import axios from 'axios';
import { ApiConfigs } from '../../../contracts/api.contants';
import { LogMsgType } from '../../../type/logger';
import { getParsedUrl } from '../../api/get-parsed-url';
import { getApiUrl } from '../../api/get-api-url';

/**
 * Assumes that the location being written to has been created.
 */
const writeToServer = ({ logType, msg }: LogMsgType): void => {
  const apiUrl = getApiUrl();
  const params = {};
  const logUrl = getParsedUrl(apiUrl, ApiConfigs.PUT_LOG.path, params);
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  axios.put(logUrl, { logType, msg }, options)
    .catch((e) => {
      console.error(`Logging to server failed: ${e.message}`);
    });
};

export { writeToServer };
