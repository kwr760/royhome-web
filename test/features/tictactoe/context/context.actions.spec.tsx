import { updateRemoteGame } from '../../../../src/features/tictactoe/context/context.actions';
import { ActionEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';

describe('feature/tictactoe/context/context.actions', () => {
  it('should produce updateRemoteGame action', () => {
    // Arrange
    const expectedResult = {
      type: ActionEnum.UpdateRemoteGame,
      payload: {
        remote: true,
      },
    };

    // Act
    const result = updateRemoteGame(true);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
