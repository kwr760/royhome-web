/* eslint-disable camelcase */
import { GetTokenSilentlyOptions, RedirectLoginOptions } from '@auth0/auth0-spa-js';
import React from 'react';

export interface Auth0ProviderType {
  children: React.ReactNode;
  context?: Auth0ContextType;
  onRedirectCallback?: (cb: string) => unknown;
  audience?: string;
  client_id: string;
  domain: string;
  redirect_uri?: string;
}
export interface Auth0ContextType {
  login: (props: RedirectLoginOptions) => unknown;
  logout: (...p: unknown[]) => unknown;
  getToken: ((props: GetTokenSilentlyOptions) => Promise<string>) | (() => unknown);
}