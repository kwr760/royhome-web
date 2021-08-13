import axios from 'axios';

import { getSessionProxy } from './get-session.proxy';

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
    (axios.get as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

    // Act
    try {
      await getSessionProxy(sessionId);
    } catch (e) {
      expect(e.toString()).toBe('Error: Internal Server Error');
    }
    // Assert
    expect(axios.get).toBeCalledWith('https://api.royk.us/session/session-id');
  });
});
