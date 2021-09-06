import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';
import dotenv from 'dotenv';

import env from './config';

import handleError from './middleware/handle-error';
import notFound from './middleware/not-found';
import renderReact from './ssr/render-react';
import startHttpsServer from './middleware/start-https';
import startHttpServer from './middleware/start-http';

const publicDir = path.resolve(env.root);

const app = express();

app.set('json spaces', 2);
app.enable('etag');
app.enable('query parser');

app.use(cors());
app.use(helmet());
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
