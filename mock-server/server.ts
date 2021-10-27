import express, { Request, Response } from 'express';
import { findRoute } from './find-route';
import { MockRoute } from './routes';
import {startServer} from './start-server';
import {applyMiddleware} from './apply-middleware';

const app = express();
applyMiddleware(app);

app.use('/*', (req: Request, res: Response) => {
  console.log(JSON.stringify({
    header: req.header,
    query: req.query,
    baseUrl: req.baseUrl,
    body: req.body,
  }));
  const mockRoute: MockRoute = findRoute(req) || { mock: {} };

  res.send(mockRoute.mock as unknown);
});

startServer(app);
