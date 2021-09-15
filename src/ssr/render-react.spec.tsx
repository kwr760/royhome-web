import { Request, Response } from 'express';
import { getResumeProxy } from '../proxy/get-resume.proxy';
import renderReact from './render-react';

jest.mock('parseurl');
jest.mock('@loadable/server');
jest.mock('../proxy/get-resume.proxy');

describe('server/rendering/render-react', () => {
  const resume = {
    owner: 'owner',
  };
  it('should return a html page', async () => {
    // Arrange
    const req = {
      url: '/',
      cookies: {},
      header: jest.fn(),
    };
    const res = {
      send: jest.fn(),
      sendStatus: jest.fn(),
      cookie: jest.fn(),
    } as unknown as Response;
    (getResumeProxy as jest.Mock).mockResolvedValue(resume);

    // Act
    await renderReact(req as unknown as Request, res);

    // Assert
    expect(res.send).toMatchSnapshot();
  });
});