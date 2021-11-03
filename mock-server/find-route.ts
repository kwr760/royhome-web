import { Request } from 'express';
import { MockRoute, routes } from './routes';

export const findRoute = (req: Request): MockRoute | undefined => {
  const route = routes.find((e: MockRoute) => {
    const route = e.route || '';
    const regex = new RegExp(route);
    return (e.method === req.method && req.baseUrl.match(regex));
  });

  return route;
};
