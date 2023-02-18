import axios from 'axios';
import { ApiConfigs } from '../../../contracts/constants/api.constants';
import { LogMsgType } from '../../../contracts/logger.models';
import { getParsedUrl } from '../../api/get-parsed-url';
import { getApiUrl } from '../../api/get-api-url';

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
