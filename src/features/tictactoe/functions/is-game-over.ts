import { PlayerEnum } from '../contracts/tictactoe.enum';
import { GameType } from '../contracts/tictactoe.context';

const isGameOver = (game: GameType): boolean => {
  const squares = game.split('');
  return squares.filter(v => v === PlayerEnum.None).length === 0;
};

export { isGameOver };
