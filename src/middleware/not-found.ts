import { Request, Response } from 'express';
import { NOT_FOUND } from 'http-status-codes';
import Logger from '../util/logger/server';

const notFound = (_req: Request, res: Response): Response => {
  Logger.error('Endpoint was not found');
  return res.sendStatus(NOT_FOUND);
};

export { notFound };
