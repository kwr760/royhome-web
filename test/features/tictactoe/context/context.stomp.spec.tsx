import type { IFrame } from '@stomp/stompjs';
import { connectStomp } from '../../../../src/features/tictactoe/context/context.stomp';

const mockStompActivate = jest.fn();
const mockStompSubscribe = jest.fn();
jest.mock('@stomp/stompjs', () => ({
  Client: jest.fn().mockImplementation(() => ({
    activate: mockStompActivate,
    subscribe: mockStompSubscribe,
  })),
}));

describe('feature/tictactoe/context/context.stomp', () => {
  it('should call takeTurn as One', () => {
    // Arrange
    const destination = '/game/session-id';
    const callback = jest.fn();
    const frame = {} as unknown as IFrame;

    // Act
    const client = connectStomp(destination, callback);
    client.onConnect(frame);

    // Assert
    expect(mockStompSubscribe).toBeCalledWith(destination, callback);
    expect(mockStompActivate).toBeCalled();
  });
});
