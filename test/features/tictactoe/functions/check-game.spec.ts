import { GameStateEnum, PieceEnum } from '../../../../src/features/tictactoe/contracts/tictactoe.enum';
import { initialState } from '../../../../src/features/tictactoe/contracts/tictactoe.initial';
import { BoardType } from '../../../../src/features/tictactoe/contracts/tictactoe.context';
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
    (findWinner as jest.Mock).mockReturnValue(PieceEnum.X);
    const expected = {
      gameState: GameStateEnum.Completed,
      winner: PieceEnum.X,
    };

    // Act
    const winner = evaluateGame(board);

    // Assert
    expect(winner).toEqual(expected);
  });
  it('should determine a tie', () => {
    // Arrange
    const board: BoardType = initialState.board;
    (findWinner as jest.Mock).mockReturnValue(PieceEnum.Neither);
    (isGameOver as jest.Mock).mockReturnValue(true);
    const expected = {
      gameState: GameStateEnum.Completed,
      winner: PieceEnum.Neither,
    };

    // Act
    const winner = evaluateGame(board);

    // Assert
    expect(winner).toEqual(expected);
  });
  it('should determine that we are not done', () => {
    // Arrange
    const board: BoardType = initialState.board;
    (findWinner as jest.Mock).mockReturnValue(PieceEnum.Neither);
    (isGameOver as jest.Mock).mockReturnValue(false);
    const expected = {
      gameState: GameStateEnum.Active,
      winner: PieceEnum.Neither,
    };

    // Act
    const winner = evaluateGame(board);

    // Assert
    expect(winner).toEqual(expected);
  });
});
