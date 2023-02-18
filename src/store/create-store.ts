import { configureStore } from '@reduxjs/toolkit';
import type { Store } from '@reduxjs/toolkit';
import { env } from '../config/env';
import { PRODUCTION } from '../contracts/constants/environments.constants';
import { rootReducer } from './root.reducer';

const createStore = (preloadedState = {}): Store => {
  const reducer = rootReducer;

  return configureStore({
    reducer,
    preloadedState,
    devTools: env.release !== PRODUCTION,
  });
};

export { createStore } ;
