import { Client } from '@stomp/stompjs';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';
import { isRemoteGame } from '../../../../src/features/tictactoe/functions/is-remote-game';

type TestTuple = {
  remote: boolean,
  sessionId: string,
  client: Client | null,
  expected: boolean,
};

describe('feature/tictactoe/functions/is-remote-game', () => {
  // Arrange
  const cases = [
    {
      remote: true,
      sessionId: 'session-id',
      client: jest.fn() as unknown as Client,
      expected: true,
    },
    {
      remote: true,
      sessionId: 'session-id',
      client: null,
      expected: false,
    },
    {
      remote: false,
      sessionId: 'session-id',
      client: jest.fn() as unknown as Client,
      expected: false,
    },
    {
      remote: true,
      sessionId: '',
      client: jest.fn() as unknown as Client,
      expected: false,
    },
  ];

  cases.forEach(({ remote, sessionId, client, expected }: TestTuple) => {
    it(`should determine if game is over - ${remote} ${sessionId} ${client} : ${expected}`, () => {
      expect(isRemoteGame({ remote, sessionId, client } as unknown as StateType)).toBe(expected);
    });
  });
});
