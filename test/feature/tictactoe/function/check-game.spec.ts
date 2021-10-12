import { initialGame, PlayerEnum, StatusEnum } from '../../../../src/feature/tictactoe/constant/tictactoe.constant';
import { checkGame } from '../../../../src/feature/tictactoe/function/check-game';
import { findWinner } from '../../../../src/feature/tictactoe/function/find-winner';
import { isGameOver } from '../../../../src/feature/tictactoe/function/is-game-over';
import { GameType } from '../../../../src/feature/tictactoe/type/tictactoe';

jest
  .mock('../../../../src/feature/tictactoe/function/find-winner')
  .mock('../../../../src/feature/tictactoe/function/is-game-over');

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
