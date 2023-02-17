import { GetTokenSilentlyOptions, RedirectLoginOptions } from '@auth0/auth0-spa-js';

interface Auth0ContextData {
  role?: string;
  app?: string;
  data?: string;
}
interface Auth0User {
  userId?: string,
  email?: string,
  context?: Auth0ContextData,
  nickname?: string,
  name?: string,
  picture?: string,
}
interface Auth0Provider {
  children: React.ReactNode;
  context?: Auth0ContextData;
  onRedirectCallback?: (cb: string) => unknown;
  audience?: string;
  clientId: string;
  domain: string;
  authorizationParams?: {
    redirect_uri?: string;
  }
  useRefreshTokens?: boolean;
  cacheLocation?: unknown;
}
interface Auth0Context {
  login: (props: RedirectLoginOptions) => unknown;
  logout: (...p: unknown[]) => unknown;
  getToken: ((props: GetTokenSilentlyOptions) => Promise<string>) | (() => unknown);
}

export type { Auth0Context, Auth0ContextData, Auth0Provider, Auth0User };
