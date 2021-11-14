import { initialGame, PlayerEnum, StatusEnum } from '../../../../src/features/tictactoe/constants/tictactoe.constant';
import { checkGame } from '../../../../src/features/tictactoe/functions/check-game';
import { findWinner } from '../../../../src/features/tictactoe/functions/find-winner';
import { isGameOver } from '../../../../src/features/tictactoe/functions/is-game-over';
import { GameType } from '../../../../src/features/tictactoe/types/tictactoe';

jest
  .mock('../../../../src/features/tictactoe/functions/find-winner')
  .mock('../../../../src/features/tictactoe/functions/is-game-over');

describe('feature/tictactoe/function/check-game', () => {
  it('should determine a win', () => {
    // Arrange
    const game: GameType = initialGame;
    (findWinner as jest.Mock).mockReturnValue(PlayerEnum.One);
    const expected = {
      status: StatusEnum.Win,
      winner: PlayerEnum.One,
    };

    // Act
    const winner = checkGame(game);

    // Assert
    expect(winner).toEqual(expected);
  });
  it('should determine a tie', () => {
    // Arrange
    const game: GameType = initialGame;
    (findWinner as jest.Mock).mockReturnValue(PlayerEnum.None);
    (isGameOver as jest.Mock).mockReturnValue(true);
    const expected = {
      status: StatusEnum.Tie,
    };

    // Act
    const winner = checkGame(game);

    // Assert
    expect(winner).toEqual(expected);
  });
  it('should determine that we are not done', () => {
    // Arrange
    const game: GameType = initialGame;
    (findWinner as jest.Mock).mockReturnValue(PlayerEnum.None);
    (isGameOver as jest.Mock).mockReturnValue(false);
    const expected = {
      status: StatusEnum.Active,
    };

    // Act
    const winner = checkGame(game);

    // Assert
    expect(winner).toEqual(expected);
  });
});
