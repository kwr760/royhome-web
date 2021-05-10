import spdy from 'spdy';
import { Application } from 'express';
import fs from 'fs';

import env from '../../config';
import displayMessage from './display-message';
import ErrnoException = NodeJS.ErrnoException;

const throwError = (err: ErrnoException | null) => { if (err) throw err; };

const startHttpsServer = (app: Application, port: number): void => {
  const privateKey = fs.readFileSync(env.cert.key, 'utf8');
  const certificate = fs.readFileSync(env.cert.cert, 'utf8');
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
