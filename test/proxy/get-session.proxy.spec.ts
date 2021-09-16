import axios from 'axios';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';

import { getSessionProxy } from '../../src/proxy/get-session.proxy';

jest.mock('axios');

describe('web/server/proxy/get-session.proxy', () => {
  it('should get session', async () => {
    // Arrange
    const sessionId = 'session-id';
    const expected = { session: 'session' };
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        output: expected,
      },
    });

    // Act
    const session = await getSessionProxy(sessionId);

    // Assert
    expect(axios.get).toBeCalledWith('https://api.royk.us/session/session-id');
    expect(session).toEqual(expected);
  });
  it('should throw error with session', async () => {
    // Arrange
    const sessionId = 'session-id';
    const expectedError = {
      message: 'Internal Server Error',
      response: {
        status: INTERNAL_SERVER_ERROR,
      },
    };
    (axios.get as jest.Mock).mockRejectedValue(expectedError);

    // Act
    try {
      await getSessionProxy(sessionId);
    } catch (e) {
      expect(e).toBe(expectedError);
    }
    // Assert
    expect(axios.get).toBeCalledWith('https://api.royk.us/session/session-id');
  });
  it('should throw not found error when there is no session', async () => {
    // Arrange
    const sessionId = 'session-id';
    const expectedError = {
      message: 'Not Found',
      response: {
        status: NOT_FOUND,
      },
    };
    (axios.get as jest.Mock).mockRejectedValue(expectedError);

    // Act
    const response = await getSessionProxy(sessionId);

    // Assert
    expect(axios.get).toBeCalledWith('https://api.royk.us/session/session-id');
    expect(response).toEqual({});
  });
});
