import { messageReducer } from '../../../../src/features/tictactoe/context/message.reducer';
import {
  ActionEnum, GameStateEnum,
  MessageActionEnum,
} from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import {
  initialPlayerOne,
  initialPlayerTwo,
  initialState,
} from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { StateType } from '../../../../src/features/tictactoe/contracts/tictactoe.models';

jest.mock('../../../../src/features/tictactoe/context/context.stomp.ts');

describe('feature/tictactoe/context/message.reducer', () => {
  it('should set players', () => {
    // Arrange
    const testState = {
      ...initialState,
      sessionId: 'player-one',
      playerOne: {
        sessionId: 'player-one',
        ...initialPlayerOne,
      },
      playerTwo: {
        sessionId: 'player-remote',
        ...initialPlayerTwo,
      },
    } as StateType;
    const remoteType: ActionEnum = ActionEnum.Remote;
    const action = {
      type: remoteType,
      payload: {
        message: JSON.stringify(
          {
            action: MessageActionEnum.SetPlayers,
            game: {
              players: [
                {
                  sessionId: 'player-one',
                },
                {
                  sessionId: 'player-two',
                  name: 'new player',
                },
              ],
            },
          },
        ),
      },
    };
    const expectedState = {
      ...testState,
      playerOne: {
        sessionId: 'player-one',
      },
      playerTwo: {
        sessionId: 'player-two',
        name: 'new player',
      },
    };

    const resultState = messageReducer(testState, action);

    // Assert
    expect(resultState).toEqual(expectedState);
  });
  it('should set players from empty list', () => {
    // Arrange
    const testState = {
      ...initialState,
    } as StateType;
    const remoteType: ActionEnum = ActionEnum.Remote;
    const action = {
      type: remoteType,
      payload: {
        message: JSON.stringify(
          {
            action: MessageActionEnum.SetPlayers,
            game: {
              players: [],
            },
          },
        ),
      },
    };
    const expectedState = {
      ...testState,
    };

    const resultState = messageReducer(testState, action);

    // Assert
    expect(resultState).toEqual(expectedState);
  });
  it('should take turn', () => {
    // Arrange
    const testState = {
      ...initialState,
    } as StateType;
    const remoteType: ActionEnum = ActionEnum.Remote;
    const action = {
      type: remoteType,
      payload: {
        message: JSON.stringify(
          {
            action: MessageActionEnum.TakeTurn,
            game: {
              board: 'XXX---OOO',
            },
          },
        ),
      },
    };
    const expectedState = {
      ...testState,
      board: 'XXX---OOO',
      gameState: GameStateEnum.Active,
    };

    const resultState = messageReducer(testState, action);

    // Assert
    expect(resultState).toEqual(expectedState);
  });
  it('should take turn without new board', () => {
    // Arrange
    const testState = {
      ...initialState,
      board: 'OOO---XXX',
    } as StateType;
    const remoteType: ActionEnum = ActionEnum.Remote;
    const action = {
      type: remoteType,
      payload: {
        message: JSON.stringify(
          {
            action: MessageActionEnum.TakeTurn,
            game: { },
          },
        ),
      },
    };
    const expectedState = {
      ...testState,
      board: 'OOO---XXX',
      gameState: GameStateEnum.Active,
    };

    const resultState = messageReducer(testState, action);

    // Assert
    expect(resultState).toEqual(expectedState);
  });
  it('should end game', () => {
    // Arrange
    const testState = {
      ...initialState,
    } as StateType;
    const remoteType: ActionEnum = ActionEnum.Remote;
    const action = {
      type: remoteType,
      payload: {
        message: JSON.stringify(
          {
            action: MessageActionEnum.EndGame,
          },
        ),
      },
    };
    const expectedState = {
      ...testState,
      gameState: GameStateEnum.Completed,
    };

    const resultState = messageReducer(testState, action);

    // Assert
    expect(resultState).toEqual(expectedState);
  });
});
