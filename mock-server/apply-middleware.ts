import {Application} from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import httpContext from 'express-http-context';

export const applyMiddleware = (app: Application) => {
  app.set('json spaces', 2);
  app.enable('etag');
  app.enable('query parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false,
  }));
  app.use(cookieParser());
  app.use(httpContext.middleware);
};
