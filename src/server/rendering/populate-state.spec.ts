import { getResumeProxy } from '../proxy/get-resume.proxy';
import { getSessionProxy } from '../proxy/get-session.proxy';
import populateState from './populate-state';
import { DarkModes } from '../../client/store/session/session.constants';

jest.mock('../proxy/get-resume.proxy');
jest.mock('../proxy/get-session.proxy');

describe('server/rendering/populate-state', () => {
  const email = 'kroy760@gmail.com';
  const resume = {
    owner: 'owner',
  };
  it('should return an state from empty context', async () => {
    // Arrange
    const url = '/';
    const sessionId = 'session-id';
    const session = {
      browserId: 'browser-id',
      expiration: 1000,
      darkMode: 'dark-node',
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
        authenticated: true,
        'browserId': 'browser-id',
        'darkMode': 'dark-node',
        'expiration': 1000,
        'sessionId': 'session-id',
      },
      user: {
        'context': 'context',
        'email': 'person@email.com',
        'userId': 'user-id',
      },
      resume: {
        email: email,
        resumes: {
          [email]: resume,
        },
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
    const session = {
      browserId: 'browser-id',
      darkMode: 'dark-node',
      user: {
        userId: 'user-id',
        email: 'person@email.com',
      },
    };
    (getResumeProxy as jest.Mock).mockResolvedValueOnce(resume);
    (getSessionProxy as jest.Mock).mockResolvedValueOnce(session);
    const expected = {
      session: {
        authenticated: false,
        'browserId': 'browser-id',
        'darkMode': 'dark-node',
        'sessionId': 'session-id',
      },
      user: {
        'context': {},
        'email': 'person@email.com',
        'userId': 'user-id',
      },
      resume: {
        email: '',
        resumes: {},
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
      },
      user: { },
      resume: {
        email: email,
        resumes: {
          [email]: resume,
        },
      },
    };

    // Act
    const state = await populateState(url);

    // Assert
    expect(state).toEqual(expected);
  });
});
