import { matchPath } from 'react-router-dom';

import { getResumeProxy } from '../../src/proxy/get-resume.proxy';
import { fetchRoutes } from '../../src/ssr/fetch-routes';

jest.mock('../../src/proxy/get-resume.proxy');

describe('server/rendering/fetch-routes', () => {
  const email = 'kroy760@gmail.com';
  const resume = {
    owner: 'owner',
  };
  it('should have known length', () => {
    // Arrange // Act // Assert
    expect(fetchRoutes.length).toEqual(1);
  });
  it('should return resume state', async () => {
    // Arrange
    const url = '/';
    (getResumeProxy as jest.Mock).mockResolvedValueOnce(resume);
    const expectedResult = {
      resume: {
        email: email,
        resumes: {
          [email]: resume,
        },
      },
    };

    // Act
    const activeRoute = fetchRoutes.find((route) => matchPath(url, route.path));
    const data = (activeRoute && activeRoute.fetchData) ? await activeRoute.fetchData() : {};

    // Assert
    expect(data).toEqual(expectedResult);
  });
});
