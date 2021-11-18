import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';
import dotenv from 'dotenv';

import { env } from './config/env';

import { handleError } from './middleware/handle-error';
import { notFound } from './middleware/not-found';
import { renderReact } from './ssr/render-react';
import { startHttpsServer } from './middleware/start-https';
import { startHttpServer } from './middleware/start-http';

const publicDir = path.resolve(env.root);

// Resolves:  Error: unable to verify the first certificate
// The self-signed license can be rejected by some browsers because it is missing an intermediate certificate.
// The following avoids this problem and makes the server insecure (http).  Do not use in Production.
// If your OS/browser combo is having problem -- use this or create a real certificate for a real URL.
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const app = express();

app.set('json spaces', 2);
app.enable('etag');
app.enable('query parser');

app.use(cors());
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'script-src': ['\'self\'', '\'unsafe-inline\'', '*.royk.us', '*.royhome.net'],
      'connect-src': ['\'self\'', '*.royk.us', '*.royhome.net', 'royk.auth0.com', 'localhost:5000'],
      'frame-src': ['\'self\'', 'royk.auth0.com'],
      'img-src': ['\'self\'', 'data:', 'avatars.githubusercontent.com'],
    },
  },
}));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(httpContext.middleware);

app.use('/', express.static(publicDir));
app.get('/*', renderReact);

app.use(handleError);
app.use(notFound);

dotenv.config();
const port = parseInt(process.env.SERVER_PORT || '3000');
if (env.server.enableHttps) {
  startHttpsServer(app, port);
} else {
  startHttpServer(app, port);
}

export default app;
