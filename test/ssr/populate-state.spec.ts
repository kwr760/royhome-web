import { noId } from '../../src/contracts/constants/auth0.constants';
import { getResumeProxy } from '../../src/proxy/get-resume.proxy';
import { getSessionProxy } from '../../src/proxy/get-session.proxy';
import { populateState } from '../../src/ssr/populate-state';
import { DarkModes } from '../../src/contracts/constants/session.constants';

jest.mock('../../src/proxy/get-resume.proxy');
jest.mock('../../src/proxy/get-session.proxy');

describe('server/rendering/populate-state', () => {
  const email = 'kroy760@gmail.com';
  const resume = {
    owner: 'owner',
  };
  it('should return an state from session', async () => {
    // Arrange
    const url = '/';
    const sessionId = 'session-id';
    const session = {
      browserId: 'browser-id',
      expiration: 1000,
      darkMode: DarkModes.DARK_MODE,
      user: {
        userId: 'user-id',
        email: 'person@email.com',
        context: '"context"',
      },
    };
    (getResumeProxy as jest.Mock).mockResolvedValueOnce(resume);
    (getSessionProxy as jest.Mock).mockResolvedValueOnce(session);
    const expected = {
      session: {
        authenticated: false,
        browserId: 'browser-id',
        darkMode: DarkModes.DARK_MODE,
        expiration: 1000,
        sessionId: 'session-id',
        isLoading: false,
        user: {
          context: 'context',
          email: 'person@email.com',
          userId: 'user-id',
        },
      },
      resume: {
        email: email,
        resumes: {
          [email]: resume,
        },
      },
      tracker: {
        action: 'none',
        groups: [],
      },
    };

    // Act
    const state = await populateState(url, sessionId);

    // Assert
    expect(state).toEqual(expected);
  });
  it('should not find route', async () => {
    // Arrange
    const url = '/notfound';
    const sessionId = 'session-id';
    const session = {};
    (getResumeProxy as jest.Mock).mockResolvedValueOnce(resume);
    (getSessionProxy as jest.Mock).mockResolvedValueOnce(session);
    const expected = {
      session: {
        authenticated: false,
        browserId: '',
        darkMode: DarkModes.CLEAR_MODE,
        sessionId: 'session-id',
        isLoading: false,
        expiration: 0,
        user: {
          context: undefined,
          email: undefined,
          userId: noId,
        },
      },
      resume: {
        email: '',
        resumes: {},
      },
      tracker: {
        action: 'none',
        groups: [],
      },
    };

    // Act
    const state = await populateState(url, sessionId);

    // Assert
    expect(state).toEqual(expected);
  });
  it('should not find payload', async () => {
    // Arrange
    const url = '/';
    (getResumeProxy as jest.Mock).mockResolvedValueOnce({});
    const expected = {
      session: {
        authenticated: false,
        expiration: -1,
        isLoading: false,
        darkMode: DarkModes.CLEAR_MODE,
        user: {
          userId: noId,
        },
      },
      resume: {
        email: email,
        resumes: {
          [email]: resume,
        },
      },
      tracker: {
        action: 'none',
        groups: [],
      },
    };

    // Act
    const state = await populateState(url);

    // Assert
    expect(state).toEqual(expected);
  });
});
