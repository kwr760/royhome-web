import express from 'express';
import {startMockServer} from './start-mock-server';
import {applyMiddleware} from './apply-middleware';

const app = express();
applyMiddleware(app);

app.use('/*', (req, res) => {
  console.log(JSON.stringify({
    header: req.header,
    query: req.query,
    params: req.params,
    body: req.body,
  }));
  res.send({});
});

startMockServer(app);
