import http from 'http';
import fs from 'fs';
import spdy from 'spdy';
import {Application} from 'express';

const loadCredentials = () => {
  const privateKey = fs.readFileSync('./cert/localhost.key', 'utf8');
  const certificate = fs.readFileSync('./cert/localhost.crt', 'utf8');

  return {
    key: privateKey,
    cert: certificate,
  };
};

export const startServer = (app: Application): void => {
  // const httpServer = http.createServer(app);
  // httpServer.listen(80, () => console.log('Server is running'));

  const credentials = loadCredentials();
  spdy.createServer(credentials, app).listen(
    5000,
    () => {
      console.log('Secure server is running');
    },
  );

  return;
};
