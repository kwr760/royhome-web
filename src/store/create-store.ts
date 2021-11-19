import { configureStore } from '@reduxjs/toolkit';
import type { Action, Store } from '@reduxjs/toolkit';
import type { ThunkAction } from 'redux-thunk';
import { env } from '../config/env';
import { PRODUCTION } from '../contracts/constants/environments.constants';
import { rootReducer, RootState } from './root.reducer';

const createStore = (preloadedState = {}): Store => {
  const reducer = rootReducer;

  return configureStore({
    reducer,
    preloadedState,
    devTools: env.release !== PRODUCTION,
  });
};

type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export type { AppThunk };
export { createStore } ;
