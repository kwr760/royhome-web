import spdy from 'spdy';
import { Application } from 'express';
import fs from 'fs';

import env from '../config';
import displayMessage from './display-message';

const throwError = (err: NodeJS.ErrnoException | null) => { if (err) throw err; };

const startHttpsServer = (app: Application, port: number): void => {
  const privateKey = fs.readFileSync(env.server.cert.key, 'utf8');
  const certificate = fs.readFileSync(env.server.cert.cert, 'utf8');
  const credentials = {
    key: privateKey,
    cert: certificate,
  };

  spdy.createServer(credentials, app).listen(
    port,
    () => {
      displayMessage('Secure server is running');
      const dateTime = new Date(Date.now());
      fs.writeFile('started', dateTime.toISOString(), throwError);
    },
  );
};

export default startHttpsServer;
