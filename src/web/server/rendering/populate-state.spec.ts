import { CookieType } from '../../types/state.types';
import { COOKIE_JWT_PAYLOAD } from '../../util/auth0/auth0.constants';
import { TOKEN_URL } from '../../../common/util/auth0/role.constants';

import { getResumeProxy } from '../proxy/resume.proxy';
import populateState from './populate-state';
import { DarkModes } from '../../client/store/session/session.constants';

jest.mock('../proxy/resume.proxy');

describe('server/rendering/populate-state', () => {
  const jwt = {
    exp: 10,
    [TOKEN_URL]: 'test data',
    user: {},
  };
  const email = 'kroy760@gmail.com';
  const resume = {
    owner: 'owner',
  };
  it('should return an state from empty context', async () => {
    // Arrange
    const url = '/';
    const cookies: CookieType = {
      [COOKIE_JWT_PAYLOAD]: JSON.stringify(jwt),
    };
    (getResumeProxy as jest.Mock).mockResolvedValueOnce(resume);
    const expected = {
      session: {
        authenticated: true,
        expiration: -1,
        isLoading: false,
        darkMode: DarkModes.CLEAR_MODE,
      },
      user: {},
      resume: {
        email: email,
        resumes: {
          [email]: resume,
        },
      },
    };

    // Act
    const state = await populateState(url, cookies);

    // Assert
    expect(state).toEqual(expected);
  });
  it('should not find route', async () => {
    // Arrange
    const url = '/notfound';
    const cookies: CookieType = {
      [COOKIE_JWT_PAYLOAD]: JSON.stringify(jwt),
    };
    (getResumeProxy as jest.Mock).mockResolvedValueOnce(resume);
    const expected = {
      session: {
        authenticated: true,
        expiration: -1,
        isLoading: false,
        darkMode: DarkModes.CLEAR_MODE,
      },
      user: {},
      resume: {
        email: '',
        resumes: {},
      },
    };

    // Act
    const state = await populateState(url, cookies);

    // Assert
    expect(state).toEqual(expected);
  });
  it('should not find payload', async () => {
    // Arrange
    const url = '/';
    const cookies: CookieType = {};
    (getResumeProxy as jest.Mock).mockResolvedValueOnce({});
    const expected = {
      session: {
        authenticated: false,
        expiration: -1,
        isLoading: false,
        darkMode: DarkModes.CLEAR_MODE,
      },
      user: {},
      resume: {
        email: email,
        resumes: {
          [email]: resume,
        },
      },
    };

    // Act
    const state = await populateState(url, cookies);

    // Assert
    expect(state).toEqual(expected);
  });
});
