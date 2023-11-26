import { type Method } from 'axios';
import { type AnyAction } from 'redux';
import { type ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface ApiParams {
  [key: string]: string;
}
interface ApiDetailsType {
  payload?: unknown;
  params?: ApiParams;
  token?: string;
}
interface ApiConfigType {
  method: Method;
  path: string;
  authenticated?: boolean;
  headers?: {
    Authorization?: string;
  };
}
interface ApiConfigWithDispatch {
  method: Method;
  path: string;
  showSpinner: boolean;
  successAction: ActionCreatorWithPayload<AnyAction>;
  failureAction: ActionCreatorWithPayload<string>;
}

export {
  type ApiConfigWithDispatch,
  type ApiConfigType,
  type ApiDetailsType,
  type ApiParams,
};
