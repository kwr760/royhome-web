import { env } from '../../../config/env';
import { MiddleWareFunction } from '../contracts/tictactoe.context';
import { logger } from './logger.middleware';

const getAfterware = (): MiddleWareFunction[] => {
  const afterware: MiddleWareFunction[] = [];
  if (env.tictactoe.logReducer) {
    afterware.push(logger());
  }
  return afterware;
};

export { getAfterware };
