import path from 'path';
import fs from 'fs';
import parseUrl from 'parseurl';
import { Request, Response } from 'express';
import { ChunkExtractor } from '@loadable/server';
import React, { ComponentType } from 'react';
import { renderToString } from 'react-dom/server';
import { Store } from 'redux';
import { ServerStyleSheets } from '@material-ui/core/styles';

import env from '../../config';
import populateState from './populate-state';
import displayMessage from '../middleware/display-message';
import createStore from '../../client/store/create-store';
import {getCookies} from "./cookies/get-cookies";
import {generateCookieIds} from "./cookies/generate-cookie-ids";
import {BROWSER_ID, SESSION_ID} from "./cookies/cookie.constants";
import {generateCookieOptions} from "./cookies/generate-cookie-options";

interface Props {
  url: string,
  store: Store,
}
interface MainType {
  default: ComponentType<Props>,
}
const renderReact = async (req: Request, res: Response): Promise<void> => {
  displayMessage(`Server render:  ${req.url}`);

  // Extract the creation of the markup to a separate file
  const nodeStats = path.resolve(env.root, './dist/ssr/loadable-stats.json');
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats });
  const { default: Main } = nodeExtractor.requireEntrypoint() as unknown as MainType;
  const webStats = path.resolve(env.root, './dist/browser/loadable-stats.json');
  const webExtractor = new ChunkExtractor({ statsFile: webStats });
  const url = parseUrl(req) || { pathname: ''};
  const pathname = url.pathname || '';
  const { browserId, sessionId } = getCookies(req);
  const state = await populateState(pathname, sessionId);
  const store = createStore(state);
  const sheets = new ServerStyleSheets();
  const jsx = webExtractor.collectChunks(
    sheets.collect(<Main
      url={pathname}
      store={store}
    />),
  );
  const markup = renderToString(jsx);
  const css = sheets.toString();

  // Extract the creation of the html to a separate file
  const indexFile = path.resolve('./src/client/assets/index.html');
  const contents = fs.readFileSync(indexFile, 'utf8');
  const preloadedState = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  const responseHtml = contents
    .replace('{css}', css)
    .replace('{markup}', markup)
    .replace('{linkTags}', webExtractor.getLinkTags())
    .replace('{styleTags}', webExtractor.getStyleTags())
    .replace('{scriptTags}', webExtractor.getScriptTags())
    .replace('{preloadedState}', preloadedState);

  const { browserId: resBrowserId, sessionId: resSessionId } = generateCookieIds(browserId, sessionId);
  res.cookie(BROWSER_ID, resBrowserId, generateCookieOptions());
  res.cookie(SESSION_ID, resSessionId, generateCookieOptions());
  res.send(responseHtml);
};

export default renderReact;
