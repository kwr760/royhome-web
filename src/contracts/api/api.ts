import type { Method } from 'axios';

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
  headers?: {
    Authorization?: string;
  };
  authenticated?: boolean;
}

export type { ApiConfigType, ApiDetailsType, ApiParams };
