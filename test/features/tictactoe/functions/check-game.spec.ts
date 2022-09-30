import { BoardType } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
import { GameStateEnum, PlayerEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { evaluateGame } from '../../../../src/features/tictactoe/functions/evaluate-game';
import { findWinner } from '../../../../src/features/tictactoe/functions/find-winner';
import { isGameOver } from '../../../../src/features/tictactoe/functions/is-game-over';

jest
  .mock('../../../../src/features/tictactoe/functions/find-winner')
  .mock('../../../../src/features/tictactoe/functions/is-game-over');

describe('feature/tictactoe/functions/check-game', () => {
  it('should determine a completed', () => {
    // Arrange
    const board: BoardType = initialState.board;
    (findWinner as jest.Mock).mockReturnValue(PlayerEnum.One);
    const expected = {
      gameState: GameStateEnum.Completed,
      winner: PlayerEnum.One,
    };

    // Act
    const winner = evaluateGame(board);

    // Assert
    expect(winner).toEqual(expected);
  });
  it('should determine a tie', () => {
    // Arrange
    const board: BoardType = initialState.board;
    (findWinner as jest.Mock).mockReturnValue(PlayerEnum.Neither);
    (isGameOver as jest.Mock).mockReturnValue(true);
    const expected = {
      gameState: GameStateEnum.Completed,
    };

    // Act
    const winner = evaluateGame(board);

    // Assert
    expect(winner).toEqual(expected);
  });
  it('should determine that we are not done', () => {
    // Arrange
    const board: BoardType = initialState.board;
    (findWinner as jest.Mock).mockReturnValue(PlayerEnum.Neither);
    (isGameOver as jest.Mock).mockReturnValue(false);
    const expected = {
      gameState: GameStateEnum.Active,
    };

    // Act
    const winner = evaluateGame(board);

    // Assert
    expect(winner).toEqual(expected);
  });
});
